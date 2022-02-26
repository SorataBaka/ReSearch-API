import express from "express"
const router = express.Router()

import search from "./search"
router.get("/search", search)
export default router