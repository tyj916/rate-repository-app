import { useQuery } from "@apollo/client/react";
import { GET_REPOSITORIES } from "../graphql/queries";

const useRepositories = () => {
  const result = useQuery(GET_REPOSITORIES);

  return {
    repositories: result.data?.repositories,
    error: result.error,
    loading: result.loading,
    refetch: result.refetch,
  };
};

export default useRepositories;
