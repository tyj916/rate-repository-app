import { View, TextInput, Pressable } from "react-native";
import Text from "./Text";

const ReviewForm = () => {
  return (
    <View>
      <TextInput 
        placeholder='Repository owner name'
      />
      <TextInput 
        placeholder='Repository name'
      />
      <TextInput 
        placeholder='Rating between 0 and 100'
      />
      <TextInput 
        placeholder='Review'
      />
      <Pressable>
        <Text>Create a review</Text>
      </Pressable>
    </View>
  );
};

export default ReviewForm;
