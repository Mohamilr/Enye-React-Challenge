import ApplloClient from 'apollo-boost';

const client = new ApplloClient({
    uri: 'https://covid-19-graphiql.herokuapp.com'
});

export default client;