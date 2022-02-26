"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const googleclient_1 = require("../../../utils/googleclient");
const login = (req, res) => {
    const url = googleclient_1.oauth2Client.generateAuthUrl({
        access_type: "online",
        scope: [
            "email",
            "profile",
            "openid"
        ]
    });
    return res.status(200).json({
        message: "login url",
        status: 200,
        data: {
            url
        }
    });
};
exports.default = login;
