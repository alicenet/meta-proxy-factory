import { Contract, ContractTransaction } from "ethers";
export declare const deployUpgradeableWithFactory: (factory: Contract, contractName: string, salt?: string, initCallData?: any[], constructorArgs?: any[]) => Promise<Contract>;
export declare const getContractAddressFromDeployedRawEvent: (tx: ContractTransaction) => Promise<string>;
export declare const getContractAddressFromEventLog: (tx: ContractTransaction, eventSignature: string, eventName: string) => Promise<string>;
export declare const getBytes32Salt: (contractName: string) => any;
export declare const getContractAddressFromDeployedProxyEvent: (tx: ContractTransaction) => Promise<string>;
export declare const deployFactory: () => Promise<any>;
export declare const getAccounts: () => Promise<any[]>;
export declare const getMetamorphicAddress: (factoryAddress: string, salt: string) => any;
