import {
  Avatar,
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Container,
  Divider,
  Link,
  MenuItem,
  Select,
  TextField,
  Typography,
  useTheme,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import useInterval from "@use-it/interval";
import clsx from "clsx";
import React, { useCallback, useEffect, useState } from "react";
import { useParams } from "react-router";
import Web3 from "web3";
import { Contract } from "web3-eth-contract";
import { browserHistory } from "./history";
import { myobuAbi, myobuContractAddress, myobuTotalSupply } from "./myobu";
import logo from "./myobu.png";

interface MyobuInfo {
  price: number;
  marketCap: number;
  volume: number;
  priceChange: number;
  lastUpdatedAt: Date;
}

interface Transaction {
  createdAt: Date;
  blockNumber: number;
  hash: string;
}

interface Estimation {
  dailyFee: number;
  dailyPercent: number;
  monthlyFee: number;
  monthlyPercent: number;
  yearlyFee: number;
  yearlyPercent: number;
}

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.default,
    width: "100%",
    height: "100%",
    overflow: "auto",
  },
  myobuInfoCard: {
    marginTop: theme.spacing(8),
    position: "relative",
  },
  userInfoCard: {
    marginTop: theme.spacing(4),
    position: "relative",
  },
  developerInfoCard: {
    marginTop: theme.spacing(4),
    marginBottom: theme.spacing(8),
    position: "relative",
  },
}));

interface Props {}

function isWalletAddressValid(walletAddrses: string | undefined) {
  if (!walletAddrses) {
    return false;
  } else {
    return walletAddrses.startsWith("0x") && walletAddrses.length === 42;
  }
}

