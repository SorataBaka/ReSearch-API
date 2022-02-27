"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const user_data_1 = __importDefault(require("../../../schemas/user-data"));
const googleclient_1 = require("../../../utils/googleclient");
const deletebookmark = async (req, res) => {
    const { access_token } = req.headers;
    const { bookmarkid } = req.query;
    if (!access_token || !bookmarkid)
        return res.status(400).json({
            message: "invalid parameters",
            status: 400,
            data: {},
        });
    const item = await googleclient_1.oauth2Client
        .getTokenInfo(access_token)
        .catch((err) => {
        return undefined;
    });
    if (item === undefined)
        return res.status(400).json({
            message: "Invalid access_token",
            status: 400,
            data: {},
        });
    const currentDate = new Date();
    const tokenExpiry = new Date(item.expiry_date * 1000);
    if (currentDate > tokenExpiry)
        return res.status(400).json({
            message: "Invalid access_token",
            status: 400,
            data: {},
        });
    const userid = item.sub;
    await user_data_1.default
        .findOneAndUpdate({
        userid: userid,
    }, {
        userid: userid,
        $pull: {
            bookmarks: {
                bookmarkid: bookmarkid,
            },
        },
    }, {
        upsert: true,
    })
        .catch((err) => {
        return res.status(500).json({
            message: "Internal server error",
            status: 500,
            data: err,
        });
    });
    const userQuery = await user_data_1.default.find({ userid: userid }).catch((err) => {
        return undefined;
    });
    if (userQuery === undefined)
        return res.status(500).json({
            message: "Internal server error",
            status: 500,
            data: {},
        });
    return res.status(200).json({
        message: "success",
        status: 200,
        data: {
            userData: userQuery[0],
        },
    });
};
exports.default = deletebookmark;
