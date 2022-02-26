import { Request, Response } from 'express';
import { oauth2Client } from '../../../utils/googleclient';
const redirect = async(req:Request, res:Response) => {
  const authorizationtoken = req.query.code as string
  if(!authorizationtoken) return res.status(400).json({
    message:"Authorization token is required",
    status: 400,
    data: {}
  })
  const { tokens } = await oauth2Client.getToken(authorizationtoken)
  return res.status(200).json({
    message:"Authorization token is valid",
    status: 200,
    data: {
      token: tokens
    }
  })

}
export default redirect