<template>
  <div id="dashboard" class="container">
    <div class="card mt-4">
      <div class="card-body">
        <div class="card-title d-flex align-items-center">
          <img alt="Vue logo" height="54px" src="../assets/logo.png" />
          <h1 class="mb-0 ml-2">Myōbu</h1>
        </div>
        <div class="card-subtitle mb-2">
          <a
            href="https://etherscan.io/token/0x75d12e4f91df721fafcae4c6cd1d5280381370ac"
            target="_blank"
            >0x75d12e4f91df721fafcae4c6cd1d5280381370ac</a
          >
        </div>
        <p class="card-text mb-0">
          Current price:
          <span v-if="myobuInfo" class="text-primary">
            ${{ myobuInfo.price }}
          </span>
          <span v-else>-</span>
        </p>
        <p class="card-text mb-0">
          Fully diluted market cap:
          <span v-if="myobuInfo" class="text-primary">
            ${{ myobuInfo.price * myobuTotalSupply }}
          </span>
          <span v-else>-</span>
        </p>
        <p class="card-text mb-0">
          24Hr volume:
          <span v-if="myobuInfo" class="text-primary">
            ${{ myobuInfo.volume.toFixed(2) }}
          </span>
          <span v-else>-</span>
        </p>
        <p class="card-text mb-0">
          24Hr price change:
          <span v-if="myobuInfo" class="text-primary">
            {{ myobuInfo.priceChange.toFixed(2) }}%
          </span>
          <span v-else>-</span>
        </p>
        <p class="card-text mb-0">
          Last updated:
          <span v-if="myobuInfo" class="text-primary">
            {{ myobuInfo.lastUpdatedAt.toString() }}
          </span>
          <span v-else>-</span>
        </p>
        <a
          class="btn btn-primary mt-3"
          target="_blank"
          href="https://app.uniswap.org/#/swap?outputCurrency=0x75D12E4F91Df721faFCae4c6cD1d5280381370AC&use=V2"
          >Open on Uniswap</a
        >
        <a
          class="btn btn-primary ml-4 mt-3"
          target="_blank"
          href="https://www.dextools.io/app/uniswap/pair-explorer/0xa440baf25ac41b26a6ea40f864542b54a76ce530"
          >Open on Dextools</a
        >
        <hr />
        <h2>Dev / team wallets</h2>
        <p v-if="devBuybackBalance !== undefined && myobuInfo" class="mb-0">
          The dev buyback wallet
          <a
            v-bind:href="`https://etherscan.io/token/0x75d12e4f91df721fafcae4c6cd1d5280381370ac?a=${myobuDevBuybackWalletAddress}`"
            target="_blank"
            >{{ myobuDevBuybackWalletAddress.slice(0, 12) }}...</a
          >
          has burned
          <span class="text-primary">{{ devBuybackBalance }}</span> Myōbu tokens
          ≈
          <span class="text-primary"
            >${{ (devBuybackBalance * myobuInfo.price).toFixed(2) }}</span
          >
        </p>
        <p v-if="devWalletBalance !== undefined && myobuInfo" class="mb-0">
          The dev wallet
          <a
            v-bind:href="`https://etherscan.io/token/0x75d12e4f91df721fafcae4c6cd1d5280381370ac?a=${myobuDevWalletAddress}`"
            target="_blank"
            >{{ myobuDevWalletAddress.slice(0, 12) }}...</a
          >
          is holding
          <span class="text-primary">{{ devWalletBalance }}</span> Myōbu tokens
          ≈
          <span class="text-primary"
            >${{ (devWalletBalance * myobuInfo.price).toFixed(2) }}</span
          >
        </p>
        <p
          v-if="taxMarketingWalletBalance1 !== undefined && myobuInfo"
          class="mb-0"
        >
          The tax/marketing wallet
          <a
            v-bind:href="`https://etherscan.io/token/0x75d12e4f91df721fafcae4c6cd1d5280381370ac?a=${myobuTaxMarketingWalletAddress1}`"
            target="_blank"
            >{{ myobuTaxMarketingWalletAddress1.slice(0, 12) }}...</a
          >
          is holding
          <span class="text-primary">{{ taxMarketingWalletBalance1 }}</span>
          Myōbu tokens ≈
          <span class="text-primary"
            >${{
              (taxMarketingWalletBalance1 * myobuInfo.price).toFixed(2)
            }}</span
          >
        </p>
        <p
          v-if="taxMarketingWalletBalance2 !== undefined && myobuInfo"
          class="mb-0"
        >
          The tax/marketing wallet
          <a
            v-bind:href="`https://etherscan.io/token/0x75d12e4f91df721fafcae4c6cd1d5280381370ac?a=${myobuTaxMarketingWalletAddress2}`"
            target="_blank"
            >{{ myobuTaxMarketingWalletAddress2.slice(0, 12) }}...</a
          >
          is holding
          <span class="text-primary">{{ taxMarketingWalletBalance2 }}</span>
          Myōbu tokens ≈
          <span class="text-primary"
            >${{
              (taxMarketingWalletBalance2 * myobuInfo.price).toFixed(2)
            }}</span
          >
        </p>
      </div>
    </div>

    <div class="card mt-4">
      <div class="card-body" v-if="!!contract">
        <div class="card-title">
          <h1 v-if="walletAddress">
            👛
            <a
              v-bind:title="walletAddress"
              v-bind:href="`https://etherscan.io/token/${myobuContractAddress}?a=${walletAddress}`"
              target="_blank"
              >{{ walletAddress.slice(0, 16) }}...</a
            >
          </h1>
          <h1 v-else>Enter your wallet address</h1>
        </div>
        <div class="input-group">
          <input
            type="search"
            class="form-control"
            placeholder="Enter your wallet address 0x1234..."
            v-model="walletAddressInput"
          />
        </div>
        <div class="mt-2">
          <div v-if="walletAddress">
            <p class="mb-0">
              You are now holding
              <strong class="text-primary">{{ currentBalance }}</strong> Myōbu
              tokens.
            </p>
            <p class="mt-0 mb-0" v-if="myobuInfo">
              ≈
              <strong class="text-primary"
                >${{ (currentBalance * myobuInfo.price).toFixed(2) }}</strong
              >
            </p>
          </div>
          <div v-if="!!transactions.length">
            <p>
              Compared with your latest
              <strong>{{ transactions.length }}</strong> transactions:
            </p>
            <select class="custom-select" v-model="selectedTransactionHash">
              <option
                v-for="transaction in transactions"
                v-bind:value="transaction.hash"
                v-bind:key="transaction.hash"
              >
                <div>
                  <p class="mb-0">
                    {{ transaction.hash.slice(0, 12) }}... -&nbsp;
                  </p>
                  <p class="mb-0">{{ transaction.createdAt.toString() }}</p>
                </div>
              </option>
            </select>
          </div>
          <div v-if="oldBalance !== undefined">
            <p class="mt-3 mb-0">
              You were holding
              <strong class="text-primary">{{ oldBalance }}</strong> Myōbu
              tokens at the
              <a
                target="_blank"
                v-bind:href="`https://etherscan.io/tx/${selectedTransactionHash}`"
                >selected transaction time</a
              >.
            </p>
            <p class="mb-0">
              You earned
              <strong class="text-primary">{{
                currentBalance - oldBalance
              }}</strong>
              Myōbu tokens.
            </p>
            <p class="mt-0 mb-0" v-if="myobuInfo">
              ≈
              <strong class="text-primary"
                >${{
                  ((currentBalance - oldBalance) * myobuInfo.price).toFixed(2)
                }}</strong
              >
            </p>
          </div>
          <div v-if="estimation && myobuInfo">
            <hr />
            <p class="mb-0">Accruals estimation:</p>
            <p class="text-muted mb-0">
              * The estimation is not 100% accurate.
            </p>
            <p class="text-muted mb-0">
              * Calculation is based on the past 24Hr volume.
            </p>
            <p class="text-muted mb-4">* Assumed (2% + 7%)/2 redistribution.</p>
            <p class="mb-0">
              1-day Reward:
              <strong class="text-primary"
                >${{ estimation.dailyFee.toFixed(2) }}</strong
              >
              (<strong class="text-primary"
                >{{ (estimation.dailyPercent * 100).toFixed(2) }}%</strong
              >)
            </p>
            <p>
              <strong class="text-primary">{{
                estimation.dailyFee / myobuInfo.price
              }}</strong>
              Myōbu tokens.
            </p>
            <p class="mb-0">
              30-day Reward:
              <strong class="text-primary"
                >${{ estimation.monthlyFee.toFixed(2) }}</strong
              >
              (<strong class="text-primary"
                >{{ (estimation.monthlyPercent * 100).toFixed(2) }}%</strong
              >)
            </p>
            <p>
              <strong class="text-primary">{{
                estimation.monthlyFee / myobuInfo.price
              }}</strong>
              Myōbu tokens.
            </p>
            <p class="mb-0">
              365-day Reward:
              <strong class="text-primary"
                >${{ estimation.yearlyFee.toFixed(2) }}</strong
              >
              (<strong class="text-primary"
                >{{ (estimation.yearlyPercent * 100).toFixed(2) }}%</strong
              >)
            </p>
            <p>
              <strong class="text-primary">{{
                estimation.yearlyFee / myobuInfo.price
              }}</strong>
              Myōbu tokens.
            </p>
          </div>
        </div>
      </div>
      <div v-else>
        <div class="card-body">
          <div class="card-title">
            <h1>Please install MetaMask!</h1>
          </div>
        </div>
      </div>
    </div>

    <div class="card mt-4 mb-5">
      <div class="card-body">
        <p class="card-text mb-0">This website is MIT licensed</p>
        <p class="card-text mb-0">
          Source code can be found at
          <a href="https://github.com/0xGG/myobu-bank" target="_blank"
            >github.com/0xgg/myobu-bank</a
          >
        </p>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import Web3 from "web3";
