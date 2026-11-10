import { useNavigate } from 'react-router-native';
import { FlatList, View, StyleSheet, Pressable } from 'react-native';
import RepositoryItem from './RepositoryItem';
import useRepositories from '../hooks/useRepositories';
import Text from './Text';

const styles = StyleSheet.create({
  separator: {
    height: 10,
  },
});

const ItemSeparator = () => <View style={styles.separator} />;

export const RepositoryListContainer = ({ repositories }) => {
  const navigate = useNavigate();

  const repositoryNodes = repositories
    ? repositories.edges.map(edge => edge.node)
    : [];

  const handleNavigate = (repositoryId) => {
    navigate(`/repositories/${repositoryId}`)
  };

  return (
    <FlatList
      data={repositoryNodes}
      ItemSeparatorComponent={ItemSeparator}
      renderItem={({ item }) => (
        <Pressable onPress={() => handleNavigate(item.id)}>
          <RepositoryItem item={item} />
        </Pressable>
      )}
    />
  );
};

const RepositoryList = () => {
  const { repositories, loading } = useRepositories();

  if (loading) {
    return <Text>Loading...</Text>
  }

  return <RepositoryListContainer repositories={repositories} />;
};

export default RepositoryList;
