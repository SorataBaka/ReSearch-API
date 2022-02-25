import dotenv from 'dotenv';
import express from "express"
import { Request, Response } from "express"
dotenv.config()
const app = express()

app.use(express.json())
app.get("/", (req:Request, res:Response) => {
  return res.status(200).json({
    message: "Hello World"
  })
})

const PORT = process.env.PORT || 3000
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`)
})