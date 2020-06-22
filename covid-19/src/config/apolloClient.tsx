import ApplloClient from 'apollo-boost';

const client = new ApplloClient({
    uri: process.env.REACT_APP_GRAPHQL_URL
});

export default client;