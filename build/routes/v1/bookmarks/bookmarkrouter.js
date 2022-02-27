"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const bookmarkrouter = express_1.default.Router();
const listuserbookmarks_1 = __importDefault(require("./listuserbookmarks"));
const listbookmarkcontent_1 = __importDefault(require("./listbookmarkcontent"));
const createbookmark_1 = __importDefault(require("./createbookmark"));
const deletebookmark_1 = __importDefault(require("./deletebookmark"));
const creategroup_1 = __importDefault(require("./creategroup"));
const deletegroup_1 = __importDefault(require("./deletegroup"));
/**
 * @url /v1/bookmarks/
 * @method GET
 *
 */
bookmarkrouter.get("/", listuserbookmarks_1.default);
/**
 * @url /v1/bookmarks/
 * @method GET
 *
 */
bookmarkrouter.get("/:bookmarkgroupid/:bookmarkid", listbookmarkcontent_1.default);
/**
 * @url /v1/bookmarks/createbookmark
 * @method POST
 * @description This will create a bookmark
 * @param {string} groupid - ID of the bookmark group. This is put as a query string
 * @param {string} access_token - The access_token from google. This is put in the headers
 * @param {string} name - The name of the bookmark. This is put in the body
 * @param {string} url - The url of the bookmark. This is put in the body
 * @returns {object} - The bookmark info
 */
bookmarkrouter.post("/createbookmark", createbookmark_1.default);
/**
 * @url /v1/bookmarks/
 * @method DELETE
 *
 */
bookmarkrouter.delete("/deletebookmark", deletebookmark_1.default);
/**
 * @url /v1/bookmarks/creategroup
 * @method POST
 * @description This will create a bookmark group
 * @param {string} access_token - The access_token from google. This is put in the headers
 * @param {string} group_name - The name of the bookmark group. This is put as a query string
 * @returns {object} - The bookmark group info
 *
 */
bookmarkrouter.post("/creategroup", creategroup_1.default);
/**
 * @url /v1/bookmarks/deletegroup
 * @method DELETE
 * @description This will delete a bookmark group
 * @param {string} access_token - The access_token from google. This is put in the headers
 * @param {string} groupid - ID of the bookmark group. This is put as a query string
 * @returns {object} - The bookmark group info
 */
bookmarkrouter.delete("/deletegroup", deletegroup_1.default);
exports.default = bookmarkrouter;
