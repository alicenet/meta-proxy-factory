"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CREATE_AND_REGISTER_DEPLOYMENT = exports.UPGRADEABLE_DEPLOYMENT = exports.PROXY_ADDR = exports.ONLY_PROXY = exports.LOGIC_ADDR = exports.FACTORY_STATE_PATH = exports.CONTRACT_ADDR = exports.PROXY = exports.EVENT_DEPLOYED_RAW = exports.EVENT_DEPLOYED_PROXY = exports.FUNCTION_UPGRADE_PROXY = exports.FUNCTION_DEPLOY_CREATE = exports.FUNCTION_DEPLOY_CREATE2 = exports.FUNCTION_INITIALIZE = exports.MULTICALL_GAS_LIMIT = void 0;
require("process");
exports.MULTICALL_GAS_LIMIT = "10000000";
// function names
exports.FUNCTION_INITIALIZE = "initialize";
exports.FUNCTION_DEPLOY_CREATE2 = "deployCreate2";
exports.FUNCTION_DEPLOY_CREATE = "deployCreate";
exports.FUNCTION_UPGRADE_PROXY = "upgradeProxy";
// Factory event names
exports.EVENT_DEPLOYED_PROXY = "DeployedProxy";
exports.EVENT_DEPLOYED_RAW = "DeployedRaw";
exports.PROXY = "Proxy";
// Event variable names
exports.CONTRACT_ADDR = "contractAddr";
// Hardhat CLI Task names
exports.FACTORY_STATE_PATH = `../scripts/generated/factoryState`;
exports.LOGIC_ADDR = "LogicAddress";
exports.ONLY_PROXY = "onlyProxy";
exports.PROXY_ADDR = "ProxyAddress";
exports.UPGRADEABLE_DEPLOYMENT = "deployUpgradeable";
exports.CREATE_AND_REGISTER_DEPLOYMENT = "deployCreateAndRegister";
