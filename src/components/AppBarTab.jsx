import { Pressable } from "react-native";
import Text from "./Text";

const AppBarTab = ({ text, navigateTo }) => {
  return (
    <Pressable onPress={navigateTo}>
      <Text variant="subheading" color="onDark">{text}</Text>
    </Pressable>
  );
};

export default AppBarTab;
