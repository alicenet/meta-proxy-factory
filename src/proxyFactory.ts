import {
  BigNumber,
  BigNumberish,
  BytesLike,
  ContractFactory,
  ContractReceipt,
  ContractTransaction,
  Overrides,
} from "ethers";
import { ethers } from "hardhat";
import proxyFactoryArtifact from "../artifacts/contracts/ProxyFactory.sol/ProxyFactory.json";
import { ProxyFactory } from "../typechain-types";
import { PromiseOrValue } from "../typechain-types/common";
import {
  CONTRACT_ADDR,
  EVENT_DEPLOYED_RAW,
  MULTICALL_GAS_LIMIT,
} from "./constants";
type Ethers = typeof ethers;
export type MultiCallArgsStruct = {
  target: string;
  value: BigNumberish;
  data: BytesLike;
};
export class MultiCallGasError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "MultiCallGasError";
  }
}

export class Factory {
  factory!: ProxyFactory;
  ethers: Ethers;
  constructor(ethers: Ethers, factoryAddress?: string) {
    this.ethers = ethers;
    this.init(factoryAddress);
  }

  async init(factoryAddress?: string) {
    if (factoryAddress === undefined) {
      this.factory = (await this.deploy(factoryAddress)) as ProxyFactory;
    } else {
      this.factory = (await this.ethers.getContractAtFromArtifact(
        proxyFactoryArtifact,
        factoryAddress
      )) as ProxyFactory;
    }
  }

  async getFactory() {
    return this.factory as ProxyFactory;
  }
  async deploy(overrides?: Overrides & { from?: PromiseOrValue<string> }) {
    let factoryBase = await this.ethers.getContractFactoryFromArtifact(
      proxyFactoryArtifact
    );
    if (overrides === undefined) {
      return await factoryBase.deploy();
    } else {
      return await factoryBase.deploy(overrides);
    }
  }

