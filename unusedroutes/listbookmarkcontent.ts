// import userData from "../../../schemas/user-data";
// import bookmark from "../../../schemas/bookmark";
// import { Request, Response } from "express";
// import { oauth2Client } from "../../../utils/googleclient";

// const listContent = async (req: Request, res: Response) => {
//   const { access_token } = req.headers
//   const { bookmarkid } = req.query
//   if(!access_token || !bookmarkid) return res.status(400).json({
//     message: "Invalid parameters",
//     status: 400,
//     data: {}
//   })
//   const validatetoken = await oauth2Client.getTokenInfo(access_token as string).catch(err => {return undefined})
//   if(validatetoken === undefined) return res.status(400).json({
//     message: "invalid access_token",
//     status: 400,
//     data: {}
//   })
//   const currentDate = new Date()
//   const tokenExpiry = new Date(validatetoken.expiry_date * 1000)
//   if(currentDate > tokenExpiry) return res.status(400).json({
//     message: "Invalid access_token",
//     status: 400,
//     data: {}
//   })
//   const userid = validatetoken.sub
//   const userQuery = await userData.find({
//     userid
//   }).catch(err => {
//     console.log(err)
//     return undefined
//   })
//   if(!userQuery || userQuery.length == 0){
//     return res.status(404).json({
//       message: "User not found",
//       status: 404,
//       data: {}
//     })
//   }
//   const userBookmarks = userQuery[0].bookmarks
//   const userBookmarkQuery = userBookmarks.filter((bookmark:any) => bookmark.bookmarkid == bookmarkid)
//   if(userBookmarkQuery.length == 0){
//     return res.status(404).json({
//       message: "Bookmark not found",
//       status: 404,
//       data: {}
//     })
//   }
//   const bookmarkQuery = await bookmark.find({bookmarkid: bookmarkid}).catch(err => { return undefined })
//   if(bookmarkQuery === undefined) return res.status(404).json({
//     message: "Internal server error",
//     status: 500,
//     data: {}
//   })
//   return res.status(200).json({
//     message: "Success",
//     status: 200,
//     data: {
//       bookmark: bookmarkQuery[0]
//     }
//   })
// }
// export default listContent