import { Contract } from "web3-eth-contract";
import detectEthereumProvider from "@metamask/detect-provider";
import {
  myobuAbi,
  myobuContractAddress,
  myobuTotalSupply,
  myobuDevBuybackWalletAddress,
  myobuDevWalletAddress,
  myobuTaxMarketingWalletAddress1,
  myobuTaxMarketingWalletAddress2,
} from "../lib/myobu";

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

interface Data {
  walletAddress?: string;
  walletAddressInput: string;
  contract?: Contract;
  myobuInfo?: MyobuInfo;
  currentBalance?: number;
  oldBalance?: number;
  devBuybackBalance?: number;
  devWalletBalance?: number;
  taxMarketingWalletBalance1?: number;
  taxMarketingWalletBalance2?: number;
  transactions: Transaction[];
  selectedTransactionHash: string;
  estimation?: Estimation;
  myobuTotalSupply: number;
  myobuContractAddress: string;
  myobuDevBuybackWalletAddress: string;
  myobuDevWalletAddress: string;
  myobuTaxMarketingWalletAddress1: string;
  myobuTaxMarketingWalletAddress2: string;
  updateCurrentBalanceTimer?: ReturnType<typeof setInterval>;
}

function isWalletAddressValid(walletAddress: string | undefined): boolean {
  if (!walletAddress) {
    return false;
  } else {
    return walletAddress.startsWith("0x") && walletAddress.length === 42;
  }
}

