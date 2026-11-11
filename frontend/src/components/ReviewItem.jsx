import { View, StyleSheet } from "react-native";
import Text from "./Text";
import theme from "../theme";

const styles = StyleSheet.create({
  reviewItemContainer: {
    padding: theme.padding.itemContainer,
    backgroundColor: theme.colors.itemBackground,
    flexDirection: 'row',
    gap: 16,
  },
  reviewRatingContainer: {
    height: 50,
    width: 50,
    borderRadius: 25,
    borderWidth: 3,
    borderColor: theme.colors.primary,
    justifyContent: "center",
    alignItems: "center",
  },
  reviewRating: {
    fontSize: theme.fontSizes.subheading,
    fontWeight: theme.fontWeights.bold,
    color: theme.colors.primary,
  },
  reviewDetailsContainer: {
    gap: 4,
    flexShrink: 1,
  },
  reviewUser: {
    fontWeight: theme.fontWeights.bold,
  },
  reviewTime: {
    color: theme.colors.textSecondary,
  },
})

const ReviewItem = ({ review }) => {
  const date = new Date(review.createdAt).toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  });

  return (
    <View style={styles.reviewItemContainer}>
      <View style={styles.reviewRatingContainer}>
        <Text style={styles.reviewRating}>{review.rating}</Text>
      </View>
      <View style={styles.reviewDetailsContainer}>
        <View>
          <Text style={styles.reviewUser}>{review.user.username}</Text>
          <Text style={styles.reviewTime}>{date}</Text>
        </View>
        <Text>{review.text}</Text>
      </View>
    </View>
  );
};

export default ReviewItem;
