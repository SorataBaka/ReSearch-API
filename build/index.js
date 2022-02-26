"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const morgan_1 = __importDefault(require("morgan"));
const compression_1 = __importDefault(require("compression"));
const versionrouter_1 = __importDefault(require("./routes/versionrouter"));
const mongoconnect_1 = __importDefault(require("./utils/mongoconnect"));
dotenv_1.default.config();
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use((0, compression_1.default)());
app.use(body_parser_1.default.json());
app.use((0, morgan_1.default)("dev"));
app.use("/", versionrouter_1.default);
app.get("/", (req, res) => {
    1;
    return res.status(200).json({
        message: "ReSearch Engine API",
        status: 200,
        data: {}
    });
});
const PORT = process.env.PORT || 3000;
const URI = process.env.MONGO_URI || undefined;
app.listen(PORT, async () => {
    console.log(`Server is running on port ${PORT}`);
    await (0, mongoconnect_1.default)(URI);
    console.log("Startup Complete");
});
