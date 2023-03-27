import "process";
export const MULTICALL_GAS_LIMIT = "10000000";
// function names
export const FUNCTION_INITIALIZE = "initialize";
export const FUNCTION_DEPLOY_CREATE2 = "deployCreate2";
export const FUNCTION_DEPLOY_CREATE = "deployCreate";
export const FUNCTION_UPGRADE_PROXY = "upgradeProxy";

// Factory event names
export const EVENT_DEPLOYED_PROXY = "DeployedProxy";
export const EVENT_DEPLOYED_RAW = "DeployedRaw";
export const PROXY = "Proxy";

// Event variable names
export const CONTRACT_ADDR = "contractAddr";

// Hardhat CLI Task names
export const FACTORY_STATE_PATH = `../scripts/generated/factoryState`;
export const LOGIC_ADDR = "LogicAddress";
export const ONLY_PROXY = "onlyProxy";
export const PROXY_ADDR = "ProxyAddress";
export const UPGRADEABLE_DEPLOYMENT: string = "deployUpgradeable";
export const CREATE_AND_REGISTER_DEPLOYMENT: string = "deployCreateAndRegister";

// default paths
// export const env = (): string => {
//   let _env = process.env.DEPLOYMENT_ENVIRONMENT;
//   if (typeof _env === "undefined") {
//     _env = "dev";
//   }
//   return _env;
// };