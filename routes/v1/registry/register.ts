import { Request, Response } from "express"
const register = (req: Request, res: Response) => {
  return res.status(200).json({
    message: "Register route",
    status: 200,
    data: {}
  })
}
export default register