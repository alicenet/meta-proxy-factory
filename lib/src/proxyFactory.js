"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getMetamorphicAddress = exports.getEventVar = exports.extractPath = exports.upgradeProxy = exports.deployCreateAndRegister = exports.deployUpgradeable = exports.deployCreate2 = exports.deployCreate = exports.upgradeProxyGasSafe = exports.deployUpgradeableGasSafe = exports.calculateDeployCreateAddress = exports.encodeMultiCallArgs = exports.encodeMultiCallUpgradeProxyArgs = exports.encodeMultiCallDeployUpgradeableArgs = exports.encodeMultiCallDeployProxyAndUpgradeProxyArgs = exports.factoryMultiCall = exports.multiCallDeployProxyAndUpgradeProxy = exports.multiCallUpgradeProxy = exports.multiCallDeployUpgradeable = exports.deployFactory = exports.MultiCallGasError = void 0;
const ethers_1 = require("ethers");
const constants_1 = require("./constants");
class MultiCallGasError extends Error {
    constructor(message) {
        super(message);
        this.name = "MultiCallGasError";
    }
}
exports.MultiCallGasError = MultiCallGasError;
async function deployFactory(legacyTokenAddress, ethers, factoryBase, overrides) {
    factoryBase =
        factoryBase === undefined
            ? (await ethers.getContractFactory("ProxyFactory"))
            : factoryBase;
    if (factoryBase === undefined) {
        factoryBase;
    }
    if (overrides === undefined) {
        return factoryBase.deploy();
    }
    else {
        return factoryBase.deploy(overrides);
    }
}
exports.deployFactory = deployFactory;
// multicall deploy logic, proxy, and upgrade proxy
/**
 * @description uses multicall to deploy logic contract with deployCreate, deploys proxy with deployProxy, and upgrades proxy with upgradeProxy
 * @dev since upgradeable contracts go through proxies, constructor args can only be used to set immutable variables
 * this function will fail if gas cost exceeds 10 million gas units
 * @param implementationBase ethers contract factory for the implementation contract
 * @param factory an instance of a deployed and connected factory
 * @param ethers ethers object
 * @param initCallData encoded initialization call data for contracts with a initialize function
 * @param constructorArgs a list of arguements to pass to the constructor of the implementation contract, only for immutable variables
 * @param salt bytes32 formatted salt used for deploycreate2 and to reference the contract in lookup
 * @param overrides
 * @returns a promise that resolves to the deployed contracts
 */
async function multiCallDeployUpgradeable(implementationBase, factory, ethers, initCallData, constructorArgs = [], salt, overrides) {
    const multiCallArgs = await encodeMultiCallDeployUpgradeableArgs(implementationBase, factory, ethers, initCallData, constructorArgs, salt);
    const estimatedMultiCallGas = await factory.estimateGas.multiCall(multiCallArgs);
    if (estimatedMultiCallGas.gt(ethers_1.BigNumber.from(constants_1.MULTICALL_GAS_LIMIT))) {
        throw new MultiCallGasError(`estimatedGasCost ${estimatedMultiCallGas.toString()} exceeds MULTICALL_GAS_LIMIT ${constants_1.MULTICALL_GAS_LIMIT}`);
    }
    if (overrides === undefined) {
        return factory.multiCall(multiCallArgs);
    }
    else {
        return factory.multiCall(multiCallArgs, overrides);
    }
}
exports.multiCallDeployUpgradeable = multiCallDeployUpgradeable;
// upgradeProxy
/**
 * @description multicall deployCreate and upgradeProxy, throws if gas exceeds 10 million
 * @param implementationBase instance of the logic contract base
 * @param factory ethers connected instance of alicenet factory
 * @param ethers ethers js object
 * @param constructorArgs array of constructor arguments
 * @param initCallData encoded init calldata, 0x if no initializer function
 * @param salt bytes32 formatted salt used for deployProxy and to reference the contract in lookup
 * @param overrides transaction overrides
 * @returns a promise that resolves to the ContractTransaction
 */
async function multiCallUpgradeProxy(implementationBase, factory, ethers, initCallData, constructorArgs = [], salt, overrides) {
    const multiCallArgs = await encodeMultiCallUpgradeProxyArgs(implementationBase, factory, ethers, initCallData, constructorArgs, salt);
    const estimatedMultiCallGas = await factory.estimateGas.multiCall(multiCallArgs);
    if (estimatedMultiCallGas.gt(constants_1.MULTICALL_GAS_LIMIT)) {
        throw new MultiCallGasError(`estimatedGasCost ${estimatedMultiCallGas.toString()} exceeds MULTICALL_GAS_LIMIT ${constants_1.MULTICALL_GAS_LIMIT}`);
    }
    if (overrides === undefined) {
        return factory.multiCall(multiCallArgs);
    }
    else {
        return factory.multiCall(multiCallArgs, overrides);
    }
}
exports.multiCallUpgradeProxy = multiCallUpgradeProxy;
/**
 * @description uses factory multicall to deploy a proxy contract with deployProxy, then upgrades the proxy with upgradeProxy
 * @param logicAddress address of the logic contract already deployed
 * @param factory instance of deployed and connected ProxyFactory
 * @param salt bytes32 formatted salt used for deployCreate2 and to reference the contract in lookup
 * @param initCallData encoded init calldata, 0x if no initializer function
 * @returns
 */
