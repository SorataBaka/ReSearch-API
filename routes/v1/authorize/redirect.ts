import { Request, Response } from 'express';
import { oauth2Client } from '../../../utils/googleclient';
import userData from "../../../schemas/user-data"
import dotenv from "dotenv"
dotenv.config()
const htmlredirect = process.env.HTML_REDIRECT || undefined
const redirect = async(req:Request, res:Response) => {
  const authorizationtoken = req.query.code as string
  if(!authorizationtoken) return res.status(400).json({
    message:"Authorization token is required",
    status: 400,
    data: {}
  })
  const { tokens } = await oauth2Client.getToken(authorizationtoken)
  const { id_token, access_token } = tokens
  const ticket = await oauth2Client.verifyIdToken({
    idToken: id_token as string
  }).catch(err => {
    return undefined
  })
  if(!ticket) throw new Error("Invalid id_token")
  const item = ticket.getPayload()

  const userid = item?.sub
  const email = item?.email
  const name = item?.name
  const userquery = await userData.find({
    userid,
    email
  }).catch((err) => {
    console.log(err)
    return undefined
  })
  if(!userquery || userquery.length == 0){
    await userData.findOneAndUpdate({
      userid,
      email,
      name
    }, {
      userid,
      email,
      name,
      bookmarks: []
    }, {
      upsert: true
    }).catch((err) => {
      return res.status(500).json({
        message: "Internal server error",
        status: 500,
        data: {}
      })
    })
  }
  // return res.status(200).json({
  //   message: "Success retrieve info from id_token",
  //   status: 200,
  //   data: {
  //     id_token,
  //     access_token,
  //   }
  // })
  return res.redirect(htmlredirect + `?access_token=${access_token}`)
}
export default redirect