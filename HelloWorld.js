import { Text, Pressable, View, Alert } from "react-native";

const HelloWorld = () => {
  return (
    <View>
      <Text>Hello world!</Text>;
      <Pressable onPress={() => Alert.alert("You pressed the text!")}>
        <Text>You can press me</Text>
      </Pressable>
    </View>
  );
};

export default HelloWorld;
