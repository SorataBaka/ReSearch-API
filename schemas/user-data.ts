import mongoose from "mongoose";
const userSchema = new mongoose.Schema({
	name: {
		type: String,
		required: true,
	},
	email: {
		type: String,
		required: true,
		unique: true,
	},
	userid: {
		type: String,
		required: true,
		unique: true,
	},
	bookmarks: [
		{
			bookmarkid: {
				type: String,
				required: true,
			},
			bookmarkname: {
				type: String,
				required: true,
			},
			bookmarkdescription: {
				type: String,
				required: true,
			},
			bookmarkurl: {
				type: String,
				required: true,
			},
		},
	],
});
export default mongoose.model("user-data", userSchema);
