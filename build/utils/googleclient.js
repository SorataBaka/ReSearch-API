"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.oauth2Client = exports.customsearch = void 0;
const googleapis_1 = require("googleapis");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const clientid = process.env.CLIENT_ID || undefined;
const clientsecret = process.env.CLIENT_SECRET || undefined;
const redirecturl = process.env.REDIRECT_URI || undefined;
const apikey = process.env.API_KEY || undefined;
if (!clientid)
    throw new Error("CLIENT_ID is required");
if (!clientsecret)
    throw new Error("CLIENT_SECRET is required");
if (!redirecturl)
    throw new Error("REDIRECT_URI is required");
if (!apikey)
    throw new Error("API_KEY is required");
const oauth2Client = new googleapis_1.google.auth.OAuth2(clientid, clientsecret, redirecturl);
exports.oauth2Client = oauth2Client;
const customsearch = googleapis_1.google.customsearch({
    version: 'v1',
    auth: apikey,
});
exports.customsearch = customsearch;
