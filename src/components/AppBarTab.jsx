import { Link } from "react-router-native";
import Text from "./Text";

const AppBarTab = ({ text, navigateTo }) => {
  return (
    <Link to={navigateTo}>
      <Text variant="subheading" color="onDark">{text}</Text>
    </Link>
  );
};

export default AppBarTab;
