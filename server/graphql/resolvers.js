import { createWriteStream } from 'fs'
import {Stream} from 'stream'
import Post  from '../model/post'


const storeUpload = ({ stream, filename }) =>
  new Promise((resolve, reject) =>
    stream
   .pipe(createWriteStream('./public/images/'+filename))
      .on("finish", () =>{
          console.log('finished') 
          resolve("/images/"+filename+"")})
      .on("error",()=>{
          console.log('--------eroor')
        reject("")
      } )
  );

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
            console.log('-----------creatpost', input)
            return await Post.create(input)
        },
        async updatePost(root, {
            _id,
            input
        }) {
            return await Post.findOneAndUpdate({_id},input,{new:true})
        },
        async uploadFile(root,{file})  {
                const { stream, filename } = await file[0];
                
                return await storeUpload({ stream, filename });
        },
        async increaseCount(root,{_id}) {
            console.log('9999999999999999999the increccount')
            return await Post.findOneAndUpdate({_id},{$inc: {likes:1}})
        }
    }

}