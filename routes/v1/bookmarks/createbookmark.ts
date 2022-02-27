import userData from "../../../schemas/user-data";
import bookmark from "../../../schemas/bookmark";
import { Request, Response } from "express";
import { oauth2Client } from "../../../utils/googleclient";
import { nanoid } from "nanoid"
const createBookmark = async (req: Request, res: Response) => {
  const { groupid } = req.query;
  const { access_token } = req.headers;
  const { name, url } = req.body;
  if(!access_token || !groupid || !name || !url) return res.send(404).json({
    message: "invalid parameters",
    status: 404,
    data: {}
  })
  const item = await oauth2Client.getTokenInfo(access_token as string).catch(err => {return undefined})
  if(item === undefined )return res.status(400).json({
    message: "Invalid access_token",
    status: 400,
    data: {}
  })
  const currentDate = new Date()
  const tokenExpiry = new Date(item.expiry_date * 1000)
  if(currentDate > tokenExpiry) return res.status(400).json({
    message: "Invalid access_token",
    status: 400,
    data: {}
  })
  const userid = item.sub
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
  const bookmarks = userQuery[0].bookmarks
  const isValid = await bookmarks.filter((bookmark:any) => {
    return bookmark.bookmarkid === groupid
  })
  if(isValid.length == 0){
    return res.status(404).json({
      message: "Bookmark not found",
      status: 404,
      data: {}
    })
  }
  const bookmarkQuery = await bookmark.find({
    bookmarkid: groupid
  }).catch(err => {
    console.log(err)
    return undefined
  })
  if(!bookmarkQuery || bookmarkQuery.length == 0){
    return res.status(404).json({
      message: "Bookmark not found",
      status: 404,
      data: {}
    })
  }
  await bookmark.findOneAndUpdate({
    bookmarkid: groupid
  }, {
    bookmarkid: groupid,
    $push: {
      links: {
        name: name,
        url: url,
        contentid: nanoid(10)
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
  const bookmarkquery = await bookmark.find({bookmarkid: groupid})
  return res.status(200).json({
    message: "Bookmark created successfully",
    status: 200,
    data: {
      bookmark: bookmarkquery[0]
    }
  })
}
export default createBookmark