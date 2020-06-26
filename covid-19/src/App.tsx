import React from 'react';
import { ApolloProvider } from 'react-apollo';
import Routes from './routes/route';
import MyErrorBoundary from './components/errorBoundary';
import { AppContext } from './utils/useContext';
import client from './config/apolloClient';

const App = () => {
  return (
    <ApolloProvider client={client}>
      <AppContext>
        <MyErrorBoundary>
          <Routes />
        </MyErrorBoundary>
      </AppContext>
    </ApolloProvider>
  );
}

export default App;
