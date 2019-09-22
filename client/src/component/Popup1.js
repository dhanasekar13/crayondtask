import React, {useEffect, useState} from 'react'

import { useMutation } from '@apollo/react-hooks';
import gql from 'graphql-tag';
import Dropzone from 'react-dropzone';

const uploadFileMutation = gql`
  mutation($file: Upload!) {
    uploadFile(file: $file)
  }
`;
const insertpost = gql`
  mutation($description:String!, $imagurl:String!) {
    createPost(input:{description:$description, imagurl: $imagurl}){
      description
    }
  }
`

const thumbsContainer = {
  display: 'flex',
  flexDirection: 'row',
  flexWrap: 'wrap',
  marginTop: 16
};

const thumb = {
  display: 'inline-flex',
  borderRadius: 2,
  border: '1px solid #eaeaea',
  marginBottom: 8,
  marginRight: 8,
  width: 100,
  height: 100,
  padding: 4,
  boxSizing: 'border-box'
};

const thumbInner = {
  display: 'flex',
  minWidth: 0,
  overflow: 'hidden'
};

const img = {
  display: 'block',
  width: 'auto',
  height: '100%'
};
const style1 = {
  width: "18rem",
}

function Popup() {
  let input;
  const [files, setFiles] = useState([]);
  const [description, setdescription] = useState()
  const [addTodo, { data }] = useMutation(uploadFileMutation);
  const [addPost, {post}] = useMutation(insertpost)
  const remove =(e) =>{
    files.splice(e.target.value,1)
  }
  const thumbs = files.map((file,index) => (
    <div  className="close" aria-label="Close">  
    <div style={thumb} key={file.name}  aria-hidden="true">
      <div style={thumbInner}>
        <img alt="asdf"
          src={file.preview}
         />
      </div>
    </div><button value={index} onClick={remove}>x</button>
    </div>
  ));
  useEffect(() => () => {
    // Make sure to revoke the data uris to avoid memory leaks
    files.forEach(file => URL.revokeObjectURL(file.preview));
  }, [files]);
 const  submitvalue =async (event)=>{
    event.preventDefault()
    if(files.length < 0){
      alert("please upload the file")
      return false
    } else {
      let result = await addTodo({ variables: { file:files } })
      let imagurl = result.data.uploadFile
      if(description == "" || description == "undefined" ||description == undefined ){
        alert("Please provide the description")
        return false
      }else {
        let result1 = await addPost({variables: {description:description, imagurl: imagurl}})
        if(result1){
          window.location.reload(false);
        }
      }
     
    }
   
  }
    return (
      <form onSubmit={submitvalue}  className="d-flex justify-content-center">
        <div class="card" style={style1}>
  <div class="card-header">
  
  <p>  Hi post your thought 
        <Dropzone className= 'dropzone disabled' onDrop={acceptedFiles =>{
          setFiles(acceptedFiles.map(file => Object.assign(file, {
            preview: URL.createObjectURL(file)
          })));
        }}>
          {({getRootProps, getInputProps}) => (
            <section>
              <div {...getRootProps()}>
                <input {...getInputProps()} />
             <button >Add</button>
              </div>
            
            </section>
          )}
        </Dropzone>
        </p>
        </div>
  <div class="card-body">
  {thumbs}
  <input type="text" name="description" value={description} onChange={e=>setdescription(e.target.value)} />
                <input type="submit" />
  </div>

</div>
        </form>
    )
 }
export default Popup