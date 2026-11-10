import { Pressable, View } from "react-native";
import Text from "./Text";
import { useFormik } from "formik";
import FormikTextInput from "./FormikTextInput";
import styles from "../utils/formStyles";

const initialValues = {
  username: "",
  password: "",
  confirmPassword: "",
};

const SignUpForm = ({ onSubmit }) => {
  const formik = useFormik({
    initialValues,
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
        name="confirmPassword" 
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
