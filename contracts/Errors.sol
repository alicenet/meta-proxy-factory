// SPDX-License-Identifier: MIT-open-group
pragma solidity ^0.8.17;

error IncorrectProxyImplementation(address current, address expected); // error for when the proxy implementation is not the expected one
error CodeSizeZero(); // error for when the deployed contract code size is zero
error SaltAlreadyInUse(bytes32 salt); // error for when another contract has already been deployed with the same salt
error Unauthorized(); // error for when the caller is not authorized to perform the action
