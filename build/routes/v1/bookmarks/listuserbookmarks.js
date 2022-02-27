"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const user_data_1 = __importDefault(require("../../../schemas/user-data"));
const googleclient_1 = require("../../../utils/googleclient");
const listUserBookmark = async (req, res) => {
    const { access_token } = req.headers;
    if (!access_token)
        return res.status(400).json({
            message: "access_token required",
            status: 400,
            data: {}
        });
    const item = await googleclient_1.oauth2Client.getTokenInfo(access_token).catch(err => { return undefined; });
    if (item === undefined)
        return res.status(400).json({
            message: "Invalid access_token",
            status: 400,
            data: {}
        });
    const currentDate = new Date();
    const tokenExpiry = new Date(item.expiry_date * 1000);
    if (currentDate > tokenExpiry)
        return res.status(400).json({
            message: "Invalid access_token",
            status: 400,
            data: {}
        });
    const userid = item.sub;
    const userQuery = await user_data_1.default.find({
        userid
    }).catch(err => {
        console.log(err);
        return undefined;
    });
    if (!userQuery || userQuery.length == 0) {
        return res.status(404).json({
            message: "User not found",
            status: 404,
            data: {}
        });
    }
    const bookmarks = userQuery[0].bookmarks;
    return res.status(200).json({
        message: "success",
        status: 200,
        data: {
            bookmarks
        }
    });
};
exports.default = listUserBookmark;
