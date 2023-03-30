import type { EventFragment, FunctionFragment, Result } from "@ethersproject/abi";
import type { Listener, Provider } from "@ethersproject/providers";
import type { BaseContract, BigNumber, BigNumberish, BytesLike, CallOverrides, ContractTransaction, Overrides, PayableOverrides, PopulatedTransaction, Signer, utils } from "ethers";
import type { OnEvent, PromiseOrValue, TypedEvent, TypedEventFilter, TypedListener } from "./common";
export declare namespace ProxyFactoryBase {
    type MultiCallArgsStruct = {
        target: PromiseOrValue<string>;
        value: PromiseOrValue<BigNumberish>;
        data: PromiseOrValue<BytesLike>;
    };
    type MultiCallArgsStructOutput = [string, BigNumber, string] & {
        target: string;
        value: BigNumber;
        data: string;
    };
}
export interface ProxyFactoryInterface extends utils.Interface {
    functions: {
        "callAny(address,uint256,bytes)": FunctionFragment;
        "contracts()": FunctionFragment;
        "deployCreate(bytes)": FunctionFragment;
        "deployCreate2(uint256,bytes32,bytes)": FunctionFragment;
        "deployCreateAndRegister(bytes,bytes32)": FunctionFragment;
        "deployProxy(bytes32)": FunctionFragment;
        "getImplementation()": FunctionFragment;
        "getMetamorphicContractAddress(bytes32,address)": FunctionFragment;
        "getNumContracts()": FunctionFragment;
        "getProxyImplementation(address)": FunctionFragment;
        "initializeContract(address,bytes)": FunctionFragment;
        "lookup(bytes32)": FunctionFragment;
        "multiCall((address,uint256,bytes)[])": FunctionFragment;
        "owner()": FunctionFragment;
        "setOwner(address)": FunctionFragment;
        "upgradeProxy(bytes32,address,bytes)": FunctionFragment;
    };
    getFunction(nameOrSignatureOrTopic: "callAny" | "contracts" | "deployCreate" | "deployCreate2" | "deployCreateAndRegister" | "deployProxy" | "getImplementation" | "getMetamorphicContractAddress" | "getNumContracts" | "getProxyImplementation" | "initializeContract" | "lookup" | "multiCall" | "owner" | "setOwner" | "upgradeProxy"): FunctionFragment;
    encodeFunctionData(functionFragment: "callAny", values: [
        PromiseOrValue<string>,
        PromiseOrValue<BigNumberish>,
        PromiseOrValue<BytesLike>
    ]): string;
    encodeFunctionData(functionFragment: "contracts", values?: undefined): string;
    encodeFunctionData(functionFragment: "deployCreate", values: [PromiseOrValue<BytesLike>]): string;
    encodeFunctionData(functionFragment: "deployCreate2", values: [
        PromiseOrValue<BigNumberish>,
        PromiseOrValue<BytesLike>,
        PromiseOrValue<BytesLike>
    ]): string;
    encodeFunctionData(functionFragment: "deployCreateAndRegister", values: [PromiseOrValue<BytesLike>, PromiseOrValue<BytesLike>]): string;
    encodeFunctionData(functionFragment: "deployProxy", values: [PromiseOrValue<BytesLike>]): string;
    encodeFunctionData(functionFragment: "getImplementation", values?: undefined): string;
    encodeFunctionData(functionFragment: "getMetamorphicContractAddress", values: [PromiseOrValue<BytesLike>, PromiseOrValue<string>]): string;
    encodeFunctionData(functionFragment: "getNumContracts", values?: undefined): string;
    encodeFunctionData(functionFragment: "getProxyImplementation", values: [PromiseOrValue<string>]): string;
    encodeFunctionData(functionFragment: "initializeContract", values: [PromiseOrValue<string>, PromiseOrValue<BytesLike>]): string;
    encodeFunctionData(functionFragment: "lookup", values: [PromiseOrValue<BytesLike>]): string;
    encodeFunctionData(functionFragment: "multiCall", values: [ProxyFactoryBase.MultiCallArgsStruct[]]): string;
    encodeFunctionData(functionFragment: "owner", values?: undefined): string;
    encodeFunctionData(functionFragment: "setOwner", values: [PromiseOrValue<string>]): string;
    encodeFunctionData(functionFragment: "upgradeProxy", values: [
        PromiseOrValue<BytesLike>,
        PromiseOrValue<string>,
        PromiseOrValue<BytesLike>
    ]): string;
    decodeFunctionResult(functionFragment: "callAny", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "contracts", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "deployCreate", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "deployCreate2", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "deployCreateAndRegister", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "deployProxy", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "getImplementation", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "getMetamorphicContractAddress", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "getNumContracts", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "getProxyImplementation", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "initializeContract", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "lookup", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "multiCall", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "owner", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "setOwner", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "upgradeProxy", data: BytesLike): Result;
    events: {
        "Deployed(bytes32,address)": EventFragment;
        "DeployedProxy(address)": EventFragment;
        "DeployedRaw(address)": EventFragment;
        "DeployedStatic(address)": EventFragment;
        "DeployedTemplate(address)": EventFragment;
        "UpgradedProxy(bytes32,address,address)": EventFragment;
    };
    getEvent(nameOrSignatureOrTopic: "Deployed"): EventFragment;
    getEvent(nameOrSignatureOrTopic: "DeployedProxy"): EventFragment;
    getEvent(nameOrSignatureOrTopic: "DeployedRaw"): EventFragment;
    getEvent(nameOrSignatureOrTopic: "DeployedStatic"): EventFragment;
    getEvent(nameOrSignatureOrTopic: "DeployedTemplate"): EventFragment;
    getEvent(nameOrSignatureOrTopic: "UpgradedProxy"): EventFragment;
}
export interface DeployedEventObject {
    salt: string;
    contractAddr: string;
}
export type DeployedEvent = TypedEvent<[string, string], DeployedEventObject>;
export type DeployedEventFilter = TypedEventFilter<DeployedEvent>;
export interface DeployedProxyEventObject {
    contractAddr: string;
}
export type DeployedProxyEvent = TypedEvent<[string], DeployedProxyEventObject>;
export type DeployedProxyEventFilter = TypedEventFilter<DeployedProxyEvent>;
export interface DeployedRawEventObject {
    contractAddr: string;
}
export type DeployedRawEvent = TypedEvent<[string], DeployedRawEventObject>;
export type DeployedRawEventFilter = TypedEventFilter<DeployedRawEvent>;
export interface DeployedStaticEventObject {
    contractAddr: string;
}
export type DeployedStaticEvent = TypedEvent<[
    string
], DeployedStaticEventObject>;
export type DeployedStaticEventFilter = TypedEventFilter<DeployedStaticEvent>;
export interface DeployedTemplateEventObject {
    contractAddr: string;
}
export type DeployedTemplateEvent = TypedEvent<[
    string
], DeployedTemplateEventObject>;
export type DeployedTemplateEventFilter = TypedEventFilter<DeployedTemplateEvent>;
export interface UpgradedProxyEventObject {
    salt: string;
    proxyAddr: string;
    newlogicAddr: string;
}
export type UpgradedProxyEvent = TypedEvent<[
    string,
    string,
    string
], UpgradedProxyEventObject>;
export type UpgradedProxyEventFilter = TypedEventFilter<UpgradedProxyEvent>;
export interface ProxyFactory extends BaseContract {
    connect(signerOrProvider: Signer | Provider | string): this;
    attach(addressOrName: string): this;
    deployed(): Promise<this>;
    interface: ProxyFactoryInterface;
    queryFilter<TEvent extends TypedEvent>(event: TypedEventFilter<TEvent>, fromBlockOrBlockhash?: string | number | undefined, toBlock?: string | number | undefined): Promise<Array<TEvent>>;
    listeners<TEvent extends TypedEvent>(eventFilter?: TypedEventFilter<TEvent>): Array<TypedListener<TEvent>>;
    listeners(eventName?: string): Array<Listener>;
    removeAllListeners<TEvent extends TypedEvent>(eventFilter: TypedEventFilter<TEvent>): this;
    removeAllListeners(eventName?: string): this;
    off: OnEvent<this>;
    on: OnEvent<this>;
    once: OnEvent<this>;
    removeListener: OnEvent<this>;
    functions: {
        callAny(target_: PromiseOrValue<string>, value_: PromiseOrValue<BigNumberish>, cdata_: PromiseOrValue<BytesLike>, overrides?: PayableOverrides & {
            from?: PromiseOrValue<string>;
        }): Promise<ContractTransaction>;
        contracts(overrides?: CallOverrides): Promise<[string[]] & {
            contracts_: string[];
        }>;
        deployCreate(deployCode_: PromiseOrValue<BytesLike>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<ContractTransaction>;
        deployCreate2(value_: PromiseOrValue<BigNumberish>, salt_: PromiseOrValue<BytesLike>, deployCode_: PromiseOrValue<BytesLike>, overrides?: PayableOverrides & {
            from?: PromiseOrValue<string>;
        }): Promise<ContractTransaction>;
        deployCreateAndRegister(deployCode_: PromiseOrValue<BytesLike>, salt_: PromiseOrValue<BytesLike>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<ContractTransaction>;
        deployProxy(salt_: PromiseOrValue<BytesLike>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<ContractTransaction>;
        getImplementation(overrides?: CallOverrides): Promise<[string]>;
        getMetamorphicContractAddress(_salt: PromiseOrValue<BytesLike>, _factory: PromiseOrValue<string>, overrides?: CallOverrides): Promise<[string]>;
        getNumContracts(overrides?: CallOverrides): Promise<[BigNumber]>;
        getProxyImplementation(proxyAddress_: PromiseOrValue<string>, overrides?: CallOverrides): Promise<[string]>;
        initializeContract(contract_: PromiseOrValue<string>, initCallData_: PromiseOrValue<BytesLike>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<ContractTransaction>;
        lookup(salt_: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<[string]>;
        multiCall(cdata_: ProxyFactoryBase.MultiCallArgsStruct[], overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<ContractTransaction>;
        owner(overrides?: CallOverrides): Promise<[string] & {
            owner_: string;
        }>;
        setOwner(newOwner_: PromiseOrValue<string>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<ContractTransaction>;
        upgradeProxy(salt_: PromiseOrValue<BytesLike>, newImpl_: PromiseOrValue<string>, initCallData_: PromiseOrValue<BytesLike>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<ContractTransaction>;
    };
    callAny(target_: PromiseOrValue<string>, value_: PromiseOrValue<BigNumberish>, cdata_: PromiseOrValue<BytesLike>, overrides?: PayableOverrides & {
        from?: PromiseOrValue<string>;
    }): Promise<ContractTransaction>;
    contracts(overrides?: CallOverrides): Promise<string[]>;
    deployCreate(deployCode_: PromiseOrValue<BytesLike>, overrides?: Overrides & {
        from?: PromiseOrValue<string>;
    }): Promise<ContractTransaction>;
    deployCreate2(value_: PromiseOrValue<BigNumberish>, salt_: PromiseOrValue<BytesLike>, deployCode_: PromiseOrValue<BytesLike>, overrides?: PayableOverrides & {
        from?: PromiseOrValue<string>;
    }): Promise<ContractTransaction>;
    deployCreateAndRegister(deployCode_: PromiseOrValue<BytesLike>, salt_: PromiseOrValue<BytesLike>, overrides?: Overrides & {
        from?: PromiseOrValue<string>;
    }): Promise<ContractTransaction>;
    deployProxy(salt_: PromiseOrValue<BytesLike>, overrides?: Overrides & {
        from?: PromiseOrValue<string>;
    }): Promise<ContractTransaction>;
    getImplementation(overrides?: CallOverrides): Promise<string>;
    getMetamorphicContractAddress(_salt: PromiseOrValue<BytesLike>, _factory: PromiseOrValue<string>, overrides?: CallOverrides): Promise<string>;
    getNumContracts(overrides?: CallOverrides): Promise<BigNumber>;
    getProxyImplementation(proxyAddress_: PromiseOrValue<string>, overrides?: CallOverrides): Promise<string>;
    initializeContract(contract_: PromiseOrValue<string>, initCallData_: PromiseOrValue<BytesLike>, overrides?: Overrides & {
        from?: PromiseOrValue<string>;
    }): Promise<ContractTransaction>;
    lookup(salt_: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<string>;
    multiCall(cdata_: ProxyFactoryBase.MultiCallArgsStruct[], overrides?: Overrides & {
        from?: PromiseOrValue<string>;
    }): Promise<ContractTransaction>;
    owner(overrides?: CallOverrides): Promise<string>;
    setOwner(newOwner_: PromiseOrValue<string>, overrides?: Overrides & {
        from?: PromiseOrValue<string>;
    }): Promise<ContractTransaction>;
    upgradeProxy(salt_: PromiseOrValue<BytesLike>, newImpl_: PromiseOrValue<string>, initCallData_: PromiseOrValue<BytesLike>, overrides?: Overrides & {
        from?: PromiseOrValue<string>;
    }): Promise<ContractTransaction>;
    callStatic: {
        callAny(target_: PromiseOrValue<string>, value_: PromiseOrValue<BigNumberish>, cdata_: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<string>;
        contracts(overrides?: CallOverrides): Promise<string[]>;
        deployCreate(deployCode_: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<string>;
        deployCreate2(value_: PromiseOrValue<BigNumberish>, salt_: PromiseOrValue<BytesLike>, deployCode_: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<string>;
        deployCreateAndRegister(deployCode_: PromiseOrValue<BytesLike>, salt_: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<string>;
        deployProxy(salt_: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<string>;
        getImplementation(overrides?: CallOverrides): Promise<string>;
        getMetamorphicContractAddress(_salt: PromiseOrValue<BytesLike>, _factory: PromiseOrValue<string>, overrides?: CallOverrides): Promise<string>;
        getNumContracts(overrides?: CallOverrides): Promise<BigNumber>;
        getProxyImplementation(proxyAddress_: PromiseOrValue<string>, overrides?: CallOverrides): Promise<string>;
        initializeContract(contract_: PromiseOrValue<string>, initCallData_: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<void>;
        lookup(salt_: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<string>;
        multiCall(cdata_: ProxyFactoryBase.MultiCallArgsStruct[], overrides?: CallOverrides): Promise<string[]>;
        owner(overrides?: CallOverrides): Promise<string>;
        setOwner(newOwner_: PromiseOrValue<string>, overrides?: CallOverrides): Promise<void>;
        upgradeProxy(salt_: PromiseOrValue<BytesLike>, newImpl_: PromiseOrValue<string>, initCallData_: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<void>;
    };
    filters: {
        "Deployed(bytes32,address)"(salt?: null, contractAddr?: null): DeployedEventFilter;
        Deployed(salt?: null, contractAddr?: null): DeployedEventFilter;
        "DeployedProxy(address)"(contractAddr?: null): DeployedProxyEventFilter;
        DeployedProxy(contractAddr?: null): DeployedProxyEventFilter;
        "DeployedRaw(address)"(contractAddr?: null): DeployedRawEventFilter;
        DeployedRaw(contractAddr?: null): DeployedRawEventFilter;
        "DeployedStatic(address)"(contractAddr?: null): DeployedStaticEventFilter;
        DeployedStatic(contractAddr?: null): DeployedStaticEventFilter;
        "DeployedTemplate(address)"(contractAddr?: null): DeployedTemplateEventFilter;
        DeployedTemplate(contractAddr?: null): DeployedTemplateEventFilter;
        "UpgradedProxy(bytes32,address,address)"(salt?: null, proxyAddr?: null, newlogicAddr?: null): UpgradedProxyEventFilter;
        UpgradedProxy(salt?: null, proxyAddr?: null, newlogicAddr?: null): UpgradedProxyEventFilter;
    };
    estimateGas: {
        callAny(target_: PromiseOrValue<string>, value_: PromiseOrValue<BigNumberish>, cdata_: PromiseOrValue<BytesLike>, overrides?: PayableOverrides & {
            from?: PromiseOrValue<string>;
        }): Promise<BigNumber>;
        contracts(overrides?: CallOverrides): Promise<BigNumber>;
        deployCreate(deployCode_: PromiseOrValue<BytesLike>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<BigNumber>;
        deployCreate2(value_: PromiseOrValue<BigNumberish>, salt_: PromiseOrValue<BytesLike>, deployCode_: PromiseOrValue<BytesLike>, overrides?: PayableOverrides & {
            from?: PromiseOrValue<string>;
        }): Promise<BigNumber>;
        deployCreateAndRegister(deployCode_: PromiseOrValue<BytesLike>, salt_: PromiseOrValue<BytesLike>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<BigNumber>;
        deployProxy(salt_: PromiseOrValue<BytesLike>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<BigNumber>;
        getImplementation(overrides?: CallOverrides): Promise<BigNumber>;
        getMetamorphicContractAddress(_salt: PromiseOrValue<BytesLike>, _factory: PromiseOrValue<string>, overrides?: CallOverrides): Promise<BigNumber>;
        getNumContracts(overrides?: CallOverrides): Promise<BigNumber>;
        getProxyImplementation(proxyAddress_: PromiseOrValue<string>, overrides?: CallOverrides): Promise<BigNumber>;
        initializeContract(contract_: PromiseOrValue<string>, initCallData_: PromiseOrValue<BytesLike>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<BigNumber>;
        lookup(salt_: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<BigNumber>;
        multiCall(cdata_: ProxyFactoryBase.MultiCallArgsStruct[], overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<BigNumber>;
        owner(overrides?: CallOverrides): Promise<BigNumber>;
        setOwner(newOwner_: PromiseOrValue<string>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<BigNumber>;
        upgradeProxy(salt_: PromiseOrValue<BytesLike>, newImpl_: PromiseOrValue<string>, initCallData_: PromiseOrValue<BytesLike>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<BigNumber>;
    };
    populateTransaction: {
        callAny(target_: PromiseOrValue<string>, value_: PromiseOrValue<BigNumberish>, cdata_: PromiseOrValue<BytesLike>, overrides?: PayableOverrides & {
            from?: PromiseOrValue<string>;
        }): Promise<PopulatedTransaction>;
        contracts(overrides?: CallOverrides): Promise<PopulatedTransaction>;
        deployCreate(deployCode_: PromiseOrValue<BytesLike>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<PopulatedTransaction>;
        deployCreate2(value_: PromiseOrValue<BigNumberish>, salt_: PromiseOrValue<BytesLike>, deployCode_: PromiseOrValue<BytesLike>, overrides?: PayableOverrides & {
            from?: PromiseOrValue<string>;
        }): Promise<PopulatedTransaction>;
        deployCreateAndRegister(deployCode_: PromiseOrValue<BytesLike>, salt_: PromiseOrValue<BytesLike>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<PopulatedTransaction>;
        deployProxy(salt_: PromiseOrValue<BytesLike>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<PopulatedTransaction>;
        getImplementation(overrides?: CallOverrides): Promise<PopulatedTransaction>;
        getMetamorphicContractAddress(_salt: PromiseOrValue<BytesLike>, _factory: PromiseOrValue<string>, overrides?: CallOverrides): Promise<PopulatedTransaction>;
        getNumContracts(overrides?: CallOverrides): Promise<PopulatedTransaction>;
        getProxyImplementation(proxyAddress_: PromiseOrValue<string>, overrides?: CallOverrides): Promise<PopulatedTransaction>;
        initializeContract(contract_: PromiseOrValue<string>, initCallData_: PromiseOrValue<BytesLike>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<PopulatedTransaction>;
        lookup(salt_: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<PopulatedTransaction>;
        multiCall(cdata_: ProxyFactoryBase.MultiCallArgsStruct[], overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<PopulatedTransaction>;
        owner(overrides?: CallOverrides): Promise<PopulatedTransaction>;
        setOwner(newOwner_: PromiseOrValue<string>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<PopulatedTransaction>;
        upgradeProxy(salt_: PromiseOrValue<BytesLike>, newImpl_: PromiseOrValue<string>, initCallData_: PromiseOrValue<BytesLike>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<PopulatedTransaction>;
    };
}
