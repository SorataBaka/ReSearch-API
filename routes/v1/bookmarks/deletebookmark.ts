import userData from "../../../schemas/user-data";
import bookmark from "../../../schemas/bookmark";
import { Request, Response } from "express";
import { oauth2Client } from "../../../utils/googleclient";

const deleteBookmark = async (req: Request, res: Response) => {
  const { access_token } = req.headers
  const { bookmarkid, contentid } = req.query
  if(!access_token || !bookmarkid || !contentid) return res.status(400).json({
    message: "invalid parameters",
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

  await bookmark.findOneAndUpdate({
    bookmarkid: bookmarkid,
  }, {
    $pull: {
      links: {
        contentid: contentid
      }
    }
  }, {
    upsert: true
  }).catch((err) => {
    return res.status(500).json({
      message: "Internal server error",
      status: 500,
      data: err
    })
  })
  const bookmarkquery = await bookmark.find({bookmarkid: bookmarkid}).catch(err => {
    return undefined
  })
  return res.status(200).json({
    message: "Bookmark deleted successfully",
    status: 200,
    data: {
      currentBookmark: bookmarkquery,
      contentid: contentid,
      bookmarkid: bookmarkid
    }
  })
}
export default deleteBookmark