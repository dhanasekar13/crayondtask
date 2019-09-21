import React from 'react'

import { useMutation } from '@apollo/react-hooks';
import gql from 'graphql-tag';
import Dropzone from 'react-dropzone';

const uploadFileMutation = gql`
  mutation($file: Upload!) {
    uploadFile(file: $file)
  }
`;

function Popup() {
  let input;
  const [addTodo, { data }] = useMutation(uploadFileMutation);

    return (
        <Dropzone onDrop={acceptedFiles =>{
          console.log(acceptedFiles,'----------the file')
       addTodo({ variables: { file:acceptedFiles } }) }}>
          {({getRootProps, getInputProps}) => (
            <section>
              <div {...getRootProps()}>
                <input {...getInputProps()} />
                {data ? 
                <p>Some fiel is uploaded</p>:
                <p>Drag 'n' drop some files here, or click to select files</p>

                }
              </div>
            </section>
          )}
        </Dropzone>
    )
 }
export default Popup