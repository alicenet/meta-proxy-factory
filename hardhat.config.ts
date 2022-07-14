import "@nomiclabs/hardhat-ethers";
import "@nomiclabs/hardhat-truffle5";
import * as dotenv from "dotenv";
import "@nomiclabs/hardhat-ethers";
import { HardhatUserConfig, task } from "hardhat/config";
import "@nomiclabs/hardhat-etherscan";
import "@nomiclabs/hardhat-waffle";
import "@typechain/hardhat";
import "hardhat-gas-reporter";
import "solidity-coverage";
import "hardhat-contract-sizer";
import "hardhat-deploy";
import os from "os";
require('hardhat-abi-exporter');

dotenv.config();

// This is a sample Hardhat task. To learn how to create your own go to
// https://hardhat.org/guides/create-task.html
task("accounts", "Prints the list of accounts", async (taskArgs, hre) => {
  const accounts = await hre.ethers.getSigners();

  for (const account of accounts) {
    console.log(account.address);
  }
});

// You need to export an object to set up your config
// Go to https://hardhat.org/config/ to learn more

module.exports = {
  /*
  abiExporter: {
    path: './abi',
    runOnCompile: true,
    clear: true,
    flat: true,
    spacing: 2,
    pretty: false,
  },
  */
  networks: {
    dev: {
      url: "http://127.0.0.1:8545",
      gas: "auto",
      gasPrice: "auto",
      gasMultiplier: 2,
    },
    hardhat: {
      chainId: 1337,
      allowUnlimitedContractSize: false,
      mining: {
        auto: true,
        interval: 0,
      },
    },
  },
  solidity: {
    compilers: [
      {
        version: "0.8.11",
        settings: {
          outputSelection: {
            "*": {
              "*": ["metadata", "evm.bytecode", "evm.bytecode.sourceMap"],
              "": [
                "ast",
              ],
            },
            def: {
              MyContract: ["abi", "evm.bytecode.opcodes"],
            },
          },
          metadata: {
            useLiteralContent: true,
          },
          optimizer: {
            enabled: true,
            runs: 20000000,
          },
        },
      },
    ],
  },
  paths: {
    sources: "./contracts",
    tests: "./test",
    cache: "./cache",
    artifacts: "./artifacts",
  },

  contractSizer: {
    alphaSort: true,
    disambiguatePaths: false,
    runOnCompile: true,
    strict: false,
  },
  gasReporter: {
    currency: "ETH",
    gasPrice: 1000000,
    excludeContracts: ["*.t.sol"],
  },
  mocha: {
    timeout: 2200000,
    jobs: os.cpus().length / 2 > 1 ? os.cpus().length / 2 : 1,
  },
}
//export default config;