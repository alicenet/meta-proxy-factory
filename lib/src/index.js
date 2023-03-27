"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getMetamorphicAddress = exports.getAccounts = exports.deployFactory = exports.getContractAddressFromDeployedProxyEvent = exports.getBytes32Salt = exports.getContractAddressFromEventLog = exports.getContractAddressFromDeployedRawEvent = exports.deployUpgradeableWithFactory = exports.Factory = void 0;
const utils_1 = require("ethers/lib/utils");
const proxyFactoryArtifact = require("../artifacts/contracts/ProxyFactory.sol/ProxyFactory.json");
var proxyFactory_1 = require("./proxyFactory");
Object.defineProperty(exports, "Factory", { enumerable: true, get: function () { return proxyFactory_1.Factory; } });
const deployUpgradeableWithFactory = async (factory, contractName, salt, initCallData, constructorArgs = []) => {
    const hre = await require("hardhat");
    const signers = await hre.ethers.getSigners();
    const _Contract = await hre.ethers.getContractFactory(contractName);
    let deployCode;
    (deployCode = _Contract.getDeployTransaction(...constructorArgs).data);
    const transaction = await factory.deployCreate(deployCode);
    let receipt = await hre.ethers.provider.getTransactionReceipt(transaction.hash);
    if (receipt.gasUsed.gt(10000000) &&
        hre.__SOLIDITY_COVERAGE_RUNNING !== true) {
        throw new Error(`Contract deployment size:${receipt.gasUsed} is greater than 10 million`);
    }
    const logicAddr = await (0, exports.getContractAddressFromDeployedRawEvent)(transaction);
    let saltBytes;
    if (salt === undefined) {
        saltBytes = (0, exports.getBytes32Salt)(contractName);
    }
    else {
        saltBytes = (0, exports.getBytes32Salt)(salt);
    }
    const transaction2 = await factory.deployProxy(saltBytes);
    receipt = await hre.ethers.provider.getTransactionReceipt(transaction2.hash);
    if (receipt.gasUsed.gt(10000000) &&
        hre.__SOLIDITY_COVERAGE_RUNNING !== true) {
        throw new Error(`Contract deployment size:${receipt.gasUsed} is greater than 10 million`);
    }
    let initCallDataBin = "0x";
    if (initCallData !== undefined) {
        try {
            initCallDataBin = _Contract.interface.encodeFunctionData("initialize", initCallData);
        }
        catch (error) {
            console.warn(`Error deploying contract ${contractName} couldn't get initialize arguments: ${error}`);
        }
    }
    await factory.upgradeProxy(saltBytes, logicAddr, initCallDataBin);
    return _Contract.attach(await (0, exports.getContractAddressFromDeployedProxyEvent)(transaction2));
};
exports.deployUpgradeableWithFactory = deployUpgradeableWithFactory;
const getContractAddressFromDeployedRawEvent = async (tx) => {
    const eventSignature = "event DeployedRaw(address contractAddr)";
    const eventName = "DeployedRaw";
    return await (0, exports.getContractAddressFromEventLog)(tx, eventSignature, eventName);
};
exports.getContractAddressFromDeployedRawEvent = getContractAddressFromDeployedRawEvent;
const getContractAddressFromEventLog = async (tx, eventSignature, eventName) => {
    const hre = await require("hardhat");
    const receipt = await hre.ethers.provider.getTransactionReceipt(tx.hash);
    const intrface = new hre.ethers.utils.Interface([eventSignature]);
    let result = "";
    for (const log of receipt.logs) {
        const topics = log.topics;
        const data = log.data;
        const topicHash = intrface.getEventTopic(intrface.getEvent(eventName));
        if (!(0, utils_1.isHexString)(topics[0], 32) || topics[0].toLowerCase() !== topicHash) {
            continue;
        }
        result = intrface.decodeEventLog(eventName, data, topics).contractAddr;
    }
    if (result === "") {
        throw new Error("Couldn't parse logs in the transaction!\nReceipt:\n" + receipt);
    }
    return result;
};
exports.getContractAddressFromEventLog = getContractAddressFromEventLog;
const getBytes32Salt = (contractName) => {
    const hre = require("hardhat");
    return hre.ethers.utils.formatBytes32String(contractName);
};
exports.getBytes32Salt = getBytes32Salt;
const getContractAddressFromDeployedProxyEvent = async (tx) => {
    const eventSignature = "event DeployedProxy(address contractAddr)";
    const eventName = "DeployedProxy";
    return await (0, exports.getContractAddressFromEventLog)(tx, eventSignature, eventName);
};
exports.getContractAddressFromDeployedProxyEvent = getContractAddressFromDeployedProxyEvent;
const deployFactory = async () => {
    const hre = await require("hardhat");
    const signers = await hre.ethers.getSigners();
    let factoryBase = new hre.ethers.ContractFactory(proxyFactoryArtifact.abi, proxyFactoryArtifact.bytecode, signers[0]);
    const factory = await factoryBase.deploy();
    return factory;
};
exports.deployFactory = deployFactory;
const getAccounts = async () => {
    const hre = await require("hardhat");
    const signers = await hre.ethers.getSigners();
    const accounts = [];
    for (const signer of signers) {
        accounts.push(signer.address);
    }
    return accounts;
};
exports.getAccounts = getAccounts;
const getMetamorphicAddress = (factoryAddress, salt) => {
    const hre = require("hardhat");
    const initCode = "0x6020363636335afa1536363636515af43d36363e3d36f3";
    return hre.ethers.utils.getCreate2Address(factoryAddress, (0, exports.getBytes32Salt)(salt), hre.ethers.utils.keccak256(initCode));
};
exports.getMetamorphicAddress = getMetamorphicAddress;
