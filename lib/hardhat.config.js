"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("@nomiclabs/hardhat-ethers");
require("@nomiclabs/hardhat-truffle5");
const dotenv = __importStar(require("dotenv"));
require("@nomiclabs/hardhat-ethers");
const config_1 = require("hardhat/config");
require("@nomiclabs/hardhat-etherscan");
require("@nomiclabs/hardhat-waffle");
require("@typechain/hardhat");
require("hardhat-gas-reporter");
require("solidity-coverage");
require("hardhat-contract-sizer");
require("hardhat-deploy");
const os_1 = __importDefault(require("os"));
require("hardhat-abi-exporter");
dotenv.config();
// This is a sample Hardhat task. To learn how to create your own go to
// https://hardhat.org/guides/create-task.html
(0, config_1.task)("accounts", "Prints the list of accounts", async (taskArgs, hre) => {
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
                version: "0.8.17",
                settings: {
                    outputSelection: {
                        "*": {
                            "*": ["metadata", "evm.bytecode", "evm.bytecode.sourceMap"],
                            "": ["ast"],
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
        jobs: os_1.default.cpus().length / 2 > 1 ? os_1.default.cpus().length / 2 : 1,
    },
};
//export default config;
