import express from "express"
const authorizeRouter = express.Router()

import redirectAuth from "./redirect"
import validatetoken from "./validate"
authorizeRouter.get("/redirect", redirectAuth)
authorizeRouter.get("/validate", validatetoken)
export default authorizeRouter