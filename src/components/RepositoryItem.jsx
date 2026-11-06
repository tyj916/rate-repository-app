import { View, Image, StyleSheet } from "react-native";
import Text from "./Text";
import theme from "../theme";

const styles = StyleSheet.create({
  itemContainer: {
    padding: 16,
  },
  infoContainer: {
    flexDirection: "row",
    gap: 16,
  },
  detailsContainer: {
    flex: 1,
    flexShrink: 1,
    alignItems: "flex-start",
    gap: 4,
  },
  countsContainer: {
    flexDirection: "row",
  },
  avatar: {
    height: 50,
    width: 50,
    borderRadius: 4,
  },
  languageTag: {
    backgroundColor: theme.colors.primary,
    color: theme.colors.textOnDark,
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 4,
  },
});

const RepositoryItem = ({ item }) => {
  return (
    <View style={styles.itemContainer}>
      <View style={styles.infoContainer}>
        <Image style={styles.avatar} source={{ uri: item.ownerAvatarUrl }}/>
        <View style={styles.detailsContainer}>
          <Text fontWeight="bold">{item.fullName}</Text>
          <Text color="textSecondary">{item.description}</Text>
          <Text style={styles.languageTag}>{item.language}</Text>
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
