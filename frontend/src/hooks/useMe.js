import { useQuery } from "@apollo/client/react";
import { ME } from "../graphql/queries";

const useMe = ({ includeReviews = false } = {}) => {
  const result = useQuery(ME, {
    variables: {
      includeReviews,
    },
    fetchPolicy: 'cache-and-network',
  });

  return {
    me: result.data?.me,
    error: result.error,
    loading: result.loading,
    refetch: result.refetch,
  }
};

export default useMe;
