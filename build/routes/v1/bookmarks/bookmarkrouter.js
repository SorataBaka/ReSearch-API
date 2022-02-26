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
bookmarkrouter.get("/", listuserbookmarks_1.default);
bookmarkrouter.get("/:bookmarkgroupid/:bookmarkid", listbookmarkcontent_1.default);
bookmarkrouter.post("/", createbookmark_1.default);
bookmarkrouter.delete("/:bookmarkgroupid/:bookmarkid", deletebookmark_1.default);
bookmarkrouter.post("/creategroup", creategroup_1.default);
bookmarkrouter.delete("/deletegroup", deletegroup_1.default);
exports.default = bookmarkrouter;
