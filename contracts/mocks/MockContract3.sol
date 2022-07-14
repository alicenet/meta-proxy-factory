// SPDX-License-Identifier: MIT-open-group
pragma solidity ^0.8.11;

/**
@dev This mock does not inheirt the ProxyChild contract and no initalize function
*/
contract Mock3 {
    uint256 immutable _version;
    address immutable _anotherMock;
    address immutable _factory;

    string public _name;
    uint256 public _a;

    constructor(address factory_, uint256 version_, address anotherMock_) {
        _factory = factory_;
        _version = version_;
        _anotherMock = anotherMock_;
    }

    function setA(uint256 a_) public {
        _a = a_;
    }

    function setMsg(string calldata name_) public {
        _name = name_;
    }
}