export default function Home(props: Props) {
  const classes = useStyles();
  let { walletAddress } = useParams<{ walletAddress?: string }>();
  if (!isWalletAddressValid(walletAddress)) {
    walletAddress = "";
  }
  const [contract, setContract] = useState<Contract | null>(null);
  const [myobuInfo, setMyobuInfo] = useState<MyobuInfo | null>(null);
  const [walletAddressInput, setWalletAddressinput] = useState<string>(
    walletAddress || ""
  );
  const [currentBalance, setCurrentBalance] = useState<number>(0);
  const [oldBalance, setOldBalance] = useState<number>(0);
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [selectedTransactionHash, setSelectedTransactionhash] =
    useState<string>("");
  const [estimation, setEstimation] = useState<Estimation | null>(null);
  const theme = useTheme();

  const getUserCurrentBalance = useCallback(
    async (walletAddress: string) => {
      if (!contract) {
        return 0;
      }
      return (
        ((await contract.methods.balanceOf(walletAddress).call({}, "latest")) ||
          0) / 1000000000
      );
    },
    [contract]
  );

  const getUserBalanceAtTransactionBlockNumber = useCallback(
    async (walletAddress: string, blockNumber: number) => {
      if (!contract) {
        return 0;
      }
      const balance =
        ((await contract.methods
          .balanceOf(walletAddress)
          .call({ from: walletAddress }, blockNumber)) || 0) / 1000000000;

      return balance;
    },
    [contract]
  );

  const updateMyobuInfo = useCallback(async () => {
    const response = await fetch(
      "https://api.coingecko.com/api/v3/simple/price?ids=myobu&vs_currencies=usd&include_market_cap=true&include_24hr_vol=true&include_24hr_change=true&include_last_updated_at=true",
      { method: "get" }
    );
    const json = await response.json();
    const myobuInfo: MyobuInfo = {
      price: json["myobu"]["usd"],
      marketCap: json["myobu"]["usd_market_cap"],
      volume: json["myobu"]["usd_24h_vol"],
      priceChange: json["myobu"]["usd_24h_change"],
      lastUpdatedAt: new Date(json["myobu"]["last_updated_at"] * 1000),
    };
    setMyobuInfo(myobuInfo);
  }, []);

  const updateCurrentBalance = useCallback(async () => {
    if (!walletAddress) {
      return;
    }
    const currentBalance = await getUserCurrentBalance(walletAddress);
    setCurrentBalance(currentBalance);
  }, [walletAddress, getUserCurrentBalance]);

  useEffect(() => {
    async function main() {
      const web3 = new Web3(
        "https://eth-mainnet.alchemyapi.io/v2/BfPioABnA3btK_rV-rORjlu-wzk-b5Ih"
      );
      const contract = new web3.eth.Contract(
        myobuAbi as any,
        myobuContractAddress
      );
      setContract(contract);
    }
    main();
  }, []);

  useEffect(() => {
    if (!walletAddress) {
      setSelectedTransactionhash("");
      return setTransactions([]);
    } else {
      (async () => {
        const response = await fetch(
          `https://api.etherscan.io/api?module=account&action=tokentx&contractaddress=${myobuContractAddress}&address=${walletAddress}&page=1&offset=10&sort=desc&apikey=PAZ5RUHY6ZWHUCG98CAG5FHJNKNP1ABWX2`,
          { method: "get" }
        );
        const result = await response.json();
        if (!result.message.match(/^ok$/i)) {
          setSelectedTransactionhash("");
          return setTransactions([]);
        } else {
          const transactions: Transaction[] = result.result.map((item: any) => {
            return {
              createdAt: new Date(parseInt(item.timeStamp) * 1000),
              blockNumber: parseInt(item.blockNumber),
              hash: item.hash,
            };
          });
          setSelectedTransactionhash(transactions[0].hash);
          return setTransactions(transactions);
        }
      })();
    }
  }, [walletAddress]);

  useEffect(() => {
    if (!transactions.length || !selectedTransactionHash || !walletAddress) {
      return;
    }
    const transaction = transactions.find(
      (transaction) => transaction.hash === selectedTransactionHash
    );
    if (!transaction) {
      return;
    }
    (async () => {
      const oldBalance = await getUserBalanceAtTransactionBlockNumber(
        walletAddress,
        transaction.blockNumber
      );
      setOldBalance(oldBalance);
    })();
  }, [
    currentBalance,
    selectedTransactionHash,
    transactions,
    walletAddress,
    getUserBalanceAtTransactionBlockNumber,
  ]);

  useEffect(() => {
    updateMyobuInfo();
    updateCurrentBalance();
  }, [walletAddress, updateMyobuInfo, updateCurrentBalance]);

  useEffect(() => {
    if (
      !walletAddress ||
      !myobuInfo ||
      !currentBalance ||
      !transactions.length
    ) {
      return setEstimation(null);
    }

    (async function () {
      const volume = myobuInfo.volume;
      const proportion = currentBalance / myobuTotalSupply;
      const currentTotalUSD = myobuInfo.price * currentBalance;
      const dailyFee = volume * ((0.02 + 0.07) / 2) * proportion;
      const dailyPercent = dailyFee / currentTotalUSD;
      const monthlyFee =
        Math.pow(1 + dailyPercent, 30) * currentTotalUSD - currentTotalUSD;
      const monthlyPercent = monthlyFee / currentTotalUSD;
      const yearlyFee =
        Math.pow(1 + dailyPercent, 365) * currentTotalUSD - currentTotalUSD;
      const yearlyPercent = yearlyFee / currentTotalUSD;
      const estimation: Estimation = {
        dailyFee: dailyFee,
        dailyPercent: dailyPercent,
        monthlyFee: monthlyFee,
        monthlyPercent: monthlyPercent,
        yearlyFee: yearlyFee,
        yearlyPercent: yearlyPercent,
      };
      setEstimation(estimation);
    })();
  }, [walletAddress, myobuInfo, currentBalance]);

  useInterval(updateMyobuInfo, 5000);

  useInterval(updateCurrentBalance, 10000);

  return (
    <div className={clsx(classes.root)}>
      <Container maxWidth={"sm"}>
        <Card className={clsx(classes.myobuInfoCard)}>
          <CardHeader
            avatar={<Avatar src={logo}></Avatar>}
            title={"Myōbu"}
            subheader={
              <Link
                href="https://etherscan.io/token/0x75d12e4f91df721fafcae4c6cd1d5280381370ac"
                target="_blank"
                color={"primary"}
              >
                {myobuContractAddress}
              </Link>
            }
          ></CardHeader>
          <CardContent>
            <p style={{ margin: 0 }}>
              Current price:{" "}
              {myobuInfo ? (
                <Typography color={"primary"} component={"strong"}>
                  {"$" + myobuInfo.price}
                </Typography>
              ) : (
                "-"
              )}
            </p>
            <p style={{ margin: 0 }}>
              Market cap:{" "}
              {myobuInfo && myobuInfo.marketCap ? (
                <Typography color={"primary"} component={"strong"}>
                  {"$" + myobuInfo.marketCap}
                </Typography>
              ) : (
                "-"
              )}
            </p>
            <p style={{ margin: 0 }}>
              24Hr volume:{" "}
              {myobuInfo ? (
                <Typography color={"primary"} component={"strong"}>
                  {"$" + myobuInfo.volume}
                </Typography>
              ) : (
                "-"
              )}
            </p>
            <p style={{ margin: 0 }}>
              24Hr price change:{" "}
              {myobuInfo ? (
                <Typography color={"primary"} component={"strong"}>
                  {myobuInfo.priceChange.toFixed(2) + "%"}
                </Typography>
              ) : (
                "-"
              )}
            </p>
            <Typography>
              {"Last updated: " +
                (myobuInfo ? myobuInfo.lastUpdatedAt.toLocaleString() : "-")}
            </Typography>
          </CardContent>
          <CardActions>
            <Button
              variant={"outlined"}
              color={"primary"}
              href={
                "https://app.uniswap.org/#/swap?outputCurrency=0x75D12E4F91Df721faFCae4c6cD1d5280381370AC&use=V2"
              }
              target="_blank"
            >
              Trade on Uniswap
            </Button>
            <Button
              variant={"outlined"}
              color={"primary"}
              href="https://www.dextools.io/app/uniswap/pair-explorer/0xa440baf25ac41b26a6ea40f864542b54a76ce530"
              target="_blank"
            >
              Open on Dextools
            </Button>
          </CardActions>
        </Card>
        <Card className={clsx(classes.userInfoCard)}>
          <CardHeader
            title={
              walletAddress ? (
                <Link
                  title={walletAddress}
                  href={`https://etherscan.io/token/${myobuContractAddress}?a=${walletAddress}`}
                  target={"_blank"}
                >
                  {"👛 " + walletAddress.slice(0, 20) + "..."}
                </Link>
              ) : (
                "Enter your wallet address"
              )
            }
          ></CardHeader>
          <CardContent>
            <TextField
              fullWidth={true}
              variant="outlined"
              type="search"
              placeholder={"0x1234..."}
              helperText={
                "Please enter your wallet address to view your profit earned so far"
              }
              onChange={(event) => {
                const walletAddress = event.currentTarget.value.trim();
                if (isWalletAddressValid(walletAddress)) {
                  browserHistory.push(`/${walletAddress}`);
                }
                setWalletAddressinput(event.currentTarget.value);
              }}
              value={walletAddressInput}
              onKeyDown={(event) => {
                if (event.which === 13) {
                  const walletAddress = walletAddressInput.trim();
                  if (!isWalletAddressValid(walletAddress)) {
                    alert("Invalid wallet address");
                  } else {
                    browserHistory.push(`/${walletAddress}`);
                  }
                }
              }}
            ></TextField>
            <Box style={{ marginTop: theme.spacing(2) }}>
              {walletAddress && (
                <p>
                  You are now holding{" "}
                  <Typography color={"primary"} component={"strong"}>
                    {currentBalance}
                  </Typography>{" "}
                  Myōbu tokens.
                </p>
              )}
              {walletAddress && transactions.length && myobuInfo ? (
                <>
                  <Typography>
                    Compared with your latest{" "}
                    <strong>{transactions.length}</strong> transactions:
                  </Typography>
                  <Select
                    value={selectedTransactionHash}
                    fullWidth={true}
                    onChange={(event) => {
                      setSelectedTransactionhash(event.target.value as string);
                    }}
                  >
                    {transactions.map((transaction) => {
                      return (
                        <MenuItem value={transaction.hash}>
                          <Typography>
                            {transaction.hash.slice(0, 20) + "..."}
                          </Typography>
                          <Typography variant={"caption"}>
                            {transaction.createdAt.toString()}
                          </Typography>
                        </MenuItem>
                      );
                    })}
                  </Select>
                  <p>
                    You were holding{" "}
                    <Typography color={"primary"} component={"strong"}>
                      {oldBalance}
                    </Typography>{" "}
                    Myōbu tokens at the selected transaction time.
                  </p>
                  <p>
                    You earned{" "}
                    <Typography color={"primary"} component={"strong"}>
                      {currentBalance - oldBalance}
                    </Typography>{" "}
                    Myōbu tokens.
                  </p>
                  <p>
                    ≈{" "}
                    <Typography color={"primary"} component={"strong"}>
                      $
                      {(
                        (currentBalance - oldBalance) *
                        myobuInfo.price
                      ).toFixed(2)}
                    </Typography>
                  </p>
                  {estimation && (
                    <>
                      <Divider></Divider>
                      <p style={{ marginBottom: 0 }}>
                        <strong>Estimation:</strong>
                      </p>
                      <Typography variant={"caption"}>
                        * The estimation is not 100% accurate.
                      </Typography>
                      <br></br>
                      <Typography variant={"caption"}>
                        * Calculation is based on the past 24Hr volume.
                      </Typography>
                      <br></br>
                      <Typography variant={"caption"}>
                        * Assumed (2% + 7%)/2 redistribution.
                      </Typography>
                      <p>
                        1-day Fee:{" "}
                        <Typography color={"primary"} component={"strong"}>
                          ${estimation.dailyFee.toFixed(2)}
                        </Typography>
                        {"   "}(
                        <Typography color={"primary"} component={"strong"}>
                          {(estimation.dailyPercent * 100).toFixed(2)}%
                        </Typography>
                        )<br></br>
                        <Typography color={"primary"} component={"strong"}>
                          {estimation.dailyFee / myobuInfo.price}
                        </Typography>{" "}
                        Myōbu tokens.
                      </p>
                      <p>
                        30-day Fee:{" "}
                        <Typography color={"primary"} component={"strong"}>
                          ${estimation.monthlyFee.toFixed(2)}
                        </Typography>
                        {"   "}(
                        <Typography color={"primary"} component={"strong"}>
                          {(estimation.monthlyPercent * 100).toFixed(2)}%
                        </Typography>
                        )<br></br>
                        <Typography color={"primary"} component={"strong"}>
                          {estimation.monthlyFee / myobuInfo.price}
                        </Typography>{" "}
                        Myōbu tokens.
                      </p>
                      <p>
                        365-day Fee:{" "}
                        <Typography color={"primary"} component={"strong"}>
                          ${estimation.yearlyFee.toFixed(2)}
                        </Typography>
                        {"   "}(
                        <Typography color={"primary"} component={"strong"}>
                          {(estimation.yearlyPercent * 100).toFixed(2)}%
                        </Typography>
                        )<br></br>
                        <Typography color={"primary"} component={"strong"}>
                          {estimation.yearlyFee / myobuInfo.price}
                        </Typography>{" "}
                        Myōbu tokens.
                      </p>
                    </>
                  )}
                </>
              ) : null}
            </Box>
          </CardContent>
        </Card>
        <Card className={clsx(classes.developerInfoCard)}>
          <CardContent>
            <Typography variant={"subtitle2"}>
              This website is MIT licensed
            </Typography>
            <Typography variant={"subtitle2"}>
              Source code can be found at{" "}
              <Link href="https://github.com/0xGG/myobu-bank" target="_blank">
                github.com/0xgg/myobu-bank
              </Link>
            </Typography>
          </CardContent>
        </Card>
      </Container>
    </div>
  );
}
