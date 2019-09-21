import mongoose from 'mongoose'
const postSchema = new mongoose.Schema({
    description: String,
    likes:{
        type:Number,
        default:0
    },
    imagurl:String,
    flag:Number
})

const Post = mongoose.model('Post', postSchema)
export default Post