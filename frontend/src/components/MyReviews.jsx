import { View, FlatList, Pressable, StyleSheet } from "react-native";
import Text from "./Text";
import useMe from "../hooks/useMe";
import ReviewItem from "./ReviewItem";
import theme from "../theme";
import { useNavigate } from "react-router-native";

const styles = StyleSheet.create({
  reviewButtonsContainer: {
    padding: theme.padding.itemContainer,
    backgroundColor: theme.colors.itemBackground,
    borderTopWidth: 1,
    borderTopColor: theme.colors.mainBackground,
    flexDirection: "row",
    gap: 16,
  },
  reviewButton: {
    padding: theme.padding.itemContainer,
    backgroundColor: theme.colors.primary,
    flex: 1,
    borderRadius: 8,
  },
  reviewButtonText: {
    color: theme.colors.textOnDark,
    textAlign: "center",
    fontWeight: theme.fontWeights.bold,
  },
});

const ItemSeparator = () => <View style={{ height: 10 }} />;

const ReviewItemContainer = ({ item }) => {
  const navigate = useNavigate();

  return (
    <View>
      <ReviewItem review={item} />
      <View style={styles.reviewButtonsContainer}>
        <Pressable 
          onPress={() => navigate(`/repositories/${item.repository.id}`)}
          style={styles.reviewButton}
        >
          <Text style={styles.reviewButtonText}>View repository</Text>
        </Pressable>
        <Pressable style={[styles.reviewButton, { backgroundColor: theme.colors.error }]}>
          <Text style={styles.reviewButtonText}>Delete review</Text>
        </Pressable>
      </View>
    </View>
  );
};

const MyReviews = () => {
  const { me, loading } = useMe({ includeReviews: true });

  if (loading) {
    return <Text>Loading...</Text>
  }

  const reviews = me.reviews.edges.map(edge => edge.node);

  return (
    <FlatList 
      data={reviews}
      renderItem={({item}) => <ReviewItemContainer item={item} />}
      ItemSeparatorComponent={<ItemSeparator />}
    />
  );
};

export default MyReviews;
