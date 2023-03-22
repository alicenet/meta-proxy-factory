// SPDX-License-Identifier: MIT-open-group
pragma solidity ^0.8.11;
import "./DeterministicAddress.sol";
import "./proxy/Proxy.sol";
import "./ProxyFactoryBase.sol";

/**
 * @title ProxyFactory
 * @author Hunter Prendergast (et3p), ZJ Lin, Troy Salem (Cr0wn_Gh0ul), Leonardo Teixeira(vtleonardo)
 */
/// @custom:salt ProxyFactory
contract ProxyFactory is ProxyFactoryBase {
    /**
     * @dev The constructor encodes the proxy deploy byte code with the _UNIVERSAL_DEPLOY_CODE at the
     * head and the factory address at the tail, and deploys the proxy byte code using create OpCode.
     * The result of this deployment will be a contract with the proxy contract deployment bytecode with
     * its constructor at the head, runtime code in the body and constructor args at the tail. The
     * constructor then sets proxyTemplate_ state var to the deployed proxy template address the deploy
     * account will be set as the first owner of the factory.
     */
    constructor() ProxyFactoryBase() {}

    /**
     * @notice callAny allows EOA to call function impersonating the factory address
     * @param target_: the address of the contract to be called
     * @param value_: value in WEIs to send together the call
     * @param cdata_: Hex encoded state with function signature + arguments of the target function to be called
     * @return the return of the calls as a byte array
     */
    function callAny(
        address target_,
        uint256 value_,
        bytes calldata cdata_
    ) public payable onlyOwner returns (bytes memory) {
        bytes memory cdata = cdata_;
        return _callAny(target_, value_, cdata);
    }

    /**
     * @notice deployCreate allows the owner to deploy raw contracts through the factory using
     * non-deterministic address generation (create OpCode)
     * @param deployCode_ Hex encoded state with the deployment code of the contract to be deployed +
     * constructors' args (if any)
     * @return contractAddr the deployed contract address
     */
    function deployCreate(
        bytes calldata deployCode_
    ) public onlyOwner returns (address contractAddr) {
        return _deployCreate(deployCode_);
    }

    /**
     * @notice allows the owner to deploy contracts through the factory using
     * non-deterministic address generation and record the address to external contract mapping
     * @param deployCode_ Hex encoded state with the deployment code of the contract to be deployed +
     * constructors' args (if any)
     * @param salt_ salt used to determine the final determinist address for the deployed contract
     * @return contractAddr the deployed contract address
     */
    function deployCreateAndRegister(
        bytes calldata deployCode_,
        bytes32 salt_
    ) public onlyOwner returns (address contractAddr) {
        address newContractAddress = _deployCreate(deployCode_);
        _addNewContract(salt_, newContractAddress);
        return newContractAddress;
    }

    /**
     * @dev deployCreate2 allows the owner to deploy contracts with deterministic address
     * through the factory
     * @param value_ endowment value in WEIS for the created contract
     * @param salt_ salt used to determine the final determinist address for the deployed contract
     * @param deployCode_ Hex encoded state with the deployment code of the contract to be deployed +
     * constructors' args (if any)
     * @return contractAddr the deployed contract address
     */
    function deployCreate2(
        uint256 value_,
        bytes32 salt_,
        bytes calldata deployCode_
    ) public payable onlyOwner returns (address contractAddr) {
        contractAddr = _deployCreate2(value_, salt_, deployCode_);
    }

    /**
     * @dev deployProxy deploys a proxy contract with upgradable logic. See Proxy.sol contract.
     * @param salt_ salt used to determine the final determinist address for the deployed contract
     */
    function deployProxy(
        bytes32 salt_
    ) public onlyOwner returns (address contractAddr) {
        contractAddr = _deployProxy(salt_);
    }

    /**
     * @dev initializeContract allows the owner/delegator to initialize contracts deployed via factory
     * @param contract_ address of the contract that will be initialized
     * @param initCallData_ Hex encoded initialization function signature + parameters to initialize the
     * deployed contract
     */
    function initializeContract(
        address contract_,
        bytes calldata initCallData_
    ) public onlyOwner {
        _initializeContract(contract_, initCallData_);
    }

    /**
     * @dev multiCall allows EOA to make multiple function calls within a single transaction
     * impersonating the factory
     * @param cdata_: array of hex encoded state with the function calls (function signature + arguments)
     */
    function multiCall(
        MultiCallArgs[] calldata cdata_
    ) public onlyOwner returns (bytes[] memory) {
        return _multiCall(cdata_);
    }

    /**
     * @dev upgradeProxy updates the implementation/logic address of an already deployed proxy contract.
     * @param salt_ salt used to determine the final determinist address for the deployed proxy contract
     * @param newImpl_ address of the new contract that contains the new implementation logic
     * @param initCallData_ Hex encoded initialization function signature + parameters to initialize the
     * new implementation contract
     */
    function upgradeProxy(
        bytes32 salt_,
        address newImpl_,
        bytes calldata initCallData_
    ) public onlyOwner {
        _upgradeProxy(salt_, newImpl_, initCallData_);
    }

    /**
     * @notice getter function for retrieving the implementation address of an AliceNet proxy.
     * @param proxyAddress_ the address of the proxy
     * @return the address of implementation/logic contract used by the proxy
     */
    function getProxyImplementation(
        address proxyAddress_
    ) public view returns (address) {
        return __getProxyImplementation(proxyAddress_);
    }
}
