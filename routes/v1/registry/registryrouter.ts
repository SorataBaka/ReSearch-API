import express from "express"
const registryrouter = express.Router()

import login from "./login"


/**
 * @url /v1/registry/login
 * @method GET
 * @description This will retrieve a google login url
 * @returns {string} - The url to redirect to google login
 */
registryrouter.get("/login", login)

export default registryrouter