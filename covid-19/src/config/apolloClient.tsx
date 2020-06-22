import ApplloClient from 'apollo-boost';

const client = new ApplloClient({
    uri: 'http://localhost:4000/'
});

export default client;