/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import type { Provider, TransactionRequest } from "@ethersproject/providers";
import {
  BigNumberish,
  Contract,
  ContractFactory,
  Overrides,
  Signer,
  utils,
} from "ethers";
import type { PromiseOrValue } from "../../../common";
import type {
  Mock3,
  Mock3Interface,
} from "../../../mocks/MockContract3.sol/Mock3";

const _abi = [
  {
    inputs: [
      {
        internalType: "address",
        name: "factory_",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "version_",
        type: "uint256",
      },
      {
        internalType: "address",
        name: "anotherMock_",
        type: "address",
      },
    ],
    stateMutability: "nonpayable",
    type: "constructor",
  },
  {
    inputs: [],
    name: "_a",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "_name",
    outputs: [
      {
        internalType: "string",
        name: "",
        type: "string",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "a_",
        type: "uint256",
      },
    ],
    name: "setA",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "string",
        name: "name_",
        type: "string",
      },
    ],
    name: "setMsg",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
] as const;

const _bytecode =
  "0x60e060405234801561001057600080fd5b5060405161052c38038061052c83398101604081905261002f91610068565b6001600160a01b0392831660c0526080919091521660a0526100a4565b80516001600160a01b038116811461006357600080fd5b919050565b60008060006060848603121561007d57600080fd5b6100868461004c565b92506020840151915061009b6040850161004c565b90509250925092565b60805160a05160c0516104626100ca6000396000505060005050600050506104626000f3fe608060405234801561001057600080fd5b506004361061004c5760003560e01c8063c4784fd414610051578063ced7b2e314610066578063d28d885214610082578063ee919d5014610097575b600080fd5b61006461005f36600461014a565b6100aa565b005b61006f60015481565b6040519081526020015b60405180910390f35b61008a6100bc565b60405161007991906101bc565b6100646100a5366004610228565b600155565b60006100b7828483610311565b505050565b600080546100c990610270565b80601f01602080910402602001604051908101604052809291908181526020018280546100f590610270565b80156101425780601f1061011757610100808354040283529160200191610142565b820191906000526020600020905b81548152906001019060200180831161012557829003601f168201915b505050505081565b6000806020838503121561015d57600080fd5b823567ffffffffffffffff8082111561017557600080fd5b818501915085601f83011261018957600080fd5b81358181111561019857600080fd5b8660208285010111156101aa57600080fd5b60209290920196919550909350505050565b600060208083528351808285015260005b818110156101e9578581018301518582016040015282016101cd565b5060006040828601015260407fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffe0601f8301168501019250505092915050565b60006020828403121561023a57600080fd5b5035919050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052604160045260246000fd5b600181811c9082168061028457607f821691505b6020821081036102bd577f4e487b7100000000000000000000000000000000000000000000000000000000600052602260045260246000fd5b50919050565b601f8211156100b757600081815260208120601f850160051c810160208610156102ea5750805b601f850160051c820191505b81811015610309578281556001016102f6565b505050505050565b67ffffffffffffffff83111561032957610329610241565b61033d836103378354610270565b836102c3565b6000601f84116001811461038f57600085156103595750838201355b7fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff600387901b1c1916600186901b178355610425565b6000838152602090207fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffe0861690835b828110156103de57868501358255602094850194600190920191016103be565b5086821015610419577fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff60f88860031b161c19848701351681555b505060018560011b0183555b505050505056fea26469706673582212208f2aa45df18343abbe4f59c0081a0dc6c6c792984b2d6ea1ad47452e695ab27064736f6c63430008110033";

type Mock3ConstructorParams =
  | [signer?: Signer]
  | ConstructorParameters<typeof ContractFactory>;

const isSuperArgs = (
  xs: Mock3ConstructorParams
): xs is ConstructorParameters<typeof ContractFactory> => xs.length > 1;

export class Mock3__factory extends ContractFactory {
  constructor(...args: Mock3ConstructorParams) {
    if (isSuperArgs(args)) {
      super(...args);
    } else {
      super(_abi, _bytecode, args[0]);
    }
  }

  override deploy(
    factory_: PromiseOrValue<string>,
    version_: PromiseOrValue<BigNumberish>,
    anotherMock_: PromiseOrValue<string>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<Mock3> {
    return super.deploy(
      factory_,
      version_,
      anotherMock_,
      overrides || {}
    ) as Promise<Mock3>;
  }
  override getDeployTransaction(
    factory_: PromiseOrValue<string>,
    version_: PromiseOrValue<BigNumberish>,
    anotherMock_: PromiseOrValue<string>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): TransactionRequest {
    return super.getDeployTransaction(
      factory_,
      version_,
      anotherMock_,
      overrides || {}
    );
  }
  override attach(address: string): Mock3 {
    return super.attach(address) as Mock3;
  }
  override connect(signer: Signer): Mock3__factory {
    return super.connect(signer) as Mock3__factory;
  }

  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): Mock3Interface {
    return new utils.Interface(_abi) as Mock3Interface;
  }
  static connect(address: string, signerOrProvider: Signer | Provider): Mock3 {
    return new Contract(address, _abi, signerOrProvider) as Mock3;
  }
}
