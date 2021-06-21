import React, { useCallback, useEffect, useState } from "react";
import Web3 from "web3";
import { Contract } from "web3-eth-contract";
import "./App.css";
import { myobuAbi, myobuContractAddress } from "./Myobu";
import logo from "./myobu.png";

function App() {
  const [web3, setWeb3] = useState<Web3 | null>(null);
  const [contract, setContract] = useState<Contract | null>(null);

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

  const getUserBalanceInfoAtLastTransaction = useCallback(
    async (walletAddress: string) => {
      if (!contract) {
        return {
          balance: 0,
          created: new Date(),
        };
      }

      const response = await fetch(
        `https://api.etherscan.io/api?module=account&action=tokentx&contractaddress=${myobuContractAddress}&address=${walletAddress}&page=1&offset=1&sort=desc&apikey=PAZ5RUHY6ZWHUCG98CAG5FHJNKNP1ABWX2`,
        { method: "get" }
      );
      const result = await response.json();
      if (result.message !== "OK" || !result.result || !result.result.length) {
        return {
          balance: 0,
          created: new Date(),
        };
      }
      const blockNumber = parseInt(result.result[0].blockNumber);
      console.log("result: ", result);
      const balance =
        ((await contract.methods
          .balanceOf(walletAddress)
          .call({ from: walletAddress }, blockNumber)) || 0) / 1000000000;

      const created = new Date(parseInt(result.result[0].timeStamp) * 1000);
      return {
        balance,
        created,
      };
    },
    [contract]
  );

  const getCurrentMyobuPrice = useCallback(async () => {
    const response = await fetch(
      "https://api.coingecko.com/api/v3/simple/price?ids=myobu&vs_currencies=usd",
      { method: "get" }
    );
    const json = await response.json();
    return json["myobu"]["usd"];
  }, []);

  useEffect(() => {
    async function main() {
      const web3 = new Web3(
        "https://eth-mainnet.alchemyapi.io/v2/BfPioABnA3btK_rV-rORjlu-wzk-b5Ih"
      );
      setWeb3(web3);
      const contract = new web3.eth.Contract(
        myobuAbi as any,
        myobuContractAddress
      );
      setContract(contract);
    }
    main();
  }, []);

  useEffect(() => {
    async function main() {
      const myobuPrice = await getCurrentMyobuPrice();
      const currentBalance = await getUserCurrentBalance(
        "0x0357a932E648E72136893C3C8984FBcA1A5cEA3f"
      );
      const lastTransactionBalanceInfo =
        await getUserBalanceInfoAtLastTransaction(
          "0x0357a932E648E72136893C3C8984FBcA1A5cEA3f"
        );
      const myobuEarned = currentBalance - lastTransactionBalanceInfo.balance;
      const usdEarned = (myobuEarned * myobuPrice).toFixed(2);

      console.log("Myobu Price: ", myobuPrice);
      console.log("Now: ", currentBalance);
      console.log("Before: ", lastTransactionBalanceInfo);
      console.log("Myobu earned: ", myobuEarned);
      console.log("USD price: ", usdEarned);
    }
    main();
  }, [getUserCurrentBalance]);

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <p>{"GG"}</p>
      </header>
    </div>
  );
}

export default App;
