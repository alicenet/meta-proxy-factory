// SPDX-License-Identifier: MIT-open-group
pragma solidity ^0.8.11;
/**
 * @title ProxyChild
 * @author Hunter Prendergast (et3p), ZJ Lin, Troy Salem (Cr0wn_Gh0ul)
 */
contract ProxyChild {
    address immutable _factory;
    bool _locked;

    modifier onlyFactory() {
        senderIsFactory();
        _;
    }

    modifier onlyFactoryOnce() {
        senderIsFactory();
        require(!_locked, "Initialized is locked");
        _;
        _locked = true;
    }

    constructor() {
        _factory = msg.sender;
    }

    function senderIsFactory() internal view {
        require(msg.sender == _factory, "ChildProxy: only factory allowed");
    }

    function getFactory() public view returns (address) {
        return _factory;
    }
}