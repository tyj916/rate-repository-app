import { useNavigate } from 'react-router-native';
import { FlatList, View, StyleSheet, Pressable } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import RepositoryItem from './RepositoryItem';
import useRepositories from '../hooks/useRepositories';
import Text from './Text';
import { useState } from 'react';
import { Searchbar } from 'react-native-paper';
import { useDebounce } from 'use-debounce';

const styles = StyleSheet.create({
  separator: {
    height: 10,
  },
});

const ItemSeparator = () => <View style={styles.separator} />;

const SearchBar = ({ searchValue, setSearchValue }) => {
  return (
    <Searchbar
      placeholder='Search'
      value={searchValue}
      onChangeText={setSearchValue}
    />
  );
};

const OrderSelector = ({ order, changeOrder }) => {
  return (
    <Picker
      selectedValue={order}
      onValueChange={(value) => changeOrder(value)}
    >
      <Picker.Item label='Select an item...' enabled={false} />
      <Picker.Item label='Latest repositories' value="latest" />
      <Picker.Item label='Highest rated repositories' value="highestRated" />
      <Picker.Item label='Lowest rated repositories' value="lowestRated" />
    </Picker>
  );
};

export const RepositoryListContainer = ({ 
  repositories, 
  order, 
  changeOrder,
  searchValue,
  setSearchValue,
}) => {
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
      ListHeaderComponent={<View>
        <SearchBar searchValue={searchValue} setSearchValue={setSearchValue} />
        <OrderSelector order={order} changeOrder={changeOrder} />
      </View>}
    />
  );
};

const RepositoryList = () => {
  const [order, setOrder] = useState('latest');
  const [orderBy, setOrderBy] = useState('CREATED_AT');
  const [orderDirection, setOrderDirection] = useState('DESC');
  const [searchValue, setSearchValue] = useState('');
  const [searchKeyword] = useDebounce(searchValue, 500);
  const { repositories, loading } = useRepositories(orderBy, orderDirection, searchKeyword);

  const changeOrder = (value) => {
    setOrder(value);

    switch (value) {
      case "latest":
        setOrderBy("CREATED_AT");
        setOrderDirection("DESC");
        break;
      case "highestRated":
        setOrderBy("RATING_AVERAGE");
        setOrderDirection("DESC");
        break;
      case "lowestRated":
        setOrderBy("RATING_AVERAGE");
        setOrderDirection("ASC");
        break;
    };
  };

  if (loading) {
    return <Text>Loading...</Text>
  }

  return <RepositoryListContainer 
    repositories={repositories} 
    order={order}
    changeOrder={changeOrder}
    searchValue={searchValue}
    setSearchValue={setSearchValue}
  />;
};

export default RepositoryList;
