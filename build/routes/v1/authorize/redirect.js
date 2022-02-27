"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const googleclient_1 = require("../../../utils/googleclient");
const user_data_1 = __importDefault(require("../../../schemas/user-data"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const htmlredirect = process.env.HTML_REDIRECT || undefined;
const redirect = async (req, res) => {
    const authorizationtoken = req.query.code;
    if (!authorizationtoken)
        return res.status(400).json({
            message: "Authorization token is required",
            status: 400,
            data: {}
        });
    const { tokens } = await googleclient_1.oauth2Client.getToken(authorizationtoken);
    const { id_token, access_token } = tokens;
    const ticket = await googleclient_1.oauth2Client.verifyIdToken({
        idToken: id_token
    }).catch(err => {
        return undefined;
    });
    if (!ticket)
        throw new Error("Invalid id_token");
    const item = ticket.getPayload();
    const userid = item?.sub;
    const email = item?.email;
    const name = item?.name;
    const userquery = await user_data_1.default.find({
        userid,
        email
    }).catch((err) => {
        console.log(err);
        return undefined;
    });
    if (!userquery || userquery.length == 0) {
        await user_data_1.default.findOneAndUpdate({
            userid,
            email,
            name
        }, {
            userid,
            email,
            name,
            bookmarks: []
        }, {
            upsert: true
        }).catch((err) => {
            return res.status(500).json({
                message: "Internal server error",
                status: 500,
                data: {}
            });
        });
    }
    // return res.status(200).json({
    //   message: "Success retrieve info from id_token",
    //   status: 200,
    //   data: {
    //     id_token,
    //     access_token,
    //   }
    // })
    return res.redirect(htmlredirect + `?access_token=${access_token}`);
};
exports.default = redirect;
