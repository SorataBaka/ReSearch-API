import express from "express"
import v1router from "./v1/mainrouter"

const versionRouter = express.Router()
versionRouter.use("/v1", v1router)

export default versionRouter