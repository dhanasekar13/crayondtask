import React from 'react'
import { useQuery } from '@apollo/react-hooks'
import { useMutation } from '@apollo/react-hooks';

import { gql } from 'apollo-boost'

const FETCH_POST = gql`
    {
        getallPost{
            _id
            description
            flag
            likes
          }
    }
`
const ADD_POST = gql`
    mutation($id:String!){
        increaseCount(_id:$id){
            description
            likes
          }
    }
`

function Content() {
    const { loading, error, data } = useQuery(FETCH_POST)
    const [inclikes, {likes}] = useMutation(ADD_POST)
    const valueinc = (event) =>{
        console.log(event.target.value,'------------target value')
        inclikes({variables:{ id: event.target.value}})
    }
    if( loading ) return <p>Loading ........</p>
    if( error ) return <p>Error found in query</p>
    
    return ( <div>{ 
                    data.getallPost.map(({_id,description,flag,likes}) => (
                        <div key={_id}>
                                {description}  - count -
                                <button value={_id} onClick={valueinc}>{likes}</button>
                        </div>
                    ))  
                  }
            </div>)
    
}

export default Content