"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const googleclient_1 = require("../../../utils/googleclient");
const cx = process.env.CX || undefined;
if (!cx)
    throw new Error("CX is required");
const search = async (req, res) => {
    const searchquery = req.query.q;
    const startingIndex = req.query.index || 0;
    if (!searchquery)
        return res.status(400).json({
            message: "invalid parameters",
            status: 400,
            data: {}
        });
    const searchdata = await googleclient_1.customsearch.cse.list({
        q: searchquery,
        cx: cx,
        start: startingIndex,
        num: 20,
        exactTerms: "beginners",
    }).catch();
    if (!searchdata.data)
        return res.status(500).json({
            message: "internal server error",
            status: 500,
            data: {}
        });
    let responsearray = [];
    if (searchdata.data.items) {
        for (const item of searchdata.data.items) {
            responsearray.push({
                title: item.title,
                link: item.link,
                displaylink: item.displayLink,
                snippet: item.snippet,
                image: item.image?.thumbnailLink,
                context: item.image?.contextLink
            });
        }
    }
    return res.status(200).json({
        message: "Success retrieve search result",
        status: 200,
        data: {
            items: responsearray
        }
    });
};
exports.default = search;
