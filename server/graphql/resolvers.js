import { createWriteStream } from 'fs'
import {Stream} from 'stream'
import Post  from '../model/post'

export const resolvers = {
    Query:{
        async getallPost() {
            return await Post.find()
        }
    },
    Mutation:{
        async createPost(root, {
            input
        }){
            return await Post.create(input)
        },
        async updatePost(root, {
            _id,
            input
        }) {
            return await Post.findOneAndUpdate({_id},input,{new:true})
        },
        async uploadFile(root,{file})  {
            let {stream, filename} = await file
           return new Promise((resolve,reject)=> {
               Stream.pipe(createWriteStream('./public/images/'+filename))
               .on('finish',()=>{
                   resolve() 
                    return true})
               .on('error',()=>{
                reject()
                return false
               } )
           })
        }
    }

}