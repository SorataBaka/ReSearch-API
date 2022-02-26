import mongoose from "mongoose"
const bookmarkSchema = new mongoose.Schema({
  bookmarkid: {
    type: String,
    required: true
  },
  title: {
    type: String,
    required: true
  },
  links: [
    {
      name: {
        type: String,
        required: true
      },
      url: {
        type: String,
        required: true
      }
    }
  ]
})
export default mongoose.model("bookmark", bookmarkSchema)