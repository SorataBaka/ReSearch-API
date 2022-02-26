"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const registryrouter_1 = __importDefault(require("./registry/registryrouter"));
const authorizerouter_1 = __importDefault(require("./authorize/authorizerouter"));
const queryrouter_1 = __importDefault(require("./query/queryrouter"));
const bookmarkrouter_1 = __importDefault(require("./bookmarks/bookmarkrouter"));
const router = express_1.default.Router();
router.use("/registry", registryrouter_1.default);
router.use("/authorize", authorizerouter_1.default);
router.use("/query", queryrouter_1.default);
router.use("/bookmark", bookmarkrouter_1.default);
exports.default = router;
