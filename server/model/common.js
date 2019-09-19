import mongoose from 'mongoose'
import Post from './post'

const connectDB = () => {
    return mongoose.connect('mongodb://localhost:27017/crayond')

}

const models = {
    Post
}
export default connectDB 
export {
    models
}