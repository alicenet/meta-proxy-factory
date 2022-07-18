# Metamorphic Proxy Factory
> :loudspeaker: This repo is a work in progress and all code should be considered experimental at this stage. Use at your own risk! 

## About
#### Metamorphic Contracts
The metamorphic contract is an intermediate contract used to deploy any contract with the same initialization code. Upon deployment, the metamorphic contract static calls back into a deploying contract with an empty call to get an address for the location to delegate call to. Metamorphic contracts are currently used with template contracts described in the next section to maintain similarity in initialization code hash for the purpose of implementing a deterministic address contract environment. A point to consider is that during deployment the metamorphic contract calls back into the deployer with 0 call data and lands in the fallback function of the deploying contract. Since the fallback function returns the address in _implementation variable the metamorphic contract essentially becomes whatever is in the _implementation variable contract location.

#### Template Contracts
Template contracts are contracts with initialization code deployed in the runtime code portion of the template contract. This is done by appending a 8 byte universal code copy byte code to the beginning of any smart contract deployment code. 
```
//codesize, pc,  pc, codecopy, codesize, push1 09, return push2 <codesize> 56 5b
           /*
           00 38 codesize
           01 58 pc            codesize
           02 58 pc            01 | codesize
           03 39 codecopy      02 | 01 | codesize
           04 38 codesize
           05 60 push1 09      codesize
           07 f3 return        09 | codesize
            */
// 38585839386009f3
```
During deployment, in the constructor phase, this bytecode will return all values after it to the contract runtime code location. 
When a metamorphic contract delegates call into a template contract, it is essentially running the constructor with argos already deployed at the template location and returning the contract byte code to the runtime section of the metamorphic contract.

#### Upgradeable Proxies
##### Proxy Contract
Has a fallback function, inside the fallback function theres an admin function to change implementation or lock upgradeability of the proxy.
The factory has a _upgradeProxy function for upgrading proxies by changing their logic contract address. To allow upgrade lock logic contract can implement ProxyInternalUpgradeLock.

##### Deploying Upgradeable Proxies
By default a proxy template is deployed in the constructor of proxy factory. 
The deployProxy function sets the _implementation variable to the value in _proxyTemplate and deploys a metamorphic contract with a salt that identifies that contract. Then deploy the logic for the contract using deployCreate function. Then using the upgradeProxy function to point the proxy to the logic contract location. Init call data can also be passed in as an argument to initialize the proxy.
These calls can also be done with one tx using multiCall function

## Docs

## Installation
```
npm i --save-dev https://github.com/alicenet/meta-proxy-factory
````

## Contract Usage
- Contracts deployed through the proxy must have an initialize function
    ```
    function initialize() public {}
    ```

- To inherit basic functionality in your contract:
    ```
    import "meta-proxy-factory/contracts/ProxyChild.sol";
    contract Mock is ProxyChild {}
    ```
    This gives access to the `onlyFactory` & `onlyFactoryOnce` modifier as well as some basic functions

## JS Usage
> 📢 WIP

> Examples in javascript
- Deploy the proxy factory
    ```
    import * as factoryHelper from "meta-proxy-factory";
    await factoryHelper.deployFactory();
    ```
- Deploy upgradable child contract
    ```
    import * as factoryHelper from "meta-proxy-factory";
    let proxyFactory = await factoryHelper.deployFactory();
    await helpers.deployUpgradeableWithFactory(
            proxyFactory,
            "{CONTRACT_NAME}",
            "{SALT}",
            [{INITIALIZER_ARGUMENTS}],
            [{CONSTRUCTOR_ARGUMENTS}]
        )
    ```


- Calculate child contract address
    ```
    import * as factoryHelper from "meta-proxy-factory";
    factoryHelper.getMetamorphicAddress(
            {FACTORY_ADDRESS},
            {SALT}
        )
    }
    ```

## Contact
- [Hunter Prendergast (et3p)](https://github.com/nelsonhp)
- [ZJ Lin](https://github.com/z-j-lin)
- [Troy Salem (Cr0wn_Gh0ul)](https://github.com/Cr0wn-Gh0ul)