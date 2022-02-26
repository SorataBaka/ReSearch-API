import express from "express"
const bookmarkrouter = express.Router()

import listbookmarks from "./listuserbookmarks"
import listbookmarkcontent from "./listbookmarkcontent"
import createbookmark from "./createbookmark"
import deletebookmark from "./deletebookmark"
import createGroup from "./creategroup"
import deleteGroup from "./deletegroup"

bookmarkrouter.get("/" , listbookmarks)
bookmarkrouter.get("/:bookmarkgroupid/:bookmarkid", listbookmarkcontent)
bookmarkrouter.post("/", createbookmark)
bookmarkrouter.delete("/:bookmarkgroupid/:bookmarkid", deletebookmark)

bookmarkrouter.post("/creategroup", createGroup)
bookmarkrouter.delete("/deletegroup", deleteGroup)

export default bookmarkrouter

