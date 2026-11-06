import { View, Image, StyleSheet } from "react-native";
import Text from "./Text";
import theme from "../theme";

const styles = StyleSheet.create({
  itemContainer: {
    padding: 16,
    gap: 16,
    backgroundColor: theme.colors.itemBackground,
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
  countItem: {
    flex: 1,
    alignItems: "center"
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

const CountItem = ({ text, count }) => {
  const countView = count > 1000 
    ? parseFloat(Number(count / 1000).toFixed(1)) + 'k' 
    : count;

  return (
    <View style={styles.countItem}>
      <Text fontWeight="bold">{countView}</Text>
      <Text color="textSecondary">{text}</Text>
    </View>
  );
};

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
        <CountItem text="Stars" count={item.stargazersCount} />
        <CountItem text="Forks" count={item.forksCount} />
        <CountItem text="Reviews" count={item.reviewCount} />
        <CountItem text="Rating" count={item.ratingAverage} />
      </View>
    </View>
  );
};

export default RepositoryItem;