async function multiCallDeployProxyAndUpgradeProxy(logicAddress, factory, salt, initCallData) {
    const multiCallArgs = await encodeMultiCallDeployProxyAndUpgradeProxyArgs(logicAddress, factory, initCallData, salt);
    return factory.multiCall(multiCallArgs);
}
exports.multiCallDeployProxyAndUpgradeProxy = multiCallDeployProxyAndUpgradeProxy;
async function factoryMultiCall(factory, multiCallArgs, overrides) {
    if (overrides === undefined) {
        return factory.multiCall(multiCallArgs);
    }
    else {
        return factory.multiCall(multiCallArgs, overrides);
    }
}
exports.factoryMultiCall = factoryMultiCall;
/**
 * @description encodes multicall for deployProxy and upgradeProxy
 * @dev this function is used if the logic contract is too big to be deployed with a full multicall
 * this just deploys a proxy and upgrade the proxy to point to the implementationAddress
 * @param implementationAddress address of the implementation contract
 * @param factory instance of deployed and connected alicenet factory
 * @param initCallData encoded init calldata, 0x if no initializer function
 * @param salt bytes32 format of the salt that references the proxy contract
 * @returns
 */
async function encodeMultiCallDeployProxyAndUpgradeProxyArgs(implementationAddress, factory, initCallData, salt) {
    const deployProxyCallData = factory.interface.encodeFunctionData("deployProxy", [salt]);
    const deployProxy = encodeMultiCallArgs(factory.address, 0, deployProxyCallData);
    const upgradeProxyCallData = factory.interface.encodeFunctionData("upgradeProxy", [salt, implementationAddress, initCallData]);
    const upgradeProxy = encodeMultiCallArgs(factory.address, 0, upgradeProxyCallData);
    return [deployProxy, upgradeProxy];
}
exports.encodeMultiCallDeployProxyAndUpgradeProxyArgs = encodeMultiCallDeployProxyAndUpgradeProxyArgs;
/**
 * @description encodes the arguments for alicenet factory multicall to
 * deploy a logic contract with deploycreate,
 * deploy a proxy with deployProxy,
 * and upgrade the proxy with upgradeProxy
 * @param implementationBase ethers contract factory for the implementation contract
 * @param factory instance of deployed and connected ProxyFactory
 * @param ethers instance of ethers
 * @param initCallData encoded call data for the initialize function of the implementation contract
 * @param constructorArgs string array of constructor arguments, only used to set immutable variables
 * @param salt bytes32 formatted salt used for deploycreate2 and to reference the contract in lookup
 * @returns an array of encoded multicall data for deployCreate, deployProxy, and upgradeProxy
 */
async function encodeMultiCallDeployUpgradeableArgs(implementationBase, factory, ethers, initCallData, constructorArgs = [], salt) {
    const deployProxyCallData = factory.interface.encodeFunctionData("deployProxy", [salt]);
    const deployProxy = encodeMultiCallArgs(factory.address, 0, deployProxyCallData);
    const [deployCreate, upgradeProxy] = await encodeMultiCallUpgradeProxyArgs(implementationBase, factory, ethers, initCallData, constructorArgs, salt);
    return [deployCreate, deployProxy, upgradeProxy];
}
exports.encodeMultiCallDeployUpgradeableArgs = encodeMultiCallDeployUpgradeableArgs;
/**
 * @decription encodes a multicall for deploying a logic contract with deployCreate, and upgradeProxy to point to the newly deployed implementation contract
 * @param implementationBase ethers contract instance of the implementation contract
 * @param factory connected instance of ProxyFactory
 * @param ethers instance of hardhat ethers
 * @param initCallData encoded call data for the initialize function of the implementation contract
 * @param constructorArgs encoded constructor arguments
 * @param salt bytes32 formatted salt used to deploy the proxy
 * @returns
 */
