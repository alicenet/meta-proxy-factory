import type { Provider } from "@ethersproject/providers";
import { Signer } from "ethers";
import type { IProxy, IProxyInterface } from "../../proxy/IProxy";
export declare class IProxy__factory {
    static readonly abi: readonly [{
        readonly inputs: readonly [];
        readonly name: "getImplementationAddress";
        readonly outputs: readonly [{
            readonly internalType: "address";
            readonly name: "";
            readonly type: "address";
        }];
        readonly stateMutability: "view";
        readonly type: "function";
    }];
    static createInterface(): IProxyInterface;
    static connect(address: string, signerOrProvider: Signer | Provider): IProxy;
}
