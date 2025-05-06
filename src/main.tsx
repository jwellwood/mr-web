import {StrictMode} from 'react'
import { Provider } from 'react-redux';

import {createRoot} from 'react-dom/client'

import {ApolloProvider} from '@apollo/client';


import './index.css'

import AppRouter from './router/AppRouter'

import {apolloClient} from "./services/graphql/apolloClient.ts";

import {store} from "./store/store.ts";

createRoot(document.getElementById('root')!).render(
    <ApolloProvider client={apolloClient}>
        <Provider store={store}>
        <StrictMode>
            <AppRouter />
        </StrictMode>
        </Provider>
    </ApolloProvider>,
)
