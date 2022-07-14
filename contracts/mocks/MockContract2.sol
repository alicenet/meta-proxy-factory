// SPDX-License-Identifier: MIT-open-group
pragma solidity ^0.8.11;

/**
@dev This mock does not inheirt the ProxyChild contract and implements the logic itself
*/
contract Mock2 {
    uint256 immutable _version;
    address immutable _anotherMock;
    address immutable _factory;

    string public _name;
    uint256 public _a;

    modifier onlyFactory() {
        require(msg.sender == _factory, "ChildProxy: only factory allowed");
        _;
    }

    constructor(address factory_, uint256 version_, address anotherMock_) {
        _factory = factory_;
        _version = version_;
        _anotherMock = anotherMock_;
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