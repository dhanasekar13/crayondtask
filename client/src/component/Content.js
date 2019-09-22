import React from 'react'
import { useQuery } from '@apollo/react-hooks'
import { useMutation } from '@apollo/react-hooks';

import gql from 'graphql-tag'
const FETCH_POST = gql`
    {
        getallPost{
            _id
            description
            flag
            likes
            imagurl
          }
    }
`
const ADD_POST = gql`
    mutation a($id:ID){
        increaseCount(_id:$id){
            description
            likes
          }
    }
`
const style1 = {
    width: "18rem"
}
function Content() {
    const { loading, error, data } = useQuery(FETCH_POST)
    const [inclikes, {likes}] = useMutation(ADD_POST)
    const valueinc =async  (event) =>{
        console.log(event.target.value,'------------target value')
        let value = await inclikes({variables:{ id: event.target.value}})
        console.log(value,'---------the value changes')
    }
    if( loading ) return <p>Loading ........</p>
    if( error ) return <p>Error found in query</p>
    
    return ( <div>{
                    data.getallPost.map(({_id,description,flag,likes,imagurl}) => (
                        <div key={_id}>
                                    <div className="card" style={style1}>
                                        <img className="card-img-top" src={"http://localhost:1111"+imagurl} alt="Card image cap"/>
                                        <div className="card-body">
                                            <h5 className="card-title">Card title</h5>
                                            <p className="card-text"> {description} .</p>
                                            <button href="#" className="btn btn-primary" value={_id} onClick={valueinc}>Likes - count - {likes}</button>
                                        </div>
                                    </div>
                        </div>
                    ))  
    }
    </div>
                  )
    
}

export default Content