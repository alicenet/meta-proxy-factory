import { Signer, ContractFactory, Overrides } from "ethers";
import type { Provider, TransactionRequest } from "@ethersproject/providers";
import type { PromiseOrValue } from "../common";
import type { ProxyChild, ProxyChildInterface } from "../ProxyChild";
type ProxyChildConstructorParams = [signer?: Signer] | ConstructorParameters<typeof ContractFactory>;
export declare class ProxyChild__factory extends ContractFactory {
    constructor(...args: ProxyChildConstructorParams);
    deploy(overrides?: Overrides & {
        from?: PromiseOrValue<string>;
    }): Promise<ProxyChild>;
    getDeployTransaction(overrides?: Overrides & {
        from?: PromiseOrValue<string>;
    }): TransactionRequest;
    attach(address: string): ProxyChild;
    connect(signer: Signer): ProxyChild__factory;
    static readonly bytecode = "0x60a0604052348015600f57600080fd5b503360805260805160ad61002c6000396000602f015260ad6000f3fe6080604052348015600f57600080fd5b506004361060285760003560e01c806388cc58e414602d575b600080fd5b7f000000000000000000000000000000000000000000000000000000000000000060405173ffffffffffffffffffffffffffffffffffffffff909116815260200160405180910390f3fea2646970667358221220359cbeffa54b36a57428e9617df498e7e123b4584b8b18637d8f38a121ca793e64736f6c63430008110033";
    static readonly abi: readonly [{
        readonly inputs: readonly [];
        readonly stateMutability: "nonpayable";
        readonly type: "constructor";
    }, {
        readonly inputs: readonly [];
        readonly name: "getFactory";
        readonly outputs: readonly [{
            readonly internalType: "address";
            readonly name: "";
            readonly type: "address";
        }];
        readonly stateMutability: "view";
        readonly type: "function";
    }];
    static createInterface(): ProxyChildInterface;
    static connect(address: string, signerOrProvider: Signer | Provider): ProxyChild;
}
export {};
