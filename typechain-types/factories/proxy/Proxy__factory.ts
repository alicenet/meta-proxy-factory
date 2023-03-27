/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import { Signer, utils, Contract, ContractFactory, Overrides } from "ethers";
import type { Provider, TransactionRequest } from "@ethersproject/providers";
import type { PromiseOrValue } from "../../common";
import type { Proxy, ProxyInterface } from "../../proxy/Proxy";

const _abi = [
  {
    inputs: [],
    stateMutability: "nonpayable",
    type: "constructor",
  },
  {
    stateMutability: "payable",
    type: "fallback",
  },
  {
    stateMutability: "payable",
    type: "receive",
  },
] as const;

const _bytecode =
  "0x60a060405234801561001057600080fd5b50336080526080516102ac61002f6000396000601b01526102ac6000f3fe60806040523661001357610011610017565b005b6100115b60007f00000000000000000000000000000000000000000000000000000000000000009050600536146025361417156101275760003560d81c80640cbcae703c81146100995764ca11c0de1181146100ea5761009460127f66756e6374696f6e206e6f7420666f756e640000000000000000000000000000610132565b610124565b6040517fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff5460601b7fffffffffffffffffffffffffffffffffffffffff000000000000000000000000168152601481f35b82331461011c5761011c600c7f756e617574686f72697a65640000000000000000000000000000000000000000610132565b610124610177565b50505b61012f6101fa565b50565b6040517f08c379a00000000000000000000000000000000000000000000000000000000081526020600482015260248101839052604481018290526064808201919081fd5b6bca11c0de15dead10deadc0de6000195460a01c036101bb576101bb600d7f757064617465206c6f636b656400000000000000000000000000000000000000610132565b73ffffffffffffffffffffffffffffffffffffffff600535167fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff819055005b7fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff548061024c5761024c600d7f6c6f676963206e6f742073657400000000000000000000000000000000000000610132565b60405136810160405236600082376000803683855af491503d6000823e81610272573d81fd5b3d81f3fea264697066735822122008cba2e77d14c8cdbf42884951755adca3df49c0b7f5dbf6714f8ff7438492a564736f6c63430008110033";

type ProxyConstructorParams =
  | [signer?: Signer]
  | ConstructorParameters<typeof ContractFactory>;

const isSuperArgs = (
  xs: ProxyConstructorParams
): xs is ConstructorParameters<typeof ContractFactory> => xs.length > 1;

export class Proxy__factory extends ContractFactory {
  constructor(...args: ProxyConstructorParams) {
    if (isSuperArgs(args)) {
      super(...args);
    } else {
      super(_abi, _bytecode, args[0]);
    }
  }

  override deploy(
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<Proxy> {
    return super.deploy(overrides || {}) as Promise<Proxy>;
  }
  override getDeployTransaction(
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): TransactionRequest {
    return super.getDeployTransaction(overrides || {});
  }
  override attach(address: string): Proxy {
    return super.attach(address) as Proxy;
  }
  override connect(signer: Signer): Proxy__factory {
    return super.connect(signer) as Proxy__factory;
  }

  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): ProxyInterface {
    return new utils.Interface(_abi) as ProxyInterface;
  }
  static connect(address: string, signerOrProvider: Signer | Provider): Proxy {
    return new Contract(address, _abi, signerOrProvider) as Proxy;
  }
}
