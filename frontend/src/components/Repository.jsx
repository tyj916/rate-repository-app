import { View } from "react-native";
import { useParams } from "react-router-native";
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

  if (result.loading) {
    return <Text>Loading...</Text>
  }

  return (
    <View>
      <RepositoryItem item={result.data.repository} />
    </View>
  );
};

export default Repository;
