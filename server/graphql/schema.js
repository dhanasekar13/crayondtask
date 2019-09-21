import { makeExecutableSchema} from 'graphql-tools'
import { resolvers } from './resolvers'

const typeDefs = `
scalar Upload
type Post {
    _id:ID!
    description: String
    likes:Int
    imagurl:String
    flag:Int
}
type Query {
    getallPost:[Post]
}
input PostInput {
    description: String
    likes:Int
    imagurl:String
    flag:Int
}

type Mutation {
    createPost(input:PostInput):Post
    updatePost(_id:ID,input:PostInput):Post
    uploadFile(file:Upload!): String
    increaseCount(_id:ID):Post
}
`

const schema = makeExecutableSchema({
    typeDefs,
    resolvers
})

export default schema