import Constants from 'expo-constants';
import { View, StyleSheet } from 'react-native';
import Text from './Text';
import RepositoryList from './RepositoryList';

const styles = StyleSheet.create({
  container: {
    marginTop: Constants.statusBarHeight,
    flex: 1,
  },
});

const Main = () => {
  return (
    <View style={styles.container}>
      <Text variant="subheading" color="primary">Rate Repository Application</Text>
      <RepositoryList />
    </View>
  );
};

export default Main;
