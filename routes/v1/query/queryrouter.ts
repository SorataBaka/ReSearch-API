import express from "express"
const router = express.Router()

import search from "./search"
/**
 * @url /v1/query/search
 * @method GET
 * @description This will search for a query
 * @param {string} q - The query to search for. This is put as a query string
 * @param {number} index - The index to start searching from. This is put as a query string
 * 
 */
router.get("/search", search)
export default router