import { View } from "react-native";
import { useParams } from "react-router-native";
import Text from "./Text";

const Repository = () => {
  const { id } = useParams();

  console.log(id);

  return (
    <View>
      <Text>Single repository view</Text>
    </View>
  );
};

export default Repository;
