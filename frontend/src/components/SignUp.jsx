import { View } from "react-native";
import Text from "./Text";

const SignUpForm = ({ onSubmit }) => {
  return (
    <View>
      <Text>Sign Up Form</Text>
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
