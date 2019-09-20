import Product from '../model/product'

export const resolvers = {
     Query:{
         async allProducts () {
             return await Product.find()
         },
         async getProduct(root, {_id}){
             return await Product.findById({_id})
         }
     },
     Mutation:{
         async createProduct(root, {
             input
         }) {
             return await Product.create(input)
         },
         async updateProduct(root, {
             _id,
             input
         }) {
             return await Product.findOneAndUpdate({_id},input,{new:true})
         }
     }
}