  async changeFactory(factoryAddress: string) {
    this.factory = (await this.ethers.getContractAtFromArtifact(
      proxyFactoryArtifact,
      factoryAddress
    )) as ProxyFactory;
  }
  // multicall deploy logic, proxy, and upgrade proxy
  /**
   * @description uses multicall to deploy logic contract with deployCreate, deploys proxy with deployProxy, and upgrades proxy with upgradeProxy
   * @dev since upgradeable contracts go through proxies, constructor args can only be used to set immutable variables
   * this function will fail if gas cost exceeds 10 million gas units
   * @param implementationBase ethers contract factory for the implementation contract
   * @param initCallData encoded initialization call data for contracts with a initialize function
   * @param constructorArgs a list of arguements to pass to the constructor of the implementation contract, only for immutable variables
   * @param salt bytes32 formatted salt used for deploycreate2 and to reference the contract in lookup
   * @param overrides
   * @returns a promise that resolves to the deployed contracts
   */
  async multiCallDeployUpgradeable(
    implementationBase: ContractFactory,
    initCallData: string,
    constructorArgs: any[] = [],
    salt: string,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction> {
    const factory = await this.getFactory();
    const multiCallArgs = await this.encodeMultiCallDeployUpgradeableArgs(
      implementationBase,
      initCallData,
      constructorArgs,
      salt
    );
    const estimatedMultiCallGas = await factory.estimateGas.multiCall(
      multiCallArgs
    );
    if (estimatedMultiCallGas.gt(BigNumber.from(MULTICALL_GAS_LIMIT))) {
      throw new MultiCallGasError(
        `estimatedGasCost ${estimatedMultiCallGas.toString()} exceeds MULTICALL_GAS_LIMIT ${MULTICALL_GAS_LIMIT}`
      );
    }
    if (overrides === undefined) {
      return factory.multiCall(multiCallArgs);
    } else {
      return factory.multiCall(multiCallArgs, overrides);
    }
  }

  // upgradeProxy
  /**
   * @description multicall deployCreate and upgradeProxy, throws if gas exceeds 10 million
   * @param implementationBase instance of the logic contract base
   * @param constructorArgs array of constructor arguments
   * @param initCallData encoded init calldata, 0x if no initializer function
   * @param salt bytes32 formatted salt used for deployProxy and to reference the contract in lookup
   * @param overrides transaction overrides
   * @returns a promise that resolves to the ContractTransaction
   */
  async multiCallUpgradeProxy(
    implementationBase: ContractFactory,
    initCallData: string,
    constructorArgs: any[] = [],
    salt: string,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ) {
    const factory = await this.getFactory();
    const multiCallArgs = await this.encodeMultiCallUpgradeProxyArgs(
      implementationBase,
      initCallData,
      constructorArgs,
      salt
    );
    const estimatedMultiCallGas = await factory.estimateGas.multiCall(
      multiCallArgs
    );
    if (estimatedMultiCallGas.gt(MULTICALL_GAS_LIMIT)) {
      throw new MultiCallGasError(
        `estimatedGasCost ${estimatedMultiCallGas.toString()} exceeds MULTICALL_GAS_LIMIT ${MULTICALL_GAS_LIMIT}`
      );
    }
    if (overrides === undefined) {
      return factory.multiCall(multiCallArgs);
    } else {
      return factory.multiCall(multiCallArgs, overrides);
    }
  }

  /**
   * @description uses factory multicall to deploy a proxy contract with deployProxy, then upgrades the proxy with upgradeProxy
   * @param logicAddress address of the logic contract already deployed
   * @param factory instance of deployed and connected ProxyFactory
   * @param salt bytes32 formatted salt used for deployCreate2 and to reference the contract in lookup
   * @param initCallData encoded init calldata, 0x if no initializer function
   * @returns
   */
  async multiCallDeployProxyAndUpgradeProxy(
    logicAddress: string,
    salt: string,
    initCallData: string
  ) {
    const factory = await this.getFactory();
    const multiCallArgs =
      await this.encodeMultiCallDeployProxyAndUpgradeProxyArgs(
        logicAddress,
        initCallData,
        salt
      );
    return factory.multiCall(multiCallArgs);
  }

  async factoryMultiCall(
    multiCallArgs: MultiCallArgsStruct[],
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ) {
    const factory = await this.getFactory();
    if (overrides === undefined) {
      return factory.multiCall(multiCallArgs);
    } else {
      return factory.multiCall(multiCallArgs, overrides);
    }
  }

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
  async encodeMultiCallDeployProxyAndUpgradeProxyArgs(
    implementationAddress: string,
    initCallData: string,
    salt: string
  ) {
    const factory = await this.getFactory();
    const deployProxyCallData: BytesLike = factory.interface.encodeFunctionData(
      "deployProxy",
      [salt]
    );
    const deployProxy = this.encodeMultiCallArgs(
      factory.address,
      0,
      deployProxyCallData
    );
    const upgradeProxyCallData = factory.interface.encodeFunctionData(
      "upgradeProxy",
      [salt, implementationAddress, initCallData]
    );
    const upgradeProxy = this.encodeMultiCallArgs(
      factory.address,
      0,
      upgradeProxyCallData
    );
    return [deployProxy, upgradeProxy];
  }

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
  async encodeMultiCallDeployUpgradeableArgs(
    implementationBase: ContractFactory,
    initCallData: string,
    constructorArgs: string[] = [],
    salt: string
  ) {
    const factory = await this.getFactory();
    const deployProxyCallData: BytesLike = factory.interface.encodeFunctionData(
      "deployProxy",
      [salt]
    );
    const deployProxy = this.encodeMultiCallArgs(
      factory.address,
      0,
      deployProxyCallData
    );
    const [deployCreate, upgradeProxy] =
      await this.encodeMultiCallUpgradeProxyArgs(
        implementationBase,
        initCallData,
        constructorArgs,
        salt
      );
    return [deployCreate, deployProxy, upgradeProxy];
  }
  /**
   * @decription encodes a multicall for deploying a logic contract with deployCreate, and upgradeProxy to point to the newly deployed implementation contract
   * @param implementationBase ethers contract instance of the implementation contract
   * @param initCallData encoded call data for the initialize function of the implementation contract
   * @param constructorArgs encoded constructor arguments
   * @param salt bytes32 formatted salt used to deploy the proxy
   * @returns
   */
  async encodeMultiCallUpgradeProxyArgs(
    implementationBase: ContractFactory,
    initCallData: string,
    constructorArgs: any[] = [],
    salt: string
  ) {
    const factory = await this.getFactory();
    const deployTxData = implementationBase.getDeployTransaction(
      ...constructorArgs
    ).data as BytesLike;
    const deployCreateCallData = factory.interface.encodeFunctionData(
      "deployCreate",
      [deployTxData]
    );
    const implementationContractAddress =
      await this.calculateDeployCreateAddress(factory.address);
    const upgradeProxyCallData = factory.interface.encodeFunctionData(
      "upgradeProxy",
      [salt, implementationContractAddress, initCallData]
    );
    const deployCreate = this.encodeMultiCallArgs(
      factory.address,
      0,
      deployCreateCallData
    );
    const upgradeProxy = this.encodeMultiCallArgs(
      factory.address,
      0,
      upgradeProxyCallData
    );
    return [deployCreate, upgradeProxy];
  }
  encodeMultiCallArgs(
    targetAddress: string,
    value: BigNumberish,
    callData: BytesLike
  ): MultiCallArgsStruct {
    const output: MultiCallArgsStruct = {
      target: targetAddress,
      value,
      data: callData,
    };
    return output;
  }

  /**
   * @description calculates the address of a contract deployed with deployCreate
   * @param deployerAddress address of the deployer
   * @returns
   */
  async calculateDeployCreateAddress(deployerAddress: string) {
    const factoryNonce = await this.ethers.provider.getTransactionCount(
      deployerAddress
    );
    return this.ethers.utils.getContractAddress({
      from: deployerAddress,
      nonce: factoryNonce,
    });
  }

  /**
   * @description calculates the address of a contract deployed with the following metamorphic code "0x6020363636335afa1536363636515af43d36363e3d36f3"
   * @param factoryAddress address of the factory that deployed the contract
   * @param salt string none hex formatted salt used to deploy the contract
   * @returns returns the address of the metamorphic contract deployed with the following metamorphic code "0x6020363636335afa1536363636515af43d36363e3d36f3"
   */
  async CalculateDeployCreate2Address(factoryAddress: string, salt: string) {
    const initCode = "0x6020363636335afa1536363636515af43d36363e3d36f3";
    return this.ethers.utils.getCreate2Address(
      factoryAddress,
      this.ethers.utils.formatBytes32String(salt),
      this.ethers.utils.keccak256(initCode)
    );
  }

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
  async deployUpgradeableGasSafe(
    contractName: string,
    initCallData: string,
    constructorArgs: any[],
    salt: string,
    waitConfirmantions: number = 0,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ) {
    const ImplementationBase = await this.ethers.getContractFactory(
      contractName
    );
    try {
      return await this.multiCallDeployUpgradeable(
        ImplementationBase,
        initCallData,
        constructorArgs,
        salt,
        overrides
      );
    } catch (err) {
      if (err instanceof MultiCallGasError) {
        return this.deployUpgradeable(
          contractName,
          initCallData,
          constructorArgs,
          salt,
          waitConfirmantions,
          overrides
        );
      }
      throw err;
    }
  }
  /**
   * @description attempts to upgrade a proxy using a multicall deploycreate and upgradeProxy,
   * if the gas is too high, it will deploy the implementation contract and upgrade the proxy with 2 separate calls
   * @param contractName name of the contract to deploy
   * @param initCallData encoded inititalize call data
   * @param constructorArgs constructor arguments (can only be used for immutable variables)
   * @param salt bytes32 formatted salt used to deploy the proxy
   * @param waitConfirmations
   * @param overrides
   * @returns
   */
  async upgradeProxyGasSafe(
    contractName: string,
    initCallData: string,
    constructorArgs: any[],
    salt: string,
    waitConfirmations: number = 0,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ) {
    const ImplementationBase = await this.ethers.getContractFactory(
      contractName
    );
    try {
      return await this.multiCallUpgradeProxy(
        ImplementationBase,
        initCallData,
        constructorArgs,
        salt,
        overrides
      );
    } catch (err) {
      if (err instanceof MultiCallGasError) {
        const txResponse = await this.deployCreate(
          ImplementationBase,
          constructorArgs,
          overrides
        );

        const receipt = await txResponse.wait(waitConfirmations);
        const logicAddress = this.getEventVar(
          receipt,
          EVENT_DEPLOYED_RAW,
          CONTRACT_ADDR
        );
        return this.upgradeProxy(logicAddress, initCallData, salt, overrides);
      }
      throw err;
    }
  }

  /**
   * @param contract name of the contract to deploy, or a contract factory
   * @param constructorArgs constructor arguments for the implementation contract
   * @param overrides
   * @returns a promise that resolves to a transaction response
   */
  async deployCreate(
    contract: string | ContractFactory,
    constructorArgs: any[] = [],
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ) {
    const factory = await this.getFactory();
    const implementationBase =
      contract instanceof ContractFactory
        ? contract
        : await this.ethers.getContractFactory(contract);

    const deployTxData = implementationBase.getDeployTransaction(
      ...constructorArgs
    ).data as BytesLike;
    if (overrides === undefined) {
      return await factory.deployCreate(deployTxData);
    } else {
      return await factory.deployCreate(deployTxData, overrides);
    }
  }

  async deployCreate2(
    contractName: string,
    constructorArgs: any[] = [],
    salt: string,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ) {
    const factory = await this.getFactory();
    const implementationBase = await this.ethers.getContractFactory(
      contractName
    );
    const deployTxData = implementationBase.getDeployTransaction(
      ...constructorArgs
    ).data as BytesLike;
    if (overrides === undefined) {
      return await factory.deployCreate2(0, salt, deployTxData);
    } else {
      return await factory.deployCreate2(0, deployTxData, salt, overrides);
    }
  }

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
  async deployUpgradeable(
    contract: string | ContractFactory,
    initCallData: string,
    constructorArgs: Array<string>,
    salt: string,
    waitConfirmation: number = 0,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ) {
    const factory = await this.getFactory();
    const txResponse = await this.deployCreate(
      contract,
      constructorArgs,
      overrides
    );
    const receipt = await txResponse.wait(waitConfirmation);
    const implementationContractAddress = await this.getEventVar(
      receipt,
      "DeployedRaw",
      "contractAddr"
    );

    // use mutlticall to deploy proxy and upgrade proxy
    const multiCallArgs =
      await this.encodeMultiCallDeployProxyAndUpgradeProxyArgs(
        implementationContractAddress,
        initCallData,
        salt
      );
    if (overrides === undefined) {
      return await factory.multiCall(multiCallArgs);
    } else {
      return await factory.multiCall(multiCallArgs, overrides);
    }
  }

  async deployCreateAndRegister(
    contractName: string,
    constructorArgs: any[],
    salt: string,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction> {
    const factory = await this.getFactory();
    const logicContract: any = await this.ethers.getContractFactory(
      contractName
    );
    // if not constructor ars is provide and empty array is used to indicate no constructor args
    // encode deployBcode,
    const deployTxData = logicContract.getDeployTransaction(...constructorArgs)
      .data as BytesLike;
    if (overrides === undefined) {
      return await factory.deployCreateAndRegister(deployTxData, salt);
    } else {
      return await factory.deployCreateAndRegister(
        deployTxData,
        salt,
        overrides
      );
    }
  }

  /**
   * @description deploys logic contract with deployCreate, then upgradeProxy with the logic contract address
   * @param logicAddress address of the logic contract
   * @param factory connected instance of ProxyFactory
   * @param initCallData encoded call data for the initialize function of the implementation contract
   * @param salt bytes32 formatted salt used to deploy the proxy
   * @param overrides tx detail overrides
   * @returns
   */
  async upgradeProxy(
    logicAddress: string,
    initCallData: string,
    salt: string,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ) {
    const factory = await this.getFactory();
    // upgrade the proxy
    if (overrides === undefined) {
      return await factory.upgradeProxy(salt, logicAddress, initCallData);
    } else {
      return await factory.upgradeProxy(
        salt as BytesLike,
        logicAddress,
        initCallData,
        overrides
      );
    }
  }

  /**
   * @description returns everything on the left side of the :
   * ie: src/proxy/Proxy.sol:Mock => src/proxy/Proxy.sol
   * @param qualifiedName the relative path of the contract file + ":" + name of contract
   * @returns the relative path of the contract
   */
  extractPath(qualifiedName: string) {
    return qualifiedName.split(":")[0];
  }

  /**
   * @description goes through the receipt from the
   * transaction and extract the specified event name and variable
   * @param receipt tx object returned from the tran
   * @param eventName
   * @param varName
   * @returns
   */
  getEventVar(receipt: ContractReceipt, eventName: string, varName: string) {
    let result = "0x";
    if (receipt.events !== undefined) {
      const events = receipt.events;
      for (let i = 0; i < events.length; i++) {
        // look for the event
        if (events[i].event === eventName) {
          if (events[i].args !== undefined) {
            const args = events[i].args;
            // extract the deployed mock logic contract address from the event
            result = args !== undefined ? args[varName] : undefined;
            if (result !== undefined) {
              return result;
            }
          } else {
            throw new Error(
              `failed to extract ${varName} from event: ${eventName}`
            );
          }
        }
      }
    }
    throw new Error(`failed to find event: ${eventName}`);
  }
}
