import { BigNumberish, BytesLike, ContractFactory, ContractReceipt, ContractTransaction, Overrides } from "ethers";
import { ethers } from "hardhat";
import { ProxyFactory, ProxyFactory__factory as ProxyFactoryBase } from "../typechain-types";
import { PromiseOrValue } from "../typechain-types/common";
type Ethers = typeof ethers;
export type MultiCallArgsStruct = {
    target: string;
    value: BigNumberish;
    data: BytesLike;
};
export declare class MultiCallGasError extends Error {
    constructor(message: string);
}
export declare function deployFactory(legacyTokenAddress: PromiseOrValue<string>, ethers: Ethers, factoryBase?: ProxyFactoryBase, overrides?: Overrides & {
    from?: PromiseOrValue<string>;
}): Promise<ProxyFactory>;
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
export declare function multiCallDeployUpgradeable(implementationBase: ContractFactory, factory: ProxyFactory, ethers: Ethers, initCallData: string, constructorArgs: any[] | undefined, salt: string, overrides?: Overrides & {
    from?: PromiseOrValue<string>;
}): Promise<ContractTransaction>;
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
export declare function multiCallUpgradeProxy(implementationBase: ContractFactory, factory: ProxyFactory, ethers: Ethers, initCallData: string, constructorArgs: any[] | undefined, salt: string, overrides?: Overrides & {
    from?: PromiseOrValue<string>;
}): Promise<ContractTransaction>;
/**
 * @description uses factory multicall to deploy a proxy contract with deployProxy, then upgrades the proxy with upgradeProxy
 * @param logicAddress address of the logic contract already deployed
 * @param factory instance of deployed and connected ProxyFactory
 * @param salt bytes32 formatted salt used for deployCreate2 and to reference the contract in lookup
 * @param initCallData encoded init calldata, 0x if no initializer function
 * @returns
 */
export declare function multiCallDeployProxyAndUpgradeProxy(logicAddress: string, factory: ProxyFactory, salt: string, initCallData: string): Promise<ContractTransaction>;
export declare function factoryMultiCall(factory: ProxyFactory, multiCallArgs: MultiCallArgsStruct[], overrides?: Overrides & {
    from?: PromiseOrValue<string>;
}): Promise<ContractTransaction>;
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
export declare function encodeMultiCallDeployProxyAndUpgradeProxyArgs(implementationAddress: string, factory: ProxyFactory, initCallData: string, salt: string): Promise<MultiCallArgsStruct[]>;
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
export declare function encodeMultiCallDeployUpgradeableArgs(implementationBase: ContractFactory, factory: ProxyFactory, ethers: Ethers, initCallData: string, constructorArgs: string[] | undefined, salt: string): Promise<MultiCallArgsStruct[]>;
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
export declare function encodeMultiCallUpgradeProxyArgs(implementationBase: ContractFactory, factory: ProxyFactory, ethers: Ethers, initCallData: string, constructorArgs: any[] | undefined, salt: string): Promise<MultiCallArgsStruct[]>;
export declare function encodeMultiCallArgs(targetAddress: string, value: BigNumberish, callData: BytesLike): MultiCallArgsStruct;
export declare function calculateDeployCreateAddress(deployerAddress: string, ethers: Ethers): Promise<string>;
export declare function deployUpgradeableGasSafe(contractName: string, factory: ProxyFactory, ethers: Ethers, initCallData: string, constructorArgs: any[], salt: string, waitConfirmantions?: number, overrides?: Overrides & {
    from?: PromiseOrValue<string>;
}): Promise<ContractTransaction>;
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
export declare function upgradeProxyGasSafe(contractName: string, factory: ProxyFactory, ethers: Ethers, initCallData: string, constructorArgs: any[], salt: string, waitConfirmations?: number, overrides?: Overrides & {
    from?: PromiseOrValue<string>;
}): Promise<ContractTransaction>;
/**
 * @param contract name of the contract to deploy, or a contract factory
 * @param factory instance of deployed and connected ProxyFactory
 * @param ethers ethers js object
 * @param constructorArgs constructor arguments for the implementation contract
 * @param overrides
 * @returns a promise that resolves to a transaction response
 */
export declare function deployCreate(contract: string | ContractFactory, factory: ProxyFactory, ethers: Ethers, constructorArgs?: any[], overrides?: Overrides & {
    from?: PromiseOrValue<string>;
}): Promise<ContractTransaction>;
export declare function deployCreate2(contractName: string, factory: ProxyFactory, ethers: Ethers, constructorArgs: any[] | undefined, salt: string, overrides?: Overrides & {
    from?: PromiseOrValue<string>;
}): Promise<ContractTransaction>;
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
export declare function deployUpgradeable(contract: string | ContractFactory, factory: ProxyFactory, ethers: Ethers, initCallData: string, constructorArgs: Array<string>, salt: string, waitConfirmation?: number, overrides?: Overrides & {
    from?: PromiseOrValue<string>;
}): Promise<ContractTransaction>;
export declare function deployCreateAndRegister(contractName: string, factory: ProxyFactory, ethers: Ethers, constructorArgs: any[], salt: string, overrides?: Overrides & {
    from?: PromiseOrValue<string>;
}): Promise<ContractTransaction>;
/**
 * @description deploys logic contract with deployCreate, then upgradeProxy with the logic contract address
 * @param logicAddress address of the logic contract
 * @param factory connected instance of ProxyFactory
 * @param initCallData encoded call data for the initialize function of the implementation contract
 * @param salt bytes32 formatted salt used to deploy the proxy
 * @param overrides tx detail overrides
 * @returns
 */
export declare function upgradeProxy(logicAddress: string, factory: ProxyFactory, initCallData: string, salt: string, overrides?: Overrides & {
    from?: PromiseOrValue<string>;
}): Promise<ContractTransaction>;
/**
 * @description returns everything on the left side of the :
 * ie: src/proxy/Proxy.sol:Mock => src/proxy/Proxy.sol
 * @param qualifiedName the relative path of the contract file + ":" + name of contract
 * @returns the relative path of the contract
 */
export declare function extractPath(qualifiedName: string): string;
/**
 * @description goes through the receipt from the
 * transaction and extract the specified event name and variable
 * @param receipt tx object returned from the tran
 * @param eventName
 * @param varName
 * @returns
 */
export declare function getEventVar(receipt: ContractReceipt, eventName: string, varName: string): string;
/**
 *
 * @param factoryAddress address of the factory that deployed the contract
 * @param salt value specified by custom:salt in the contrac
 * @param ethers ethersjs object
 * @returns returns the address of the metamorphic contract deployed with the following metamorphic code "0x6020363636335afa1536363636515af43d36363e3d36f3"
 */
export declare function getMetamorphicAddress(factoryAddress: string, salt: string, ethers: Ethers): string;
export {};
