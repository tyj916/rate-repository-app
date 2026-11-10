import { View, TextInput } from "react-native";
import styles from "../utils/formStyles";
import theme from "../theme";
import Text from "./Text";

const FormikTextInput = ({
  formik,
  name,
  placeholder,
  ...props
}) => {
  const hasError = formik.touched[name] && formik.errors[name];

  return (
    <View style={styles.inputContainer}>
      <TextInput 
        placeholder={placeholder}
        value={formik.values[name]?.toString() ?? ""}
        onChangeText={formik.handleChange(name)}
        onBlur={formik.handleBlur(name)}
        style={[
          styles.textInput,
          hasError && { borderColor: theme.colors.error },
        ]}
        {...props}
      />

      {hasError && (
        <Text style={styles.errorText}>
          {formik.errors[name]}
        </Text>
      )}
    </View>
  );
};

export default FormikTextInput;
