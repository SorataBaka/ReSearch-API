"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const deleteBookmark = async (req, res) => {
    return res.status(200).json({
        message: "Bookmark deleted successfully",
        status: 200,
        data: {}
    });
};
exports.default = deleteBookmark;
