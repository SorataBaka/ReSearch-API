import { customsearch } from "../../../utils/googleclient"
import { Request, Response } from "express"

const search = async(req: Request, res: Response) => {
  const searchquery = req.query.q as string
  if(!searchquery) return res.status(400).json({
    message:"invalid parameters",
    status: 400,
    data: {}
  })
  const { data } = await customsearch.cse.list({
    q: searchquery,
  })
  return res.status(200).json({
    message:"Success retrieve search result",
    status: 200,
    data: {
      ...data
    }
  })
}

export default search