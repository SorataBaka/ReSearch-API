import dotenv from 'dotenv';
import express from "express"
import { Request, Response, NextFunction } from "express"
import bodyParser from "body-parser"
import morgan from "morgan"
import compression from "compression"
import consola from "consola"

import versionrouter from "./routes/versionrouter"
import connectMongoose from "./utils/mongoconnect"

dotenv.config()
const app = express()

app.use(express.json())
app.use(compression())
app.use(bodyParser.json())
app.use(morgan("dev"))

app.use("/", versionrouter)

app.get("/", (req:Request, res:Response, next:NextFunction) => {1
  return res.status(200).json({
    message: "ReSearch Engine API",
    status: 200,
    data: {}
  })
})

const PORT = process.env.PORT || 3000
const URI = process.env.MONGO_URI || undefined
app.listen(PORT, async() => {
  consola.info(`Server is running on port ${PORT}`)
  await connectMongoose(URI as string)
  consola.info("Startup Complete")
})