import { ApolloClient, InMemoryCache } from '@apollo/client';
import createUploadLink from "apollo-upload-client/createUploadLink.mjs";

export const apolloClient = new ApolloClient({
    uri: 'https://madrid-reds-6z4rr5ysna-pd.a.run.app/graphql',
    credentials: 'include',
    cache: new InMemoryCache({
        typePolicies: {
            Query: {
                fields: {
                    matchesBySeason: {
                        // Don't cache separate results based on
                        // any of this field's arguments.
                        keyArgs: ['seasonId', 'teamId'],
                        // Concatenate the incoming list items with
                        // the existing list items.
                        merge(existing, incoming, { args }) {
                            // Slicing is necessary because the existing data is
                            //  immutable and frozen in development.
                            const merged = existing ? existing.slice(0) : [];
                            for (let i = 0; i < incoming.length; ++i) {
                                merged[(args?.offset || 0) + i] = incoming[i];
                            }
                            return merged;
                        },
                    },
                },
            },
        },
    }),

    link: createUploadLink({
        uri: 'https://madrid-reds-6z4rr5ysna-pd.a.run.app/graphql',
    }),
});
