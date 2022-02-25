import dotenv from 'dotenv';
import express from "express"
import { Request, Response } from "express"
import bodyParser from "body-parser"
import morgan from "morgan"
import compression from "compression"

import versionrouter from "./routes/versionrouter"

dotenv.config()
const app = express()

app.use(express.json())
app.use(compression())
app.use(bodyParser.json())
app.use(morgan("dev"))

app.use("/", versionrouter)

app.get("/", (req:Request, res:Response) => {
  return res.status(200).json({
    message: "ReSearch Engine API",
    status: 200,
    data: {}
  })
})

const PORT = process.env.PORT || 3000
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`)
})