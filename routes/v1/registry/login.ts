import { Request, Response } from "express"
const login = (req: Request, res: Response) => {
  return res.status(200).json({
    message: "Login Route",
    status: 200,
    data: {}
  })
}
export default login