async function encodeMultiCallUpgradeProxyArgs(implementationBase, factory, ethers, initCallData, constructorArgs = [], salt) {
    const deployTxData = implementationBase.getDeployTransaction(...constructorArgs).data;
    const deployCreateCallData = factory.interface.encodeFunctionData("deployCreate", [deployTxData]);
    const implementationContractAddress = await calculateDeployCreateAddress(factory.address, ethers);
    const upgradeProxyCallData = factory.interface.encodeFunctionData("upgradeProxy", [salt, implementationContractAddress, initCallData]);
    const deployCreate = encodeMultiCallArgs(factory.address, 0, deployCreateCallData);
    const upgradeProxy = encodeMultiCallArgs(factory.address, 0, upgradeProxyCallData);
    return [deployCreate, upgradeProxy];
}
exports.encodeMultiCallUpgradeProxyArgs = encodeMultiCallUpgradeProxyArgs;
function encodeMultiCallArgs(targetAddress, value, callData) {
    const output = {
        target: targetAddress,
        value,
        data: callData,
    };
    return output;
}
exports.encodeMultiCallArgs = encodeMultiCallArgs;
async function calculateDeployCreateAddress(deployerAddress, ethers) {
    const factoryNonce = await ethers.provider.getTransactionCount(deployerAddress);
    return ethers.utils.getContractAddress({
        from: deployerAddress,
        nonce: factoryNonce,
    });
}
exports.calculateDeployCreateAddress = calculateDeployCreateAddress;
async function deployUpgradeableGasSafe(contractName, factory, ethers, initCallData, constructorArgs, salt, waitConfirmantions = 0, overrides) {
    const ImplementationBase = await ethers.getContractFactory(contractName);
    try {
        return await multiCallDeployUpgradeable(ImplementationBase, factory, ethers, initCallData, constructorArgs, salt, overrides);
    }
    catch (err) {
        if (err instanceof MultiCallGasError) {
            return deployUpgradeable(contractName, factory, ethers, initCallData, constructorArgs, salt, waitConfirmantions, overrides);
        }
        throw err;
    }
}
exports.deployUpgradeableGasSafe = deployUpgradeableGasSafe;
/**
 * @description attempts to upgrade a proxy using a multicall deploycreate and upgradeProxy,
 * if the gas is too high, it will deploy the implementation contract and upgrade the proxy with 2 separate calls
 * @param contractName name of the contract to deploy
 * @param factory connected instance of ProxyFactory
 * @param ethers instance of ethers js
 * @param initCallData encoded inititalize call data
 * @param constructorArgs constructor arguments (can only be used for immutable variables)
 * @param salt bytes32 formatted salt used to deploy the proxy
 * @param waitConfirmations
 * @param overrides
 * @returns
 */
async function upgradeProxyGasSafe(contractName, factory, ethers, initCallData, constructorArgs, salt, waitConfirmations = 0, overrides) {
    const ImplementationBase = await ethers.getContractFactory(contractName);
    try {
        return await multiCallUpgradeProxy(ImplementationBase, factory, ethers, initCallData, constructorArgs, salt, overrides);
    }
    catch (err) {
        if (err instanceof MultiCallGasError) {
            const txResponse = await deployCreate(ImplementationBase, factory, ethers, constructorArgs, overrides);
            const receipt = await txResponse.wait(waitConfirmations);
            const logicAddress = getEventVar(receipt, constants_1.EVENT_DEPLOYED_RAW, constants_1.CONTRACT_ADDR);
            return upgradeProxy(logicAddress, factory, initCallData, salt, overrides);
        }
        throw err;
    }
}
exports.upgradeProxyGasSafe = upgradeProxyGasSafe;
/**
 * @param contract name of the contract to deploy, or a contract factory
 * @param factory instance of deployed and connected ProxyFactory
 * @param ethers ethers js object
 * @param constructorArgs constructor arguments for the implementation contract
 * @param overrides
 * @returns a promise that resolves to a transaction response
 */
async function deployCreate(contract, factory, ethers, constructorArgs = [], overrides) {
    const implementationBase = contract instanceof ethers_1.ContractFactory
        ? contract
        : await ethers.getContractFactory(contract);
    const deployTxData = implementationBase.getDeployTransaction(...constructorArgs).data;
    if (overrides === undefined) {
        return await factory.deployCreate(deployTxData);
    }
    else {
        return await factory.deployCreate(deployTxData, overrides);
    }
}
exports.deployCreate = deployCreate;
async function deployCreate2(contractName, factory, ethers, constructorArgs = [], salt, overrides) {
    const implementationBase = await ethers.getContractFactory(contractName);
    const deployTxData = implementationBase.getDeployTransaction(...constructorArgs).data;
    if (overrides === undefined) {
        return await factory.deployCreate2(0, salt, deployTxData);
    }
    else {
        return await factory.deployCreate2(0, deployTxData, salt, overrides);
    }
}
exports.deployCreate2 = deployCreate2;
/**
 * @description deploys logic contract with deployCreate, then multiCalls deployProxy and upgradeProxy
 * @param contract name of the contract to deploy, or a contract factory
 * @param factory instance of deployed and connected ProxyFactory
 * @param ethers ethers js object
 * @param initCallData encoded call data for the initialize function of the implementation contract
 * @param constructorArgs constructor arguments for the implementation contract
 * @param salt bytes32 formatted salt used to deploy the proxy
 * @param waitConfirmation number of confirmations to wait for before returning the transaction
 * @param overrides
 * @returns
 */
