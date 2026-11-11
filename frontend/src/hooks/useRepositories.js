import { useQuery } from "@apollo/client/react";
import { GET_REPOSITORIES } from "../graphql/queries";

const useRepositories = (orderBy = "CREATED_AT", orderDirection = "DESC", searchKeyword) => {
  const result = useQuery(GET_REPOSITORIES, {
    fetchPolicy: 'cache-and-network',
    variables: {
      orderBy,
      orderDirection,
      searchKeyword,
    },
  });

  return {
    repositories: result.data?.repositories,
    error: result.error,
    loading: result.loading,
    refetch: result.refetch,
  };
};

export default useRepositories;
