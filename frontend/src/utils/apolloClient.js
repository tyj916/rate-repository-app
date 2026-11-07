import { ApolloClient, HttpLink, InMemoryCache } from '@apollo/client';

const APOLLO_URI = process.env.EXPO_PUBLIC_APOLLO_URI

const httpLink = new HttpLink({
  uri: APOLLO_URI,
});

const createApolloClient = () => {
  return new ApolloClient({
    link: httpLink,
    cache: new InMemoryCache(),
  });
};

export default createApolloClient;
