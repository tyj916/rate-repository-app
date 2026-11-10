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
  }
});

const ItemSeparator = () => {
  return <View style={{ height: 10 }}></View>
}

const ReviewItem = ({ review }) => {
  return (
    <View style={styles.reviewItemContainer}>
      <View>
        <Text>{review.rating}</Text>
      </View>
      <View>
        <Text>{review.user.username}</Text>
        <Text>{review.createdAt}</Text>
        <Text>{review.text}</Text>
      </View>
    </View>
  );
};

const Repository = () => {
  const { id } = useParams();

  const result = useQuery(GET_REPOSITORY_DETAILS, {
    variables: { repositoryId: id },
    fetchPolicy: 'cache-and-network',
  });

  const handleNavigate = (url) => {
    Linking.openURL(url);
  };

  if (result.loading) {
    return <Text>Loading...</Text>
  }

  const repository = result.data.repository;
  const reviews = repository ? repository.reviews.edges.map(edge => edge.node) : [];

  return (
    <View>
      <RepositoryItem item={repository} />
      <View style={styles.buttonContainer}>
        <Pressable onPress={() => handleNavigate(repository.url)}>
          <Text style={styles.buttonText}>Open in GitHub</Text>
        </Pressable>
      </View>
      <FlatList 
        data={reviews}
        renderItem={({ item }) => <ReviewItem review={item} />}
        ItemSeparatorComponent={ItemSeparator}
        keyExtractor={({ id }) => id}
      />
    </View>
  );
};

export default Repository;
