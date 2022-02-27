"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const registryrouter = express_1.default.Router();
const login_1 = __importDefault(require("./login"));
/**
 * @url /v1/registry/login
 * @method GET
 * @description This will retrieve a google login url
 * @returns {string} - The url to redirect to google login
 */
registryrouter.get("/login", login_1.default);
exports.default = registryrouter;