async function deployUpgradeable(contract, factory, ethers, initCallData, constructorArgs, salt, waitConfirmation = 0, overrides) {
    const txResponse = await deployCreate(contract, factory, ethers, constructorArgs, overrides);
    const receipt = await txResponse.wait(waitConfirmation);
    const implementationContractAddress = await getEventVar(receipt, "DeployedRaw", "contractAddr");
    // use mutlticall to deploy proxy and upgrade proxy
    const multiCallArgs = await encodeMultiCallDeployProxyAndUpgradeProxyArgs(implementationContractAddress, factory, initCallData, salt);
    if (overrides === undefined) {
        return await factory.multiCall(multiCallArgs);
    }
    else {
        return await factory.multiCall(multiCallArgs, overrides);
    }
}
exports.deployUpgradeable = deployUpgradeable;
async function deployCreateAndRegister(contractName, factory, ethers, constructorArgs, salt, overrides) {
    const logicContract = await ethers.getContractFactory(contractName);
    // if not constructor ars is provide and empty array is used to indicate no constructor args
    // encode deployBcode,
    const deployTxData = logicContract.getDeployTransaction(...constructorArgs)
        .data;
    if (overrides === undefined) {
        return await factory.deployCreateAndRegister(deployTxData, salt);
    }
    else {
        return await factory.deployCreateAndRegister(deployTxData, salt, overrides);
    }
}
exports.deployCreateAndRegister = deployCreateAndRegister;
/**
 * @description deploys logic contract with deployCreate, then upgradeProxy with the logic contract address
 * @param logicAddress address of the logic contract
 * @param factory connected instance of ProxyFactory
 * @param initCallData encoded call data for the initialize function of the implementation contract
 * @param salt bytes32 formatted salt used to deploy the proxy
 * @param overrides tx detail overrides
 * @returns
 */
async function upgradeProxy(logicAddress, factory, initCallData, salt, overrides) {
    // upgrade the proxy
    if (overrides === undefined) {
        return await factory.upgradeProxy(salt, logicAddress, initCallData);
    }
    else {
        return await factory.upgradeProxy(salt, logicAddress, initCallData, overrides);
    }
}
exports.upgradeProxy = upgradeProxy;
/**
 * @description returns everything on the left side of the :
 * ie: src/proxy/Proxy.sol:Mock => src/proxy/Proxy.sol
 * @param qualifiedName the relative path of the contract file + ":" + name of contract
 * @returns the relative path of the contract
 */
function extractPath(qualifiedName) {
    return qualifiedName.split(":")[0];
}
exports.extractPath = extractPath;
/**
 * @description goes through the receipt from the
 * transaction and extract the specified event name and variable
 * @param receipt tx object returned from the tran
 * @param eventName
 * @param varName
 * @returns
 */
function getEventVar(receipt, eventName, varName) {
    let result = "0x";
    if (receipt.events !== undefined) {
        const events = receipt.events;
        for (let i = 0; i < events.length; i++) {
            // look for the event
            if (events[i].event === eventName) {
                if (events[i].args !== undefined) {
                    const args = events[i].args;
                    // extract the deployed mock logic contract address from the event
                    result = args !== undefined ? args[varName] : undefined;
                    if (result !== undefined) {
                        return result;
                    }
                }
                else {
                    throw new Error(`failed to extract ${varName} from event: ${eventName}`);
                }
            }
        }
    }
    throw new Error(`failed to find event: ${eventName}`);
}
exports.getEventVar = getEventVar;
/**
 *
 * @param factoryAddress address of the factory that deployed the contract
 * @param salt value specified by custom:salt in the contrac
 * @param ethers ethersjs object
 * @returns returns the address of the metamorphic contract deployed with the following metamorphic code "0x6020363636335afa1536363636515af43d36363e3d36f3"
 */
function getMetamorphicAddress(factoryAddress, salt, ethers) {
    const initCode = "0x6020363636335afa1536363636515af43d36363e3d36f3";
    return ethers.utils.getCreate2Address(factoryAddress, salt, ethers.utils.keccak256(initCode));
}
exports.getMetamorphicAddress = getMetamorphicAddress;
