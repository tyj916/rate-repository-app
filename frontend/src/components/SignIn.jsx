import { View, StyleSheet, TextInput, Pressable } from "react-native";
import Text from "./Text";
import theme from "../theme";
import { useFormik } from "formik";
import * as yup from 'yup';
import useSignIn from "../hooks/useSignIn";

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

const fieldWithError = [
  styles.field,
  {
    borderColor: theme.colors.error,
  },
]

const initialValues = {
  username: '',
  password: '',
};

const validationSchema = yup.object().shape({
  username: yup
    .string()
    .min(2, 'Username should be at least 2 characters in length')
    .required('Username is required'),
  password: yup
    .string()
    .min(2, 'Password should be at least 2 characters in length')
    .required('Password is required'),
});

const SignInForm = ({ onSubmit }) => {
  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit,
  });

  const usernameHasError = formik.touched.username && formik.errors.username;
  const passwordHasError = formik.touched.password && formik.errors.password;

  return (
    <View style={styles.formContainer}>
      <TextInput 
        placeholder="Username"
        value={formik.values.username}
        onChangeText={formik.handleChange('username')}
        onBlur={formik.handleBlur('username')}
        style={usernameHasError ? fieldWithError : styles.field}
      />
      {usernameHasError && (
        <Text color="error">{formik.errors.username}</Text>
      )}
      <TextInput 
        placeholder="Password"
        value={formik.values.password}
        onChangeText={formik.handleChange('password')}
        onBlur={formik.handleBlur('password')}
        secureTextEntry
        style={passwordHasError ? fieldWithError: styles.field}
      />
      {passwordHasError && (
        <Text color="error">{formik.errors.password}</Text>
      )}
      <Pressable onPress={formik.handleSubmit} style={styles.button}>
        <Text color="onDark">Sign in</Text>
      </Pressable>
    </View>
  );
};

const SignIn = () => {
  const [signIn] = useSignIn();

  const onSubmit = async ({ username, password}) => {
    try {
      const { data } = await signIn({ username, password });
      console.log(data);
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <View style={styles.container}>
      <SignInForm onSubmit={onSubmit} />
    </View>
  );
};

export default SignIn;
