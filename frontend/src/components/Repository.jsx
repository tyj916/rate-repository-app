import { Pressable, View, StyleSheet, FlatList } from "react-native";
import Text from "./Text";
import { useParams } from "react-router-native";
import * as Linking from 'expo-linking'
import { useQuery } from "@apollo/client/react";
import { GET_REPOSITORY_DETAILS } from "../graphql/queries";
import RepositoryItem from "./RepositoryItem";
import ReviewItem from "./ReviewItem";
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
});

const ItemSeparator = () => {
  return <View style={{ height: 10 }}></View>
}

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
  const variables = {
    repositoryId: id,
    first: 4,
  }

  const { data, loading, fetchMore } = useQuery(GET_REPOSITORY_DETAILS, {
    variables,
    fetchPolicy: 'cache-and-network',
  });
  
  if (loading && !data) {
    return <Text>Loading...</Text>
  }
  
  const repository = data?.repository;
  const reviews = repository ? repository.reviews.edges.map(edge => edge.node) : [];
  
  const handleFetchMore = () => {
    const canFetchMore = !loading && data?.repository.reviews.pageInfo.hasNextPage;

    if (!canFetchMore) {
      return;
    }

    fetchMore({
      variables: {
        after: data.repository.reviews.pageInfo.endCursor,
        ...variables,
      },
    });
  };

  return (
    <FlatList 
      data={reviews}
      renderItem={({ item }) => <ReviewItem review={item} />}
      keyExtractor={({ id }) => id}
      ListHeaderComponent={() => <RepositoryView repository={repository} />}
      ListHeaderComponentStyle={{ marginBottom: 10 }}
      ItemSeparatorComponent={ItemSeparator}
      onEndReached={handleFetchMore}
      onEndReachedThreshold={0.2}
    />
  );
};

export default Repository;
