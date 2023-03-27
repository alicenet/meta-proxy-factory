import {
    BytesLike,
    Contract,
    ContractTransaction
} from "ethers";
import { isHexString } from "ethers/lib/utils";
const proxyFactoryArtifact = require("../artifacts/contracts/ProxyFactory.sol/ProxyFactory.json");
import { ethers } from "hardhat";
type Ethers = typeof ethers;
export { Factory } from "./proxyFactory";
export const deployUpgradeableWithFactory = async (
    factory: Contract,
    contractName: string,
    salt?: string,
    initCallData?: any[],
    constructorArgs: any[] = []
): Promise<Contract> => {
    const hre: any = await require("hardhat");
    const signers = await hre.ethers.getSigners();
    const _Contract = await hre.ethers.getContractFactory(contractName);
    let deployCode: BytesLike;

    (deployCode = _Contract.getDeployTransaction(...constructorArgs).data as BytesLike)



    const transaction = await factory.deployCreate(deployCode);
    let receipt = await hre.ethers.provider.getTransactionReceipt(transaction.hash);
    if (
        receipt.gasUsed.gt(10_000_000) &&
        hre.__SOLIDITY_COVERAGE_RUNNING !== true
    ) {
        throw new Error(
            `Contract deployment size:${receipt.gasUsed} is greater than 10 million`
        );
    }
    const logicAddr = await getContractAddressFromDeployedRawEvent(transaction);
    let saltBytes;
    if (salt === undefined) {
        saltBytes = getBytes32Salt(contractName);
    } else {
        saltBytes = getBytes32Salt(salt);
    }

    const transaction2 = await factory.deployProxy(saltBytes);
    receipt = await hre.ethers.provider.getTransactionReceipt(transaction2.hash);
    if (
        receipt.gasUsed.gt(10_000_000) &&
        hre.__SOLIDITY_COVERAGE_RUNNING !== true
    ) {
        throw new Error(
            `Contract deployment size:${receipt.gasUsed} is greater than 10 million`
        );
    }
    let initCallDataBin = "0x";
    if (initCallData !== undefined) {
        try {
            initCallDataBin = _Contract.interface.encodeFunctionData(
                "initialize",
                initCallData
            );
        } catch (error) {
            console.warn(
                `Error deploying contract ${contractName} couldn't get initialize arguments: ${error}`
            );
        }
    }
    await factory.upgradeProxy(saltBytes, logicAddr, initCallDataBin);
    return _Contract.attach(
        await getContractAddressFromDeployedProxyEvent(transaction2)
    );
};

export const getContractAddressFromDeployedRawEvent = async (
    tx: ContractTransaction
): Promise<string> => {
    const eventSignature = "event DeployedRaw(address contractAddr)";
    const eventName = "DeployedRaw";
    return await getContractAddressFromEventLog(tx, eventSignature, eventName);
}

export const getContractAddressFromEventLog = async (
    tx: ContractTransaction,
    eventSignature: string,
    eventName: string
): Promise<string> => {
    const hre: any = await require("hardhat");
    const receipt = await hre.ethers.provider.getTransactionReceipt(tx.hash);
    const intrface = new hre.ethers.utils.Interface([eventSignature]);
    let result = "";
    for (const log of receipt.logs) {
        const topics = log.topics;
        const data = log.data;
        const topicHash = intrface.getEventTopic(intrface.getEvent(eventName));
        if (!isHexString(topics[0], 32) || topics[0].toLowerCase() !== topicHash) {
            continue;
        }
        result = intrface.decodeEventLog(eventName, data, topics).contractAddr;
    }
    if (result === "") {
        throw new Error(
            "Couldn't parse logs in the transaction!\nReceipt:\n" + receipt
        );
    }
    return result;
}

export const getBytes32Salt = (contractName: string) => {
    const hre: any = require("hardhat");
    return hre.ethers.utils.formatBytes32String(contractName);
}

export const getContractAddressFromDeployedProxyEvent = async (
    tx: ContractTransaction
): Promise<string> => {
    const eventSignature = "event DeployedProxy(address contractAddr)";
    const eventName = "DeployedProxy";
    return await getContractAddressFromEventLog(tx, eventSignature, eventName);
}

export const deployFactory = async () => {
    const hre: any = await require("hardhat");
    const signers = await hre.ethers.getSigners();
    let factoryBase = new hre.ethers.ContractFactory(proxyFactoryArtifact.abi, proxyFactoryArtifact.bytecode, signers[0])
    const factory = await factoryBase.deploy();
    return factory;
}

export const getAccounts = async () => {
    const hre: any = await require("hardhat");
    const signers = await hre.ethers.getSigners();
    const accounts = [];
    for (const signer of signers) {
        accounts.push(signer.address);
    }
    return accounts;
}

export const getMetamorphicAddress = (
    factoryAddress: string,
    salt: string,
) => {
    const hre: any = require("hardhat");
    const initCode = "0x6020363636335afa1536363636515af43d36363e3d36f3";
    return hre.ethers.utils.getCreate2Address(
        factoryAddress,
        getBytes32Salt(salt),
        hre.ethers.utils.keccak256(initCode)
    );
}

