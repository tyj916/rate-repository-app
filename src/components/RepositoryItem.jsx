import { View, Text, Image, StyleSheet } from "react-native";

const styles = StyleSheet.create({
  avatar: {
    height: 50,
    width: 50,
  }
});

const RepositoryItem = ({ item }) => {
  return (
    <View>
      <Image style={styles.avatar} source={{ uri: item.ownerAvatarUrl }}/>
      <Text>Full name: {item.fullName}</Text>
      <Text>Description: {item.description}</Text>
      <Text>Language: {item.language}</Text>
      <Text>Stars: {item.stargazersCount}</Text>
      <Text>Forks: {item.forksCount}</Text>
      <Text>Reviews: {item.reviewCount}</Text>
      <Text>Rating: {item.ratingAverage}</Text>
    </View>
  );
};

export default RepositoryItem;
