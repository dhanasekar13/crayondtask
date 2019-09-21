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

function Popup() {
  let input;
  const [files, setFiles] = useState([]);
  const [description, setdescription] = useState()
  const [addTodo, { data }] = useMutation(uploadFileMutation);
  const [addPost, {post}] = useMutation(insertpost)
  const thumbs = files.map(file => (
    <div style={thumb} key={file.name}>
      <div style={thumbInner}>
        <img alt="asdf"
          src={file.preview}
          style={img}
        />
      </div>
    </div>
  ));
  useEffect(() => () => {
    // Make sure to revoke the data uris to avoid memory leaks
    files.forEach(file => URL.revokeObjectURL(file.preview));
  }, [files]);
 const  submitvalue =async (event)=>{
    console.log('------form submit------',description )
    event.preventDefault()
    let result = await addTodo({ variables: { file:files } })
    let imagurl = result.data.uploadFile
    let result1 = await addPost({variables: {description:description, imagurl: imagurl}})
    console.log(result1,'-------the final result')
  }
    return (
      <form onSubmit={submitvalue}>
        <Dropzone onDrop={acceptedFiles =>{
          console.log(acceptedFiles,'----------the file')
          setFiles(acceptedFiles.map(file => Object.assign(file, {
            preview: URL.createObjectURL(file)
          })));
        }}>
          {({getRootProps, getInputProps}) => (
            <section>
              <div {...getRootProps()}>
                <input {...getInputProps()} />
                {data ? 

                <aside style={thumbsContainer}>
                {thumbs}
                </aside>
                :
                <p>Drag 'n' drop some files here, or click to select files</p>

                }
              </div>
              <input type="text" name="description" value={description} onChange={e=>setdescription(e.target.value)} />
                <input type="submit" />
            </section>
          )}
        </Dropzone>
        </form>
    )
 }
export default Popup