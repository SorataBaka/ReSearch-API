import { customsearch } from "../../../utils/googleclient"
import { Request, Response } from "express"
const cx = process.env.CX || undefined
if(!cx) throw new Error("CX is required")
const search = async(req: Request, res: Response) => {
  const searchquery = req.query.q as string
  if(!searchquery) return res.status(400).json({
    message:"invalid parameters",
    status: 400,
    data: {}
  })
  const searchdata = await customsearch.cse.list({
    q: searchquery,
    cx: cx,
  }).catch()
  if(!searchdata.data) return res.status(500).json({
    message:"internal server error",
    status: 500,
    data: {}
  })
  let responsearray = []
  if(searchdata.data.items){
    for(const item of searchdata.data.items){
      responsearray.push({
        title: item.title,
        link: item.link,
        displaylink: item.displayLink,
        snippet: item.snippet,
        image: item.image?.thumbnailLink,
        context: item.image?.contextLink
      })
    }
  }
  return res.status(200).json({
    message:"Success retrieve search result",
    status: 200,
    data: {
      items: responsearray
    }
  })
}

export default search