import { Pressable, StyleSheet } from "react-native";
import { useNavigate } from "react-router-native";
import { useApolloClient } from "@apollo/client/react";
import useAuthStorage from "../hooks/useAuthStorage";
import Text from "./Text";

const styles = StyleSheet.create({
  tab: {
    padding: 16,
  }
})

const SignOut = () => {
  const authStorage = useAuthStorage();
  const apolloClient = useApolloClient();
  const navigate = useNavigate();

  const signOut = async () => {
    await authStorage.removeAccessToken();
    apolloClient.resetStore();
    navigate('/');
  };

  return (
    <Pressable onPress={signOut} style={styles.tab}>
      <Text variant="subheading" color="onDark">Sign Out</Text>
    </Pressable>
  );
};

export default SignOut;
