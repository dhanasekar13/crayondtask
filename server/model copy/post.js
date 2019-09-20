import mongoose from 'mongoose'
const postSchema = new mongoose.Schema({
    description: String,
    likes:Number,
    flag:Number
})

const Post = mongoose.model('Post', postSchema)
export default Post