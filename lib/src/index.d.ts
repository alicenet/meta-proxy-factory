import { Contract, ContractFactory, ContractTransaction, Overrides } from "ethers";
import { ProxyFactory } from "../typechain-types";
import { ethers } from "hardhat";
import { PromiseOrValue } from "../typechain-types/common";
type Ethers = typeof ethers;
export declare const deployUpgradeableWithFactory: (factory: Contract, contractName: string, salt?: string, initCallData?: any[], constructorArgs?: any[]) => Promise<Contract>;
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
export declare const getContractAddressFromDeployedRawEvent: (tx: ContractTransaction) => Promise<string>;
export declare const getContractAddressFromEventLog: (tx: ContractTransaction, eventSignature: string, eventName: string) => Promise<string>;
export declare const getBytes32Salt: (contractName: string) => any;
export declare const getContractAddressFromDeployedProxyEvent: (tx: ContractTransaction) => Promise<string>;
export declare const deployFactory: () => Promise<any>;
export declare const getAccounts: () => Promise<any[]>;
export declare const getMetamorphicAddress: (factoryAddress: string, salt: string) => any;
export {};
