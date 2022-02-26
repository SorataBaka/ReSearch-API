"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const authorizeRouter = express_1.default.Router();
const redirect_1 = __importDefault(require("./redirect"));
const retrieveuser_1 = __importDefault(require("./retrieveuser"));
authorizeRouter.get("/redirect", redirect_1.default);
authorizeRouter.get("/validate", retrieveuser_1.default);
exports.default = authorizeRouter;
