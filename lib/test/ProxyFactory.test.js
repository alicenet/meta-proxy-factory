"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deployConnected = void 0;
const hardhat_1 = require("hardhat");
const helpers = __importStar(require("../src/index"));
const proxyFactory_1 = require("../src/proxyFactory");
describe("Proxy Factory Mock Test", async () => {
    it("Should Deploy Factory", async () => {
        await helpers.deployFactory();
    });
    it("Should Deploy Factory & Mock", async () => {
        let proxyFactory = await helpers.deployFactory();
        let NotExistent = helpers.getMetamorphicAddress(proxyFactory.address, "MockOne");
        await helpers.deployUpgradeableWithFactory(proxyFactory, "Mock", "MockOne", ["foo", 1337], [1, NotExistent, NotExistent]);
    });
    it("Should Deploy Factory & 3 Mocks (connected addresses)", async () => {
        await (0, exports.deployConnected)();
    });
    it("should deploy factory", async () => {
        const deployer = await new proxyFactory_1.Factory(hardhat_1.ethers);
        (0, hardhat_1.expect)(await deployer.isInitialized());
    });
});
const deployConnected = async () => {
    // deploy the factory proxy
    let proxyFactory = await helpers.deployFactory();
    // calculate the addresses of the contracts we are going to deploy
    let MockOneAddress = helpers.getMetamorphicAddress(proxyFactory.address, "MockOne");
    let MockTwoAddress = helpers.getMetamorphicAddress(proxyFactory.address, "MockTwo");
    let MockThreeAddress = helpers.getMetamorphicAddress(proxyFactory.address, "MockThree");
    const MockOne = await helpers.deployUpgradeableWithFactory(proxyFactory, "Mock", "MockOne", ["foo", 1337], [1, MockTwoAddress, MockThreeAddress]);
    const MockTwo = await helpers.deployUpgradeableWithFactory(proxyFactory, "Mock", "MockTwo", ["bar", 1985], [1, MockOneAddress, MockThreeAddress]);
    const MockThree = await helpers.deployUpgradeableWithFactory(proxyFactory, "Mock", "MockThree", ["baz", 42], [1, MockOneAddress, MockTwoAddress]);
    let mocks = {
        MockOne,
        MockOneAddress,
        MockTwo,
        MockTwoAddress,
        MockThree,
        MockThreeAddress,
    };
    return mocks;
};
exports.deployConnected = deployConnected;
