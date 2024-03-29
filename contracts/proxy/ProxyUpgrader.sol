// SPDX-License-Identifier: MIT-open-group
pragma solidity ^0.8.17;

/**
 * @title ProxyUpgrader
 * @author Hunter Prendergast (et3p), ZJ Lin, Troy Salem (Cr0wn_Gh0ul)
 */
abstract contract ProxyUpgrader {
    function __upgrade(address _proxy, address _newImpl) internal {
        bytes memory cdata = abi.encodePacked(
            hex"ca11c0de11",
            uint256(uint160(_newImpl))
        );
        assembly ("memory-safe") {
            let success := call(
                gas(),
                _proxy,
                0,
                add(cdata, 0x20),
                mload(cdata),
                0x00,
                0x00
            )
            let ptr := mload(0x40)
            mstore(0x40, add(ptr, returndatasize()))
            returndatacopy(ptr, 0x00, returndatasize())
            if iszero(success) {
                revert(ptr, returndatasize())
            }
        }
    }
}
