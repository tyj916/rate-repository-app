import { Pressable, View, StyleSheet, FlatList } from "react-native";
import Text from "./Text";
import { useParams } from "react-router-native";
import * as Linking from 'expo-linking'
import { useQuery } from "@apollo/client/react";
import { GET_REPOSITORY_DETAILS } from "../graphql/queries";
import RepositoryItem from "./RepositoryItem";
import theme from "../theme";

const styles = StyleSheet.create({
  buttonContainer: {
    backgroundColor: theme.colors.itemBackground,
    paddingHorizontal: theme.padding.itemContainer,
    paddingBottom: theme.padding.itemContainer,
  },
  buttonText: {
    padding: theme.padding.pressable,
    backgroundColor: theme.colors.primary,
    color: theme.colors.textOnDark,
    fontWeight: theme.fontWeights.bold,
    textAlign: "center",
    borderRadius: 4,
  },
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
    gap: 8,
    flexShrink: 1,
  },
  reviewUser: {
    fontWeight: theme.fontWeights.bold,
  },
  reviewTime: {
    color: theme.colors.textSecondary,
  }
});

const ItemSeparator = () => {
  return <View style={{ height: 10 }}></View>
}

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
          <Text>{date}</Text>
        </View>
        <Text>{review.text}</Text>
      </View>
    </View>
  );
};

const RepositoryView = ({ repository }) => {
  const handleNavigate = (url) => {
    Linking.openURL(url);
  };

  return (
    <View>
      <RepositoryItem item={repository} />
      <View style={styles.buttonContainer}>
        <Pressable onPress={() => handleNavigate(repository.url)}>
          <Text style={styles.buttonText}>Open in GitHub</Text>
        </Pressable>
      </View>
    </View>
  );
}

const Repository = () => {
  const { id } = useParams();

  const result = useQuery(GET_REPOSITORY_DETAILS, {
    variables: { repositoryId: id },
    fetchPolicy: 'cache-and-network',
  });

  if (result.loading) {
    return <Text>Loading...</Text>
  }

  const repository = result.data.repository;
  const reviews = repository ? repository.reviews.edges.map(edge => edge.node) : [];

  return (
    <FlatList 
      data={reviews}
      renderItem={({ item }) => <ReviewItem review={item} />}
      keyExtractor={({ id }) => id}
      ListHeaderComponent={() => <RepositoryView repository={repository} />}
      ListHeaderComponentStyle={{ marginBottom: 10 }}
      ItemSeparatorComponent={ItemSeparator}
    />
  );
};

export default Repository;
