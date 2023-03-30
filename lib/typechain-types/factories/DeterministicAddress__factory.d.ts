import type { Provider } from "@ethersproject/providers";
import { Signer } from "ethers";
import type { DeterministicAddress, DeterministicAddressInterface } from "../DeterministicAddress";
export declare class DeterministicAddress__factory {
    static readonly abi: readonly [{
        readonly inputs: readonly [{
            readonly internalType: "bytes32";
            readonly name: "_salt";
            readonly type: "bytes32";
        }, {
            readonly internalType: "address";
            readonly name: "_factory";
            readonly type: "address";
        }];
        readonly name: "getMetamorphicContractAddress";
        readonly outputs: readonly [{
            readonly internalType: "address";
            readonly name: "";
            readonly type: "address";
        }];
        readonly stateMutability: "pure";
        readonly type: "function";
    }];
    static createInterface(): DeterministicAddressInterface;
    static connect(address: string, signerOrProvider: Signer | Provider): DeterministicAddress;
}
