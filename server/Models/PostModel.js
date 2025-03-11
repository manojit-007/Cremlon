const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const PostSchema = new Schema({
   name: { type: String, required: true },
//    description: { type: String, required: true },
   comment: { type: String, required: true },
   image: {
     public_id: {
       type: String,
     },
     url: {
       type: String,
     },
   },
 });

const Post = mongoose.model("Post", PostSchema);

module.exports = Post;

