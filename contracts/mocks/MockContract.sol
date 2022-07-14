// SPDX-License-Identifier: MIT-open-group
pragma solidity ^0.8.11;

import "../ProxyChild.sol";

/**
@dev This mock inheirts the ProxyChild contract to simplify constructor / initialization logic
*/
contract Mock is ProxyChild {
    uint256 immutable _version;
    address immutable _anotherAnotherMock;
    address immutable _anotherMock;

    string public _name;
    uint256 public _a;

    constructor(uint256 version_, address anotherMock_, address anotherAnotherMock_) {
        _version = version_;
        _anotherMock = anotherMock_;
        _anotherAnotherMock = anotherAnotherMock_;
    }

    function initialize(string memory name_, uint256 a_) public onlyFactory {
        _name = name_;
        _a = a_;
    }

    function setA(uint256 a_) public {
        _a = a_;
    }

    function setMsg(string calldata name_) public {
        _name = name_;
    }
}
