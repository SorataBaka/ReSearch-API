import userData from "../../../schemas/user-data";
import bookmark from "../../../schemas/bookmark";
import { Request, Response } from "express";
import { oauth2Client } from "../../../utils/googleclient";
import {nanoid} from "nanoid"

const createGroup = async (req: Request, res: Response) => {
  const { access_token } = req.headers
  const { group_name } = req.query
  if(!access_token || !group_name) return res.status(400).json({
    message: "Invalid parameters",
    status: 400,
    data: {}
  })
  const validatetoken = await oauth2Client.getTokenInfo(access_token as string).catch(err => {return undefined})
  if(validatetoken === undefined) return res.status(400).json({
    message: "invalid access_token",
    status: 400,
    data: {}
  })
  const currentDate = new Date()
  const tokenExpiry = new Date(validatetoken.expiry_date * 1000)
  if(currentDate > tokenExpiry) return res.status(400).json({
    message: "Invalid access_token",
    status: 400,
    data: {}
  })
  const userid = validatetoken.sub
  const userQuery = await userData.find({
    userid
  }).catch(err => {
    console.log(err)
    return undefined
  })
  if(!userQuery || userQuery.length == 0){
    return res.status(404).json({
      message: "User not found",
      status: 404,
      data: {}
    })
  }
  let group_id = nanoid(10)
  await bookmark.findOneAndUpdate({
    bookmarkid: group_id
  }, {
    bookmarkid: group_id,
    title: group_name,
    links: []
  }, {
    upsert: true
  }).catch(err => {
    return res.status(500).json({
      message: "Internal server error",
      status: 500,
      data: err
    })
  })
  await userData.findOneAndUpdate({
    userid
  }, {
    $push: {
      bookmarks: {
        bookmarkid: group_id,
      }
    }
  }, {
    upsert: true
  }).catch(err => {
    return res.status(500).json({
      message: "Internal server error",
      status: 500,
      data: err
    })
  })
  return res.status(200).json({
    message: "Group created successfully",
    status: 200,
    data: {
      bookmarkid: group_id,
      title: group_name,
      links: []
    }
  })
}
export default createGroup