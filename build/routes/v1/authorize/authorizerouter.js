"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const authorizeRouter = express_1.default.Router();
const redirect_1 = __importDefault(require("./redirect"));
const retrieveuser_1 = __importDefault(require("./retrieveuser"));
/**
 * @url /v1/authorize/redirect?code=xxxxx
 * @method GET
 * @description This is the redirect url from google. It will be called after the user has authorized the application.
 * @description After authorizing the code from google, it should redirect to the frontend page
 * @param {string} code - The code from google. This is put as a query string
 * @returns {string} - The url to redirect to
 */
authorizeRouter.get("/redirect", redirect_1.default);
/**
 * @url /v1/authorize/retrieveuser
 * @method GET
 * @description This will be the url to retrieve the user info from the access_token
 * @param {string} access_token - The access_token from google. This is put in the headers
 * @returns {object} - The user info
 *
 */
authorizeRouter.get("/retrieveuser", retrieveuser_1.default);
exports.default = authorizeRouter;
