const local = {
    url:'http://localhost:1111',
    description: 'local configuration details',
    db:'mongodb://localhost:27017/crayond'
}
const production = {
    url :'http://anydomain.com',
    description: 'production configuration details'
}

export default local
module.export = local
