"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const bookmarkSchema = new mongoose_1.default.Schema({
    bookmarkid: {
        type: String,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    links: [
        {
            name: {
                type: String,
                required: true
            },
            url: {
                type: String,
                required: true
            }
        }
    ]
});
exports.default = mongoose_1.default.model("bookmark", bookmarkSchema);
