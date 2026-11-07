import { useQuery } from "@apollo/client/react";
import { ME } from "../graphql/queries";

const useMe = () => {
  const result = useQuery(ME);

  return {
    me: result.data?.me,
    error: result.error,
    loading: result.loading,
  }
};

export default useMe;
