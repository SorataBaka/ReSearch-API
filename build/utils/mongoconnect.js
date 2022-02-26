"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const connectToMongoose = async (TOKEN) => {
    if (!TOKEN)
        throw new Error("TOKEN is required");
    const connectMongoose = await mongoose_1.default.connect(TOKEN);
    if (!connectMongoose)
        throw new Error("Mongoose connection error");
    console.log("Mongoose connected");
    return connectMongoose;
};
exports.default = connectToMongoose;
