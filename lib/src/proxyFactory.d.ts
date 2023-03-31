import { BigNumberish, BytesLike, Contract, ContractFactory, ContractReceipt, ContractTransaction, Overrides } from "ethers";
import { ethers } from "hardhat";
import { ProxyFactory } from "../typechain-types";
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
export declare class Factory {
    factory: ProxyFactory | Contract;
    ethers: Ethers;
    private _initialized;
    constructor(ethers: Ethers, factoryAddress?: string);
    initialized(): boolean;
    getFactory(): Promise<ProxyFactory>;
    deploy(overrides?: Overrides & {
        from?: PromiseOrValue<string>;
    }): Promise<void>;
    init(): Promise<void>;
    changeFactory(factoryAddress: string): Promise<void>;
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
    multiCallDeployUpgradeable(implementationBase: ContractFactory, initCallData: string, constructorArgs: any[] | undefined, salt: string, overrides?: Overrides & {
        from?: PromiseOrValue<string>;
    }): Promise<ContractTransaction>;
    /**
     * @description multicall deployCreate and upgradeProxy, throws if gas exceeds 10 million
     * @param implementationBase instance of the logic contract base
     * @param constructorArgs array of constructor arguments
     * @param initCallData encoded init calldata, 0x if no initializer function
     * @param salt bytes32 formatted salt used for deployProxy and to reference the contract in lookup
     * @param overrides transaction overrides
     * @returns a promise that resolves to the ContractTransaction
     */
    multiCallUpgradeProxy(implementationBase: ContractFactory, initCallData: string, constructorArgs: any[] | undefined, salt: string, overrides?: Overrides & {
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
    multiCallDeployProxyAndUpgradeProxy(logicAddress: string, salt: string, initCallData: string): Promise<ContractTransaction>;
    factoryMultiCall(multiCallArgs: MultiCallArgsStruct[], overrides?: Overrides & {
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
    encodeMultiCallDeployProxyAndUpgradeProxyArgs(implementationAddress: string, initCallData: string, salt: string): Promise<MultiCallArgsStruct[]>;
    /**
     * @description encodes the arguments for alicenet factory multicall to
     * deploy a logic contract with deploycreate,
     * deploy a proxy with deployProxy,
     * and upgrade the proxy with upgradeProxy
     * @param implementationBase ethers contract factory for the implementation contract
     * @param initCallData encoded call data for the initialize function of the implementation contract
     * @param constructorArgs string array of constructor arguments, only used to set immutable variables
     * @param salt bytes32 formatted salt used for deploycreate2 and to reference the contract in lookup
     * @returns an array of encoded multicall data for deployCreate, deployProxy, and upgradeProxy
     */
    encodeMultiCallDeployUpgradeableArgs(implementationBase: ContractFactory, initCallData: string, constructorArgs: string[] | undefined, salt: string): Promise<MultiCallArgsStruct[]>;
    /**
     * @decription encodes a multicall for deploying a logic contract with deployCreate, and upgradeProxy to point to the newly deployed implementation contract
     * @param implementationBase ethers contract instance of the implementation contract
     * @param initCallData encoded call data for the initialize function of the implementation contract
     * @param constructorArgs encoded constructor arguments
     * @param salt bytes32 formatted salt used to deploy the proxy
     * @returns
     */
    encodeMultiCallUpgradeProxyArgs(implementationBase: ContractFactory, initCallData: string, constructorArgs: any[] | undefined, salt: string): Promise<MultiCallArgsStruct[]>;
    encodeMultiCallArgs(targetAddress: string, value: BigNumberish, callData: BytesLike): MultiCallArgsStruct;
    /**
     * @description calculates the address of a contract deployed with deployCreate
     * @param deployerAddress address of the deployer
     * @returns
     */
    calculateDeployCreateAddress(deployerAddress: string): Promise<string>;
    /**
     * @description calculates the address of a contract deployed with the following metamorphic code "0x6020363636335afa1536363636515af43d36363e3d36f3"
     * @param factoryAddress address of the factory that deployed the contract
     * @param salt string none hex formatted salt used to deploy the contract
     * @returns returns the address of the metamorphic contract deployed with the following metamorphic code "0x6020363636335afa1536363636515af43d36363e3d36f3"
     */
    CalculateDeployCreate2Address(factoryAddress: string, salt: string): Promise<string>;
    /**
     * @description deploys a upgradeable contract with proxy factory, deploys logic, deploys proxy, upgrades proxy, and initializes proxy.
     * attempts to deploy with 1 multicall, if it fails, it deploys logic as a separate transaction, and then deploys proxy and upgrades proxy with a multicall
     * @param contractName name of contract to deploy
     * @param initCallData encoded initialize calldata
     * @param constructorArgs: constructor arguments if any, only for immutable variables
     * @param salt bytes32 formatted salt used for deploycreate2 and to reference the contract in lookup
     * @param waitConfirmantions number of confirmations to wait for before returning
     * @param overrides call data overrrides
     * @returns
     */
    deployUpgradeableGasSafe(contractName: string, initCallData: string, constructorArgs: any[], salt: string, waitConfirmantions?: number, overrides?: Overrides & {
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
    upgradeProxyGasSafe(contractName: string, ethers: Ethers, initCallData: string, constructorArgs: any[], salt: string, waitConfirmations?: number, overrides?: Overrides & {
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
    deployCreate(contract: string | ContractFactory, constructorArgs?: any[], overrides?: Overrides & {
        from?: PromiseOrValue<string>;
    }): Promise<ContractTransaction>;
    deployCreate2(contractName: string, constructorArgs: any[] | undefined, salt: string, overrides?: Overrides & {
        from?: PromiseOrValue<string>;
    }): Promise<ContractTransaction>;
    /**
     * @description deploys logic contract with deployCreate, then multiCalls deployProxy and upgradeProxy
     * @param contract name of the contract to deploy, or a contract factory
     * @param initCallData encoded call data for the initialize function of the implementation contract
     * @param constructorArgs constructor arguments for the implementation contract
     * @param salt bytes32 formatted salt used to deploy the proxy
     * @param waitConfirmation number of confirmations to wait for before returning the transaction
     * @param overrides
     * @returns
     */
    deployUpgradeable(contract: string | ContractFactory, initCallData: string, constructorArgs: Array<string>, salt: string, waitConfirmation?: number, overrides?: Overrides & {
        from?: PromiseOrValue<string>;
    }): Promise<ContractTransaction>;
    deployCreateAndRegister(contractName: string, constructorArgs: any[], salt: string, overrides?: Overrides & {
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
    upgradeProxy(logicAddress: string, initCallData: string, salt: string, overrides?: Overrides & {
        from?: PromiseOrValue<string>;
    }): Promise<ContractTransaction>;
    /**
     * @description returns everything on the left side of the :
     * ie: src/proxy/Proxy.sol:Mock => src/proxy/Proxy.sol
     * @param qualifiedName the relative path of the contract file + ":" + name of contract
     * @returns the relative path of the contract
     */
    extractPath(qualifiedName: string): string;
    /**
     * @description goes through the receipt from the
     * transaction and extract the specified event name and variable
     * @param receipt tx object returned from the tran
     * @param eventName
     * @param varName
     * @returns
     */
    getEventVar(receipt: ContractReceipt, eventName: string, varName: string): string;
}
export {};
