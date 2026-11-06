import { StyleSheet } from "react-native";
import { Link } from "react-router-native";
import Text from "./Text";

const styles = StyleSheet.create({
  link: {
    flex: 1,
    alignItems: "center",
    padding: 16,
  },
});

const AppBarTab = ({ text, navigateTo }) => {
  return (
      <Link to={navigateTo} style={styles.link}>
        <Text variant="subheading" color="onDark">{text}</Text>
      </Link>
  );
};

export default AppBarTab;
