import type { Provider, TransactionRequest } from "@ethersproject/providers";
import { ContractFactory, Overrides, Signer } from "ethers";
import type { PromiseOrValue } from "../common";
import type { ProxyFactory, ProxyFactoryInterface } from "../ProxyFactory";
type ProxyFactoryConstructorParams = [signer?: Signer] | ConstructorParameters<typeof ContractFactory>;
export declare class ProxyFactory__factory extends ContractFactory {
    constructor(...args: ProxyFactoryConstructorParams);
    deploy(overrides?: Overrides & {
        from?: PromiseOrValue<string>;
    }): Promise<ProxyFactory>;
    getDeployTransaction(overrides?: Overrides & {
        from?: PromiseOrValue<string>;
    }): TransactionRequest;
    attach(address: string): ProxyFactory;
    connect(signer: Signer): ProxyFactory__factory;
    static readonly bytecode = "0x60a060405234801561001057600080fd5b506040516000906738585839386009f360c01b90610030602082016100a6565b601f1982820381018352601f90910116604081905261005592919030906020016100b4565b604051602081830303815290604052905060008151602083016000f0905080610082573d6000803e3d6000fd5b6001600160a01b031660805250600080546001600160a01b031916331790556100fb565b6102db80620017f383390190565b6001600160c01b0319841681528251600090815b818110156100e557602081870181015160088684010152016100c8565b5060089201918201929092526028019392505050565b6080516116dc620001176000396000610b7001526116dc6000f3fe6080604052600436106100f35760003560e01c80636c0f79b61161008a578063c56ca9ed11610059578063c56ca9ed14610395578063cfe10b30146103b5578063e1d7a8e4146103d3578063f39ec1f7146103f3576100f3565b80636c0f79b61461023a5780638653a4651461025c5780638da5cb5b1461033f578063aaf10f421461036a576100f3565b8063248b1701116100c6578063248b1701146101ba57806327fe1822146101e757806339cab4721461020757806356f2a76114610227576100f3565b8063043c94141461010a57806312e6bf6a1461012c57806313af403514610155578063204e1c7a14610175575b3480156100ff57600080fd5b506002543d5260203df35b34801561011657600080fd5b5061012a610125366004611139565b610413565b005b61013f61013a366004611193565b610453565b60405161014c9190611243565b60405180910390f35b34801561016157600080fd5b5061012a610170366004611256565b6104d8565b34801561018157600080fd5b50610195610190366004611256565b61054d565b60405173ffffffffffffffffffffffffffffffffffffffff909116815260200161014c565b3480156101c657600080fd5b506101da6101d5366004611271565b61055e565b60405161014c91906112e6565b3480156101f357600080fd5b50610195610202366004611366565b61059f565b34801561021357600080fd5b506101956102223660046113a8565b6105d9565b6101956102353660046113c1565b610612565b34801561024657600080fd5b5061024f610657565b60405161014c91906113fc565b34801561026857600080fd5b50610195610277366004611440565b6040517fff0000000000000000000000000000000000000000000000000000000000000060208201527fffffffffffffffffffffffffffffffffffffffff000000000000000000000000606083901b166021820152603581018390527f1c0bf703a3415cada9785e89e9d70314c3111ae7d8e04f33bb42eb1d264088be60558201819052600091607501604080517fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffe08184030181529190528051602090910120949350505050565b34801561034b57600080fd5b5060005473ffffffffffffffffffffffffffffffffffffffff16610195565b34801561037657600080fd5b5060025473ffffffffffffffffffffffffffffffffffffffff16610195565b3480156103a157600080fd5b506101956103b036600461146c565b6106af565b3480156103c157600080fd5b5060015460405190815260200161014c565b3480156103df57600080fd5b5061012a6103ee3660046114b8565b6106f7565b3480156103ff57600080fd5b5061019561040e3660046113a8565b610735565b33301480610438575060005473ffffffffffffffffffffffffffffffffffffffff1633145b61044157600080fd5b61044d8484848461075f565b50505050565b60603330148061047a575060005473ffffffffffffffffffffffffffffffffffffffff1633145b61048357600080fd5b600083838080601f0160208091040260200160405190810160405280939291908181526020018383808284376000920191909152509293506104cc92508891508790508361090a565b9150505b949350505050565b333014806104fd575060005473ffffffffffffffffffffffffffffffffffffffff1633145b61050657600080fd5b600080547fffffffffffffffffffffffff00000000000000000000000000000000000000001673ffffffffffffffffffffffffffffffffffffffff92909216919091179055565b60006105588261092d565b92915050565b606033301480610585575060005473ffffffffffffffffffffffffffffffffffffffff1633145b61058e57600080fd5b6105988383610997565b9392505050565b6000333014806105c6575060005473ffffffffffffffffffffffffffffffffffffffff1633145b6105cf57600080fd5b6105988383610af3565b600033301480610600575060005473ffffffffffffffffffffffffffffffffffffffff1633145b61060957600080fd5b61055882610b6b565b600033301480610639575060005473ffffffffffffffffffffffffffffffffffffffff1633145b61064257600080fd5b61064e85858585610c2a565b95945050505050565b606060018054806020026020016040519081016040528092919081815260200182805480156106a557602002820191906000526020600020905b815481526020019060010190808311610691575b5050505050905090565b6000333014806106d6575060005473ffffffffffffffffffffffffffffffffffffffff1633145b6106df57600080fd5b60006106eb8585610af3565b90506104d08382610cd1565b3330148061071c575060005473ffffffffffffffffffffffffffffffffffffffff1633145b61072557600080fd5b610730838383610db2565b505050565b60008181526003602052604081205473ffffffffffffffffffffffffffffffffffffffff16610558565b604080517fff000000000000000000000000000000000000000000000000000000000000006020808301919091523060601b7fffffffffffffffffffffffffffffffffffffffff000000000000000000000000166021830152603582018790527f1c0bf703a3415cada9785e89e9d70314c3111ae7d8e04f33bb42eb1d264088be605580840191909152835180840390910181526075909201909252805191012061080a8185610de7565b60006108158261092d565b90508473ffffffffffffffffffffffffffffffffffffffff168173ffffffffffffffffffffffffffffffffffffffff16146108a1576040517f35da668500000000000000000000000000000000000000000000000000000000815273ffffffffffffffffffffffffffffffffffffffff8083166004830152861660248201526044015b60405180910390fd5b6108ac828585610db2565b6040805187815273ffffffffffffffffffffffffffffffffffffffff848116602083015287168183015290517f430fbfc2698f4e110d994ecf59c30881703dc7b8cd50bc5f12e4e48d21e144a39181900360600190a1505050505050565b60606104d073ffffffffffffffffffffffffffffffffffffffff85168385610e6f565b6000806040518060400160405280600581526020017f0cbcae703c0000000000000000000000000000000000000000000000000000008152509050600080825160208401865afa6040513d81016040523d6000823e8161098b573d81fd5b5160601c949350505050565b60608167ffffffffffffffff8111156109b2576109b261150b565b6040519080825280602002602001820160405280156109e557816020015b60608152602001906001900390816109d05790505b50905060005b82811015610aec57610abc848483818110610a0857610a0861153a565b9050602002810190610a1a9190611569565b610a28906020810190611256565b858584818110610a3a57610a3a61153a565b9050602002810190610a4c9190611569565b60200135868685818110610a6257610a6261153a565b9050602002810190610a749190611569565b610a829060408101906115a7565b8080601f01602080910402602001604051908101604052809392919081815260200183838082843760009201919091525061090a92505050565b828281518110610ace57610ace61153a565b60200260200101819052508080610ae49061160c565b9150506109eb565b5092915050565b600060405180838582378301818103826000f092505050610b1c610b15823b90565b1515610e95565b60405173ffffffffffffffffffffffffffffffffffffffff821681527fd3acf0da590cfcd8f020afd7f40b7e6e4c8bd2fc9eb7aec9836837b667685b3a9060200160405180910390a192915050565b6000807f000000000000000000000000000000000000000000000000000000000000000090508060025560405160208101604052766020363636335afa1536363636515af43d36363e3d36f360481b8152836017826000f5925050610bd1610b15833b90565b610bdb8383610cd1565b60405173ffffffffffffffffffffffffffffffffffffffff831681527f06690e5b52be10a3d5820ec875c3dd3327f3077954a09f104201e40e5f7082c69060200160405180910390a150919050565b600060405180838582378301858282038389f592505050610c4c610b15823b90565b6001805480820182556000919091527fb10e2d527612073b26eecdfd717e6a320cf44b4afac2b0732d9fcbe2b7fa0cf60184905560405173ffffffffffffffffffffffffffffffffffffffff821681527fd3acf0da590cfcd8f020afd7f40b7e6e4c8bd2fc9eb7aec9836837b667685b3a9060200160405180910390a1949350505050565b60008281526003602052604090205473ffffffffffffffffffffffffffffffffffffffff1615610d30576040517fcd3b7fe100000000000000000000000000000000000000000000000000000000815260048101839052602401610898565b600180548082019091557fb10e2d527612073b26eecdfd717e6a320cf44b4afac2b0732d9fcbe2b7fa0cf60182905560009182526003602052604090912080547fffffffffffffffffffffffff00000000000000000000000000000000000000001673ffffffffffffffffffffffffffffffffffffffff909216919091179055565b8015610730576040518082016040528183823760008083836000885af161044d576040519050803d016040523d6000823e3d81fd5b6040517fca11c0de11000000000000000000000000000000000000000000000000000000602082015273ffffffffffffffffffffffffffffffffffffffff8216602582015260009060450160405160208183030381529060405290506000808251602084016000875af16040513d81016040523d6000823e81610e68573d81fd5b5050505050565b60606104d084848460405180606001604052806029815260200161167e60299139610ecf565b80610ecc576040517f5e393b2600000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b50565b606082471015610f61576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152602660248201527f416464726573733a20696e73756666696369656e742062616c616e636520666f60448201527f722063616c6c00000000000000000000000000000000000000000000000000006064820152608401610898565b6000808673ffffffffffffffffffffffffffffffffffffffff168587604051610f8a919061166b565b60006040518083038185875af1925050503d8060008114610fc7576040519150601f19603f3d011682016040523d82523d6000602084013e610fcc565b606091505b5091509150610fdd87838387610fe8565b979650505050505050565b6060831561107e5782516000036110775773ffffffffffffffffffffffffffffffffffffffff85163b611077576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152601d60248201527f416464726573733a2063616c6c20746f206e6f6e2d636f6e74726163740000006044820152606401610898565b50816104d0565b6104d083838151156110935781518083602001fd5b806040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016108989190611243565b803573ffffffffffffffffffffffffffffffffffffffff811681146110eb57600080fd5b919050565b60008083601f84011261110257600080fd5b50813567ffffffffffffffff81111561111a57600080fd5b60208301915083602082850101111561113257600080fd5b9250929050565b6000806000806060858703121561114f57600080fd5b8435935061115f602086016110c7565b9250604085013567ffffffffffffffff81111561117b57600080fd5b611187878288016110f0565b95989497509550505050565b600080600080606085870312156111a957600080fd5b6111b2856110c7565b935060208501359250604085013567ffffffffffffffff81111561117b57600080fd5b60005b838110156111f05781810151838201526020016111d8565b50506000910152565b600081518084526112118160208601602086016111d5565b601f017fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffe0169290920160200192915050565b60208152600061059860208301846111f9565b60006020828403121561126857600080fd5b610598826110c7565b6000806020838503121561128457600080fd5b823567ffffffffffffffff8082111561129c57600080fd5b818501915085601f8301126112b057600080fd5b8135818111156112bf57600080fd5b8660208260051b85010111156112d457600080fd5b60209290920196919550909350505050565b6000602080830181845280855180835260408601915060408160051b870101925083870160005b82811015611359577fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffc08886030184526113478583516111f9565b9450928501929085019060010161130d565b5092979650505050505050565b6000806020838503121561137957600080fd5b823567ffffffffffffffff81111561139057600080fd5b61139c858286016110f0565b90969095509350505050565b6000602082840312156113ba57600080fd5b5035919050565b600080600080606085870312156113d757600080fd5b8435935060208501359250604085013567ffffffffffffffff81111561117b57600080fd5b6020808252825182820181905260009190848201906040850190845b8181101561143457835183529284019291840191600101611418565b50909695505050505050565b6000806040838503121561145357600080fd5b82359150611463602084016110c7565b90509250929050565b60008060006040848603121561148157600080fd5b833567ffffffffffffffff81111561149857600080fd5b6114a4868287016110f0565b909790965060209590950135949350505050565b6000806000604084860312156114cd57600080fd5b6114d6846110c7565b9250602084013567ffffffffffffffff8111156114f257600080fd5b6114fe868287016110f0565b9497909650939450505050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052604160045260246000fd5b7f4e487b7100000000000000000000000000000000000000000000000000000000600052603260045260246000fd5b600082357fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffa183360301811261159d57600080fd5b9190910192915050565b60008083357fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffe18436030181126115dc57600080fd5b83018035915067ffffffffffffffff8211156115f757600080fd5b60200191503681900382131561113257600080fd5b60007fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff8203611664577f4e487b7100000000000000000000000000000000000000000000000000000000600052601160045260246000fd5b5060010190565b6000825161159d8184602087016111d556fe416464726573733a206c6f772d6c6576656c2063616c6c20776974682076616c7565206661696c6564a2646970667358221220003c5fe50a6476c15b68466b33e357aeec3b96721a66a5ef3f2f2608ed4a303a64736f6c6343000811003360a060405234801561001057600080fd5b50336080526080516102ac61002f6000396000601b01526102ac6000f3fe60806040523661001357610011610017565b005b6100115b60007f00000000000000000000000000000000000000000000000000000000000000009050600536146025361417156101275760003560d81c80640cbcae703c81146100995764ca11c0de1181146100ea5761009460127f66756e6374696f6e206e6f7420666f756e640000000000000000000000000000610132565b610124565b6040517fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff5460601b7fffffffffffffffffffffffffffffffffffffffff000000000000000000000000168152601481f35b82331461011c5761011c600c7f756e617574686f72697a65640000000000000000000000000000000000000000610132565b610124610177565b50505b61012f6101fa565b50565b6040517f08c379a00000000000000000000000000000000000000000000000000000000081526020600482015260248101839052604481018290526064808201919081fd5b6bca11c0de15dead10deadc0de6000195460a01c036101bb576101bb600d7f757064617465206c6f636b656400000000000000000000000000000000000000610132565b73ffffffffffffffffffffffffffffffffffffffff600535167fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff819055005b7fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff548061024c5761024c600d7f6c6f676963206e6f742073657400000000000000000000000000000000000000610132565b60405136810160405236600082376000803683855af491503d6000823e81610272573d81fd5b3d81f3fea264697066735822122008cba2e77d14c8cdbf42884951755adca3df49c0b7f5dbf6714f8ff7438492a564736f6c63430008110033";
    static readonly abi: readonly [{
        readonly inputs: readonly [];
        readonly stateMutability: "nonpayable";
        readonly type: "constructor";
    }, {
        readonly inputs: readonly [];
        readonly name: "CodeSizeZero";
        readonly type: "error";
    }, {
        readonly inputs: readonly [{
            readonly internalType: "address";
            readonly name: "current";
            readonly type: "address";
        }, {
            readonly internalType: "address";
            readonly name: "expected";
            readonly type: "address";
        }];
        readonly name: "IncorrectProxyImplementation";
        readonly type: "error";
    }, {
        readonly inputs: readonly [{
            readonly internalType: "bytes32";
            readonly name: "salt";
            readonly type: "bytes32";
        }];
        readonly name: "SaltAlreadyInUse";
        readonly type: "error";
    }, {
        readonly anonymous: false;
        readonly inputs: readonly [{
            readonly indexed: false;
            readonly internalType: "bytes32";
            readonly name: "salt";
            readonly type: "bytes32";
        }, {
            readonly indexed: false;
            readonly internalType: "address";
            readonly name: "contractAddr";
            readonly type: "address";
        }];
        readonly name: "Deployed";
        readonly type: "event";
    }, {
        readonly anonymous: false;
        readonly inputs: readonly [{
            readonly indexed: false;
            readonly internalType: "address";
            readonly name: "contractAddr";
            readonly type: "address";
        }];
        readonly name: "DeployedProxy";
        readonly type: "event";
    }, {
        readonly anonymous: false;
        readonly inputs: readonly [{
            readonly indexed: false;
            readonly internalType: "address";
            readonly name: "contractAddr";
            readonly type: "address";
        }];
        readonly name: "DeployedRaw";
        readonly type: "event";
    }, {
        readonly anonymous: false;
        readonly inputs: readonly [{
            readonly indexed: false;
            readonly internalType: "address";
            readonly name: "contractAddr";
            readonly type: "address";
        }];
        readonly name: "DeployedStatic";
        readonly type: "event";
    }, {
        readonly anonymous: false;
        readonly inputs: readonly [{
            readonly indexed: false;
            readonly internalType: "address";
            readonly name: "contractAddr";
            readonly type: "address";
        }];
        readonly name: "DeployedTemplate";
        readonly type: "event";
    }, {
        readonly anonymous: false;
        readonly inputs: readonly [{
            readonly indexed: false;
            readonly internalType: "bytes32";
            readonly name: "salt";
            readonly type: "bytes32";
        }, {
            readonly indexed: false;
            readonly internalType: "address";
            readonly name: "proxyAddr";
            readonly type: "address";
        }, {
            readonly indexed: false;
            readonly internalType: "address";
            readonly name: "newlogicAddr";
            readonly type: "address";
        }];
        readonly name: "UpgradedProxy";
        readonly type: "event";
    }, {
        readonly stateMutability: "nonpayable";
        readonly type: "fallback";
    }, {
        readonly inputs: readonly [{
            readonly internalType: "address";
            readonly name: "target_";
            readonly type: "address";
        }, {
            readonly internalType: "uint256";
            readonly name: "value_";
            readonly type: "uint256";
        }, {
            readonly internalType: "bytes";
            readonly name: "cdata_";
            readonly type: "bytes";
        }];
        readonly name: "callAny";
        readonly outputs: readonly [{
            readonly internalType: "bytes";
            readonly name: "";
            readonly type: "bytes";
        }];
        readonly stateMutability: "payable";
        readonly type: "function";
    }, {
        readonly inputs: readonly [];
        readonly name: "contracts";
        readonly outputs: readonly [{
            readonly internalType: "bytes32[]";
            readonly name: "contracts_";
            readonly type: "bytes32[]";
        }];
        readonly stateMutability: "view";
        readonly type: "function";
    }, {
        readonly inputs: readonly [{
            readonly internalType: "bytes";
            readonly name: "deployCode_";
            readonly type: "bytes";
        }];
        readonly name: "deployCreate";
        readonly outputs: readonly [{
            readonly internalType: "address";
            readonly name: "contractAddr";
            readonly type: "address";
        }];
        readonly stateMutability: "nonpayable";
        readonly type: "function";
    }, {
        readonly inputs: readonly [{
            readonly internalType: "uint256";
            readonly name: "value_";
            readonly type: "uint256";
        }, {
            readonly internalType: "bytes32";
            readonly name: "salt_";
            readonly type: "bytes32";
        }, {
            readonly internalType: "bytes";
            readonly name: "deployCode_";
            readonly type: "bytes";
        }];
        readonly name: "deployCreate2";
        readonly outputs: readonly [{
            readonly internalType: "address";
            readonly name: "contractAddr";
            readonly type: "address";
        }];
        readonly stateMutability: "payable";
        readonly type: "function";
    }, {
        readonly inputs: readonly [{
            readonly internalType: "bytes";
            readonly name: "deployCode_";
            readonly type: "bytes";
        }, {
            readonly internalType: "bytes32";
            readonly name: "salt_";
            readonly type: "bytes32";
        }];
        readonly name: "deployCreateAndRegister";
        readonly outputs: readonly [{
            readonly internalType: "address";
            readonly name: "contractAddr";
            readonly type: "address";
        }];
        readonly stateMutability: "nonpayable";
        readonly type: "function";
    }, {
        readonly inputs: readonly [{
            readonly internalType: "bytes32";
            readonly name: "salt_";
            readonly type: "bytes32";
        }];
        readonly name: "deployProxy";
        readonly outputs: readonly [{
            readonly internalType: "address";
            readonly name: "contractAddr";
            readonly type: "address";
        }];
        readonly stateMutability: "nonpayable";
        readonly type: "function";
    }, {
        readonly inputs: readonly [];
        readonly name: "getImplementation";
        readonly outputs: readonly [{
            readonly internalType: "address";
            readonly name: "";
            readonly type: "address";
        }];
        readonly stateMutability: "view";
        readonly type: "function";
    }, {
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
    }, {
        readonly inputs: readonly [];
        readonly name: "getNumContracts";
        readonly outputs: readonly [{
            readonly internalType: "uint256";
            readonly name: "";
            readonly type: "uint256";
        }];
        readonly stateMutability: "view";
        readonly type: "function";
    }, {
        readonly inputs: readonly [{
            readonly internalType: "address";
            readonly name: "proxyAddress_";
            readonly type: "address";
        }];
        readonly name: "getProxyImplementation";
        readonly outputs: readonly [{
            readonly internalType: "address";
            readonly name: "";
            readonly type: "address";
        }];
        readonly stateMutability: "view";
        readonly type: "function";
    }, {
        readonly inputs: readonly [{
            readonly internalType: "address";
            readonly name: "contract_";
            readonly type: "address";
        }, {
            readonly internalType: "bytes";
            readonly name: "initCallData_";
            readonly type: "bytes";
        }];
        readonly name: "initializeContract";
        readonly outputs: readonly [];
        readonly stateMutability: "nonpayable";
        readonly type: "function";
    }, {
        readonly inputs: readonly [{
            readonly internalType: "bytes32";
            readonly name: "salt_";
            readonly type: "bytes32";
        }];
        readonly name: "lookup";
        readonly outputs: readonly [{
            readonly internalType: "address";
            readonly name: "";
            readonly type: "address";
        }];
        readonly stateMutability: "view";
        readonly type: "function";
    }, {
        readonly inputs: readonly [{
            readonly components: readonly [{
                readonly internalType: "address";
                readonly name: "target";
                readonly type: "address";
            }, {
                readonly internalType: "uint256";
                readonly name: "value";
                readonly type: "uint256";
            }, {
                readonly internalType: "bytes";
                readonly name: "data";
                readonly type: "bytes";
            }];
            readonly internalType: "struct ProxyFactoryBase.MultiCallArgs[]";
            readonly name: "cdata_";
            readonly type: "tuple[]";
        }];
        readonly name: "multiCall";
        readonly outputs: readonly [{
            readonly internalType: "bytes[]";
            readonly name: "";
            readonly type: "bytes[]";
        }];
        readonly stateMutability: "nonpayable";
        readonly type: "function";
    }, {
        readonly inputs: readonly [];
        readonly name: "owner";
        readonly outputs: readonly [{
            readonly internalType: "address";
            readonly name: "owner_";
            readonly type: "address";
        }];
        readonly stateMutability: "view";
        readonly type: "function";
    }, {
        readonly inputs: readonly [{
            readonly internalType: "address";
            readonly name: "newOwner_";
            readonly type: "address";
        }];
        readonly name: "setOwner";
        readonly outputs: readonly [];
        readonly stateMutability: "nonpayable";
        readonly type: "function";
    }, {
        readonly inputs: readonly [{
            readonly internalType: "bytes32";
            readonly name: "salt_";
            readonly type: "bytes32";
        }, {
            readonly internalType: "address";
            readonly name: "newImpl_";
            readonly type: "address";
        }, {
            readonly internalType: "bytes";
            readonly name: "initCallData_";
            readonly type: "bytes";
        }];
        readonly name: "upgradeProxy";
        readonly outputs: readonly [];
        readonly stateMutability: "nonpayable";
        readonly type: "function";
    }];
    static createInterface(): ProxyFactoryInterface;
    static connect(address: string, signerOrProvider: Signer | Provider): ProxyFactory;
}
export {};
