import { Pressable, View, StyleSheet } from "react-native";
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
})

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

  const repositoryData = result.data.repository;

  return (
    <View>
      <RepositoryItem item={repositoryData} />
      <View style={styles.buttonContainer}>
        <Pressable onPress={() => handleNavigate(repositoryData.url)}>
          <Text style={styles.buttonText}>Open in GitHub</Text>
        </Pressable>
      </View>
    </View>
  );
};

export default Repository;
