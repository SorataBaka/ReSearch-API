"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
const search_1 = __importDefault(require("./search"));
/**
 * @url /v1/query/search
 * @method GET
 * @description This will search for a query
 * @param {string} q - The query to search for. This is put as a query string
 * @param {number} index - The index to start searching from. This is put as a query string
 *
 */
router.get("/search", search_1.default);
exports.default = router;
