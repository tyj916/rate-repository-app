import { Text as NativeText, StyleSheet } from "react-native";

import theme from '../theme';

const styles = StyleSheet.create({
  text: {
    color: theme.colors.textPrimary,
    fontSize: theme.fontSizes.body,
    fontFamily: theme.fonts.main,
    fontWeight: theme.fontWeights.normal,
  },
  subheading: {
    fontSize: theme.fontSizes.subheading,
    fontWeight: theme.fontWeights.bold,
  },
  colorTextSecondary: {
    color: theme.colors.textSecondary,
  },
  colorOnDark: {
    color: theme.colors.textOnDark,
  },
  colorPrimary: {
    color: theme.colors.primary,
  },
  colorError: {
    color: theme.colors.error,
  },
  fontSizeSubheading: {
    fontSize: theme.fontSizes.subheading,
  },
  fontWeightBold: {
    fontWeight: theme.fontWeights.bold,
  },
});

const Text = ({ variant, color, fontSize, fontWeight, subheading, style, ...props }) => {
  const textStyle = [
    styles.text,
    variant === "subheading" && styles.subheading,
    color === 'textSecondary' && styles.colorTextSecondary,
    color === 'onDark' && styles.colorOnDark,
    color === 'primary' && styles.colorPrimary,
    color === 'error' && styles.colorError,
    fontSize === 'subheading' && styles.fontSizeSubheading,
    fontWeight === 'bold' && styles.fontWeightBold,
    style,
  ];

  return <NativeText style={textStyle} {...props} />
};

export default Text;
