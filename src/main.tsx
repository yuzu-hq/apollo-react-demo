import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'

import {
    ApolloClient,
    InMemoryCache,
    ApolloProvider,
} from "@apollo/client"

const client = new ApolloClient({
  uri: "https://graph.yuzu.dev/graphql",
  cache: new InMemoryCache(),
  headers: {
    "Authorization": `Bearer demo`
  }
})

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <App />
    </ApolloProvider>
  </React.StrictMode>
)