export default Vue.extend({
  name: "Dashboard",
  data() {
    const d: Data = {
      walletAddress: undefined,
      walletAddressInput: "",
      contract: undefined,
      myobuInfo: undefined,
      currentBalance: undefined,
      oldBalance: undefined,
      devBuybackBalance: undefined,
      devWalletBalance: undefined,
      taxMarketingWalletBalance1: undefined,
      taxMarketingWalletBalance2: undefined,
      transactions: [],
      selectedTransactionHash: "",
      estimation: undefined,
      myobuTotalSupply,
      myobuContractAddress,
      myobuDevBuybackWalletAddress,
      myobuDevWalletAddress,
      myobuTaxMarketingWalletAddress1,
      myobuTaxMarketingWalletAddress2,
      updateCurrentBalanceTimer: undefined,
    };
    return d;
  },

  mounted() {
    (async () => {
      const provider: any = await detectEthereumProvider();
      if (provider) {
        try {
          // Request account access if needed
          // await (window["ethereum"] as any).enable();
          const web3 = new Web3(provider);
          const contract = new web3.eth.Contract(
            myobuAbi as any,
            myobuContractAddress
          );
          this.contract = contract;
        } catch (error) {
          // User denied account access...
        }
      } else {
        console.log("Please install MetaMask!");
        this.contract = null;
      }
    })();

    this.updateMyobuInfo();
    this.updateDevWalletData();

    const { walletAddress } = this.$route.params;
    if (isWalletAddressValid(walletAddress)) {
      this.walletAddressInput = walletAddress;
      this.walletAddress = walletAddress;
    }
  },

  computed: {
    needsToUpdateOldBalance() {
      const { transactions, selectedTransactionHash, walletAddress } = this;
      return {
        transactions,
        selectedTransactionHash,
        walletAddress,
      };
    },
    needsToUpdateAccuralsEstimation() {
      const { walletAddress, myobuInfo, currentBalance } = this;
      return {
        walletAddress,
        myobuInfo,
        currentBalance,
      };
    },
  },

  methods: {
    updateMyobuInfo() {
      const update = async () => {
        const response = await fetch(
          "https://api.coingecko.com/api/v3/simple/price?ids=myobu&vs_currencies=usd&include_market_cap=true&include_24hr_vol=true&include_24hr_change=true&include_last_updated_at=true",
          { method: "get", mode: "cors" }
        );
        const json = await response.json();
        const myobuInfo: MyobuInfo = {
          price: json["myobu"]["usd"],
          marketCap: json["myobu"]["usd_market_cap"],
          volume: json["myobu"]["usd_24h_vol"],
          priceChange: json["myobu"]["usd_24h_change"],
          lastUpdatedAt: new Date(json["myobu"]["last_updated_at"] * 1000),
        };
        this.myobuInfo = myobuInfo;
      };
      setInterval(update, 10000);
      update();
    },

    updateDevWalletData() {
      const update = async () => {
        this.devBuybackBalance = await this.getUserCurrentBalance(
          myobuDevBuybackWalletAddress
        );
        this.devWalletBalance = await this.getUserCurrentBalance(
          myobuDevWalletAddress
        );
        this.taxMarketingWalletBalance1 = await this.getUserCurrentBalance(
          myobuTaxMarketingWalletAddress1
        );
        this.taxMarketingWalletBalance2 = await this.getUserCurrentBalance(
          myobuTaxMarketingWalletAddress2
        );
      };
      setInterval(update, 10000);
      update();
    },

    updateCurrentBalance() {
      const update = async () => {
        if (!this.walletAddress) {
          return;
        }
        this.currentBalance = await this.getUserCurrentBalance(
          this.walletAddress
        );
      };
      setInterval(update, 10000);
      update();
    },

    async getUserCurrentBalance(walletAddress: string) {
      if (!this.contract) {
        return 0;
      }
      return (
        ((await this.contract.methods
          .balanceOf(walletAddress)
          .call({}, "latest")) || 0) / 1000000000
      );
    },

    async getUserBalanceAtTransactionBlockNumber(
      walletAddress: string,
      blockNumber: number
    ) {
      if (!this.contract) {
        return 0;
      }
      const balance =
        ((await this.contract.methods
          .balanceOf(walletAddress)
          .call({ from: walletAddress }, blockNumber)) || 0) / 1000000000;
      return balance;
    },
  },
  watch: {
    walletAddressInput(val) {
      const walletAddress = (val || "").trim();
      if (isWalletAddressValid(walletAddress)) {
        if (this.$route.params.walletAddress !== walletAddress) {
          this.$router.push(`/${walletAddress}`);
        }
      }
    },

    walletAddress(val) {
      const walletAddress = val.trim();
      if (!isWalletAddressValid(walletAddress)) {
        this.selectedTransactionHash = "";
        this.transactions = [];
        return;
      } else {
        clearInterval(this.updateCurrentBalanceTimer);
        this.updateCurrentBalanceTimer = this.updateCurrentBalance();
        (async () => {
          const response = await fetch(
            `https://api.etherscan.io/api?module=account&action=tokentx&contractaddress=${myobuContractAddress}&address=${walletAddress}&page=1&offset=10&sort=desc&apikey=PAZ5RUHY6ZWHUCG98CAG5FHJNKNP1ABWX2`,
            { method: "get" }
          );
          const result = await response.json();
          if (!result.message.match(/^ok$/i)) {
            this.selectedTransactionHash = "";
            this.transactions = [];
          } else {
            const transactions: Transaction[] = result.result.map(
              (item: any) => {
                return {
                  createdAt: new Date(parseInt(item.timeStamp) * 1000),
                  blockNumber: parseInt(item.blockNumber),
                  hash: item.hash,
                };
              }
            );
            this.selectedTransactionHash = transactions[0].hash;
            this.transactions = transactions;
          }
        })();
      }
    },

    needsToUpdateOldBalance() {
      if (
        !this.transactions.length ||
        !this.selectedTransactionHash ||
        !this.walletAddress
      ) {
        return;
      }
      const transaction = this.transactions.find(
        (transaction) => transaction.hash === this.selectedTransactionHash
      );
      if (!transaction) {
        return;
      }
      (async () => {
        const oldBalance = await this.getUserBalanceAtTransactionBlockNumber(
          this.walletAddress,
          transaction.blockNumber
        );
        this.oldBalance = oldBalance;
      })();
    },

    needsToUpdateAccuralsEstimation() {
      if (!this.walletAddress || !this.myobuInfo || !this.currentBalance) {
        return (this.estimation = undefined);
      }

      (async () => {
        const volume = this.myobuInfo.volume;
        const proportion = this.currentBalance / myobuTotalSupply;
        const currentTotalUSD = this.myobuInfo.price * this.currentBalance;
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
        this.estimation = estimation;
      })();
    },

    $route(to) {
      this.walletAddress = to.params.walletAddress;
    },
  },
});
</script>

<style scoped>
#dashboard {
  text-align: left;
}
</style>>