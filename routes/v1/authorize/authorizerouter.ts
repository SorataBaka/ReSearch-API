import express from "express"
const authorizeRouter = express.Router()
import redirectAuth from "./redirect"
import validatetoken from "./retrieveuser"
/**
 * @url /v1/authorize/redirect?code=xxxxx
 * @method GET
 * @description This is the redirect url from google. It will be called after the user has authorized the application.
 * @description After authorizing the code from google, it should redirect to the frontend page
 * @param {string} code - The code from google. This is put as a query string
 * @returns {string} - The url to redirect to
 */
authorizeRouter.get("/redirect", redirectAuth)
/**
 * @url /v1/authorize/retrieveuser
 * @method GET
 * @description This will be the url to retrieve the user info from the access_token
 * @param {string} access_token - The access_token from google. This is put in the headers
 * @returns {object} - The user info
 * 
 */
authorizeRouter.get("/validate", validatetoken)
export default authorizeRouter