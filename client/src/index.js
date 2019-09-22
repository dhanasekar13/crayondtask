import React from 'react';
import ReactDOM from 'react-dom';
import { createUploadLink } from 'apollo-upload-client'
import { ApolloClient } from 'apollo-client'
import { InMemoryCache} from 'apollo-cache-inmemory'
import { ApolloProvider } from 'react-apollo'
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';

const link = createUploadLink({uri:'http://localhost:2222/graphql'})

const client = new ApolloClient({
  //  uri:"http://localhost:1111",
    link,
    cache: new InMemoryCache()
})
ReactDOM.render(<ApolloProvider client={client}><App /></ApolloProvider>, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
