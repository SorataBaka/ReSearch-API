import express from "express"
import registryrouter from "./registry/registryrouter"
import authorizationRouter from "./authorize/authorizerouter"
import queryRouter from "./query/queryrouter"
const router = express.Router()
router.use("/registry", registryrouter)
router.use("/authorize", authorizationRouter)
router.use("/query", queryRouter)
export default router