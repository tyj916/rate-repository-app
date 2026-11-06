import { View, StyleSheet, TextInput, Pressable } from "react-native";
import Text from "./Text";
import theme from "../theme";

const styles = StyleSheet.create({
  container: {
    backgroundColor: theme.colors.itemBackground,
    padding: 16,
  },
  formContainer: {
    gap: 16,
  },
  field: {
    borderWidth: 1,
    borderColor: theme.colors.textPrimary,
    borderRadius: 4,
  },
  button: {
    padding: 12,
    borderRadius: 4,
    backgroundColor: theme.colors.primary,
    alignItems: "center"
  }
});

const SignInForm = () => {
  return (
    <View style={styles.formContainer}>
      <TextInput 
        placeholder="Username"
        style={styles.field}
      />
      <TextInput 
        placeholder="Password"
        secureTextEntry
        style={styles.field}
      />
      <Pressable style={styles.button}>
        <Text color="onDark">Sign in</Text>
      </Pressable>
    </View>
  );
};

const SignIn = () => {
  return (
    <View style={styles.container}>
      <SignInForm />
    </View>
  );
};

export default SignIn;
