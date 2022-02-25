import express from "express"
const registryrouter = express.Router()

import login from "./login"
import register from "./register"

registryrouter.get("/login", login)
registryrouter.get("/register", register)

export default registryrouter