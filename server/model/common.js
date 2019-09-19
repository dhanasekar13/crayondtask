import mongoose from 'mongoose'
import Post from './post'

const connectDB = () => {
    return mongoose.connect(global.config.db)
}

const models = {
    Post
}
export default connectDB 
export {
    models
}