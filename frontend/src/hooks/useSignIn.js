import { useMutation } from "@apollo/client/react";
import { SIGN_IN } from "../graphql/mutations";
import useAuthStorage from "./useAuthStorage";

const useSignIn = () => {
  const authStorage = useAuthStorage();
  const [mutation, result] = useMutation(SIGN_IN);

  const signIn = async ({ username, password }) => {
    const { data } = await mutation({ 
      variables: {
        credentials: {
          username,
          password
        },
      },
    });

    if (data.authenticate.accessToken) {
      await authStorage.setAccessToken(data.authenticate.accessToken);
      return true;
    }

    return false;
  };

  return [signIn, result];
};

export default useSignIn;
