"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const user_data_1 = __importDefault(require("../../../schemas/user-data"));
const bookmark_1 = __importDefault(require("../../../schemas/bookmark"));
const googleclient_1 = require("../../../utils/googleclient");
const createBookmark = async (req, res) => {
    const { groupid } = req.query;
    const { access_token } = req.headers;
    const { name, url } = req.body;
    if (!access_token || !groupid || !name || !url)
        return res.send(404).json({
            message: "invalid parameters",
            status: 404,
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
    console.log(bookmarks);
    const isValid = await bookmarks.filter((bookmark) => {
        console.log(bookmark.bookmarkid, groupid);
        return bookmark.bookmarkid === groupid;
    });
    if (isValid.length == 0) {
        return res.status(404).json({
            message: "Bookmark not found",
            status: 404,
            data: {}
        });
    }
    const bookmarkQuery = await bookmark_1.default.find({
        bookmarkid: groupid
    }).catch(err => {
        console.log(err);
        return undefined;
    });
    if (!bookmarkQuery || bookmarkQuery.length == 0) {
        return res.status(404).json({
            message: "Bookmark not found",
            status: 404,
            data: {}
        });
    }
    await bookmark_1.default.findOneAndUpdate({
        bookmarkid: groupid
    }, {
        bookmarkid: groupid,
        $push: {
            links: {
                name: name,
                url: url
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
    const bookmarkquery = await bookmark_1.default.find({ bookmarkid: groupid });
    return res.status(200).json({
        message: "Bookmark created successfully",
        status: 200,
        data: {
            ...bookmarkquery[0]
        }
    });
};
exports.default = createBookmark;
