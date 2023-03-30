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
exports.ProxyFactory__factory = exports.ProxyFactoryBase__factory = exports.ProxyChild__factory = exports.Proxy__factory = exports.IProxy__factory = exports.Mock3__factory = exports.Mock2__factory = exports.Mock__factory = exports.DeterministicAddress__factory = exports.factories = void 0;
exports.factories = __importStar(require("./factories"));
var DeterministicAddress__factory_1 = require("./factories/DeterministicAddress__factory");
Object.defineProperty(exports, "DeterministicAddress__factory", { enumerable: true, get: function () { return DeterministicAddress__factory_1.DeterministicAddress__factory; } });
var Mock__factory_1 = require("./factories/mocks/MockContract.sol/Mock__factory");
Object.defineProperty(exports, "Mock__factory", { enumerable: true, get: function () { return Mock__factory_1.Mock__factory; } });
var Mock2__factory_1 = require("./factories/mocks/MockContract2.sol/Mock2__factory");
Object.defineProperty(exports, "Mock2__factory", { enumerable: true, get: function () { return Mock2__factory_1.Mock2__factory; } });
var Mock3__factory_1 = require("./factories/mocks/MockContract3.sol/Mock3__factory");
Object.defineProperty(exports, "Mock3__factory", { enumerable: true, get: function () { return Mock3__factory_1.Mock3__factory; } });
var IProxy__factory_1 = require("./factories/proxy/IProxy__factory");
Object.defineProperty(exports, "IProxy__factory", { enumerable: true, get: function () { return IProxy__factory_1.IProxy__factory; } });
var Proxy__factory_1 = require("./factories/proxy/Proxy__factory");
Object.defineProperty(exports, "Proxy__factory", { enumerable: true, get: function () { return Proxy__factory_1.Proxy__factory; } });
var ProxyChild__factory_1 = require("./factories/ProxyChild__factory");
Object.defineProperty(exports, "ProxyChild__factory", { enumerable: true, get: function () { return ProxyChild__factory_1.ProxyChild__factory; } });
var ProxyFactoryBase__factory_1 = require("./factories/ProxyFactoryBase__factory");
Object.defineProperty(exports, "ProxyFactoryBase__factory", { enumerable: true, get: function () { return ProxyFactoryBase__factory_1.ProxyFactoryBase__factory; } });
var ProxyFactory__factory_1 = require("./factories/ProxyFactory__factory");
Object.defineProperty(exports, "ProxyFactory__factory", { enumerable: true, get: function () { return ProxyFactory__factory_1.ProxyFactory__factory; } });
