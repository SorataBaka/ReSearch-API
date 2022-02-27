"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const user_data_1 = __importDefault(require("../../../schemas/user-data"));
const bookmark_1 = __importDefault(require("../../../schemas/bookmark"));
const googleclient_1 = require("../../../utils/googleclient");
const listContent = async (req, res) => {
    const { access_token } = req.headers;
    const { bookmarkid } = req.query;
    if (!access_token || !bookmarkid)
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
    const userBookmarks = userQuery[0].bookmarks;
    const userBookmarkQuery = userBookmarks.filter((bookmark) => bookmark.bookmarkid == bookmarkid);
    if (userBookmarkQuery.length == 0) {
        return res.status(404).json({
            message: "Bookmark not found",
            status: 404,
            data: {}
        });
    }
    const bookmarkQuery = await bookmark_1.default.find({ bookmarkid: bookmarkid }).catch(err => { return undefined; });
    if (bookmarkQuery === undefined)
        return res.status(404).json({
            message: "Internal server error",
            status: 500,
            data: {}
        });
    return res.status(200).json({
        message: "Success",
        status: 200,
        data: {
            bookmark: bookmarkQuery[0]
        }
    });
};
exports.default = listContent;
