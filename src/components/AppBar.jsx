import { View, StyleSheet, Pressable, Alert } from 'react-native';
import Text from './Text';
import Constants from 'expo-constants';
import theme from '../theme';

const styles = StyleSheet.create({
  container: {
    paddingTop: Constants.statusBarHeight,
    padding: 8,
    paddingBottom: 16,
    backgroundColor: theme.colors.background,
  },  
});

const AppBar = () => {
  return <View style={styles.container}>
    <Pressable onPress={() => Alert.alert("Repositories")}>
      <Text variant="subheading" color="onDark">Repositories</Text>
    </Pressable>
  </View>;
};

export default AppBar;
