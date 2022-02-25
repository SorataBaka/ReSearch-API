import express from "express"
import registryrouter from "./registry/registryrouter"


const router = express.Router()
router.use("/registry", registryrouter)

export default router