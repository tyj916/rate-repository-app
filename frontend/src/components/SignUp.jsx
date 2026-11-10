import { Pressable, View } from "react-native";
import Text from "./Text";
import { useFormik } from "formik";
import FormikTextInput from "./FormikTextInput";
import styles from "../utils/formStyles";
import * as yup from 'yup';

const initialValues = {
  username: "",
  password: "",
  passwordConfirmation: "",
};

const validationSchema = yup.object().shape({
  username: yup
    .string()
    .min(5, "Username minimum length 5 characters")
    .max(30, "Username maximum length 30 characters")
    .required("Username is a required string with a length between 5 and 30"),
  password: yup
    .string()
    .min(5, "Password minimum length 5 characters")
    .max(50, "Password maximum length 50 characters")
    .required("Password is a required string with a length between 5 and 50"),
  passwordConfirmation: yup
    .string()
    .oneOf([yup.ref('password'), null], "Password does not match")
    .required("Password confirmation is required")
});

const SignUpForm = ({ onSubmit }) => {
  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit,
  })

  return (
    <View style={styles.formContainer}>
      <FormikTextInput
        formik={formik}
        name="username" 
        placeholder='Username'
      />
      <FormikTextInput
        formik={formik}
        name="password"
        placeholder='Password'
      />
      <FormikTextInput
        formik={formik}
        name="passwordConfirmation" 
        placeholder='Password confirmation'
      />
      <Pressable onPress={formik.handleSubmit}>
        <Text style={styles.submitButton}>Sign up</Text>
      </Pressable>
    </View>
  );
};

const SignUp = () => {
  const handleSignUp = ({ username, password }) => {
    console.log("Username", username);
    console.log("Password", password);
  };

  return <SignUpForm onSubmit={handleSignUp} />;
};

export default SignUp;
