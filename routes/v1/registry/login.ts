import { Request, Response } from "express"
import { oauth2Client } from "../../../utils/googleclient"
const login = (req: Request, res: Response) => {
  const url = oauth2Client.generateAuthUrl({
    access_type: "online",
    scope: [
      "email",
      "profile",
      "openid"
    ]
  })
  return res.status(200).json({
    message: "login url",
    status: 200,
    data: {
      url
    }
  })
}
export default login