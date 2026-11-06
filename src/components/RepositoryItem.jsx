import { View, Text, Image, StyleSheet } from "react-native";

const styles = StyleSheet.create({
  itemContainer: {
    padding: 16,
  },
  infoContainer: {
    flexDirection: "row",
    gap: 16,
  },
  countsContainer: {
    flexDirection: "row",
  },
  avatar: {
    height: 50,
    width: 50,
  }
});

const RepositoryItem = ({ item }) => {
  return (
    <View style={styles.itemContainer}>
      <View style={styles.infoContainer}>
        <Image style={styles.avatar} source={{ uri: item.ownerAvatarUrl }}/>
        <View>
          <Text>Full name: {item.fullName}</Text>
          <Text>Description: {item.description}</Text>
          <Text>Language: {item.language}</Text>
        </View>
      </View>
      <View style={styles.countsContainer}>
        <Text>Stars: {item.stargazersCount}</Text>
        <Text>Forks: {item.forksCount}</Text>
        <Text>Reviews: {item.reviewCount}</Text>
        <Text>Rating: {item.ratingAverage}</Text>
      </View>
    </View>
  );
};

export default RepositoryItem;
