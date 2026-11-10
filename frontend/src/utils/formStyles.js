import { StyleSheet } from "react-native";
import theme from "../theme";

const styles = StyleSheet.create({
  formContainer: {
    padding: theme.padding.itemContainer,
    backgroundColor: theme.colors.itemBackground,
    gap: 16,
  },
  inputContainer: {
    gap: 8,
  },
  textInput: {
    borderWidth: 1,
    borderColor: theme.colors.textPrimary,
    borderRadius: 8,
  },
  submitButton: {
    backgroundColor: theme.colors.primary,
    padding: 16,
    color: theme.colors.textOnDark,
    fontWeight: theme.fontWeights.bold,
    textAlign: "center",
    borderRadius: 8,
  },
  errorText: {
    color: theme.colors.error,
  }
});

export default styles;

export const fieldWithError = [
  styles.textInput,
  {
    borderColor: theme.colors.error
  }
];
