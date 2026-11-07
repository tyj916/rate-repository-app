import { useMutation } from "@apollo/client/react";
import { SIGN_IN } from "../graphql/mutations";

const useSignIn = () => {
  const [mutation, result] = useMutation(SIGN_IN);

  const signIn = async ({ username, password }) => {
    return await mutation({ 
      variables: {
        credentials: {
          username,
          password
        },
      },
    });
  };

  return [signIn, result];
};

export default useSignIn;
