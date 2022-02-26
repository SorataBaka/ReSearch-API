"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const user_data_1 = __importDefault(require("../../../schemas/user-data"));
const bookmark_1 = __importDefault(require("../../../schemas/bookmark"));
const googleclient_1 = require("../../../utils/googleclient");
const nanoid_1 = require("nanoid");
const createGroup = async (req, res) => {
    const { access_token } = req.headers;
    const { group_name } = req.query;
    if (!access_token || !group_name)
        return res.status(400).json({
            message: "Invalid parameters",
            status: 400,
            data: {}
        });
    const validatetoken = await googleclient_1.oauth2Client.getTokenInfo(access_token).catch(err => { return undefined; });
    if (validatetoken === undefined)
        return res.status(400).json({
            message: "invalid access_token",
            status: 400,
            data: {}
        });
    const currentDate = new Date();
    const tokenExpiry = new Date(validatetoken.expiry_date * 1000);
    if (currentDate > tokenExpiry)
        return res.status(400).json({
            message: "Invalid access_token",
            status: 400,
            data: {}
        });
    const userid = validatetoken.sub;
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
    let group_id = (0, nanoid_1.nanoid)(10);
    await bookmark_1.default.findOneAndUpdate({
        bookmarkid: group_id
    }, {
        bookmarkid: group_id,
        title: group_name,
        links: []
    }, {
        upsert: true
    }).catch(err => {
        return res.status(500).json({
            message: "Internal server error",
            status: 500,
            data: err
        });
    });
    await user_data_1.default.findOneAndUpdate({
        userid
    }, {
        $push: {
            bookmarks: {
                bookmarkid: group_id,
            }
        }
    }, {
        upsert: true
    }).catch(err => {
        return res.status(500).json({
            message: "Internal server error",
            status: 500,
            data: err
        });
    });
    return res.status(200).json({
        message: "Group created successfully",
        status: 200,
        data: {
            bookmarkid: group_id,
            title: group_name,
            links: []
        }
    });
};
exports.default = createGroup;
