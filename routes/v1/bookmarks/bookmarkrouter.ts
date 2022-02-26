import express from "express"
const bookmarkrouter = express.Router()

import listbookmarks from "./listuserbookmarks"
import listbookmarkcontent from "./listbookmarkcontent"
import createbookmark from "./createbookmark"
import deletebookmark from "./deletebookmark"

bookmarkrouter.get("/" , listbookmarks)
bookmarkrouter.get("/:bookmarkid", listbookmarkcontent)
bookmarkrouter.post("/", createbookmark)
bookmarkrouter.delete("/:bookmarkid", deletebookmark)

export default bookmarkrouter

