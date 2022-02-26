"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const mainrouter_1 = __importDefault(require("./v1/mainrouter"));
const versionRouter = express_1.default.Router();
versionRouter.use("/v1", mainrouter_1.default);
exports.default = versionRouter;
