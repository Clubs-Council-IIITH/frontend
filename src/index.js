import './index.css';

import {ApolloClient, ApolloProvider, InMemoryCache} from '@apollo/client';
import {createUploadLink} from 'apollo-upload-client';
import NavigationContextProvider from 'contexts/NavigationContext';
import SessionContextProvider from 'contexts/SessionContext';
import React from 'react';
import {createRoot} from 'react-dom/client';

import App from './App';
import reportWebVitals from './reportWebVitals';

const client = new ApolloClient({
    cache: new InMemoryCache(),
    link: createUploadLink({uri: '/graphql'}),
});

const container = document.getElementById('root');
const root = createRoot(container);

root.render(
    <ApolloProvider client={client}>
        <SessionContextProvider>
            <NavigationContextProvider>
                <App />
            </NavigationContextProvider>
        </SessionContextProvider>
    </ApolloProvider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
