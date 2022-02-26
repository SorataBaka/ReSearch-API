"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const register = (req, res) => {
    return res.status(200).json({
        message: "Register route",
        status: 200,
        data: {}
    });
};
exports.default = register;
