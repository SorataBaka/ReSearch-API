import express from "express"
const registryrouter = express.Router()

import login from "./login"

registryrouter.get("/login", login)

export default registryrouter