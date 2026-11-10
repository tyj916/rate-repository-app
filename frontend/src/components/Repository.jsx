import { useParams } from "react-router-native";
import * as Linking from 'expo-linking'
import { Pressable, View } from "react-native";
import Text from "./Text";
import { useQuery } from "@apollo/client/react";
import { GET_REPOSITORY_DETAILS } from "../graphql/queries";
import RepositoryItem from "./RepositoryItem";

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
      <View>
        <Pressable onPress={() => handleNavigate(repositoryData.url)}>
          <Text>Open in GitHub</Text>
        </Pressable>
      </View>
    </View>
  );
};

export default Repository;
