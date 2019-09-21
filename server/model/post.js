import mongoose from 'mongoose'
const postSchema = new mongoose.Schema({
    description: String,
    likes:Number,
    imagurl:String,
    flag:Number
})

const Post = mongoose.model('Post', postSchema)
export default Post