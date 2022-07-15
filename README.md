# MetaProxyFactory
> :loudspeaker: This repo is a work in progress and all code should be considered experimental at this stage. Use at your own risk! 

## About

## Docs

## Installation
```
npm i --save-dev https://github.com/alicenet/meta-proxy-factory
````
## Usage
> Examples in javascript
- Deploy the proxy factory
    ```
    import * as helpers from "../utils/helpers";
    await helpers.deployFactory();
    ```
- Deploy upgradable child contract
    ```
    import * as helpers from "../utils/helpers";
    let proxyFactory = await helpers.deployFactory();
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
    import * as helpers from "../utils/helpers";
    helpers.getMetamorphicAddress(
            {FACTORY_ADDRESS},
            {SALT}
        )
    }
    ```

## Contact
- [Hunter Prendergast (et3p)](https://github.com/nelsonhp)
- [ZJ Lin](https://github.com/z-j-lin)
- [Troy Salem (Cr0wn_Gh0ul)](https://github.com/Cr0wn-Gh0ul)