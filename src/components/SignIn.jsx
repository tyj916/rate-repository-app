import { View, StyleSheet, TextInput, Pressable } from "react-native";
import Text from "./Text";
import theme from "../theme";
import { useFormik } from "formik";

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

const initialValues = {
  username: '',
  password: '',
};

const SignInForm = ({ onSubmit }) => {
  const formik = useFormik({
    initialValues,
    onSubmit,
  });

  return (
    <View style={styles.formContainer}>
      <TextInput 
        placeholder="Username"
        value={formik.values.username}
        onChangeText={formik.handleChange('username')}
        style={styles.field}
      />
      <TextInput 
        placeholder="Password"
        value={formik.values.password}
        onChangeText={formik.handleChange('password')}
        secureTextEntry
        style={styles.field}
      />
      <Pressable onPress={formik.handleSubmit} style={styles.button}>
        <Text color="onDark">Sign in</Text>
      </Pressable>
    </View>
  );
};

const SignIn = () => {
  const onSubmit = ({ username, password}) => {
    if (username && password) {
      console.log(`login as ${username}`);
    }
  };

  return (
    <View style={styles.container}>
      <SignInForm onSubmit={onSubmit} />
    </View>
  );
};

export default SignIn;
