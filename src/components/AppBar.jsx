import { View, StyleSheet, Pressable, Alert } from 'react-native';
import Text from './Text';
import Constants from 'expo-constants';

const styles = StyleSheet.create({
  container: {
    paddingTop: Constants.statusBarHeight,
    padding: 8,
    paddingBottom: 16,
    backgroundColor: "rgba(0,0,0,0.9)",
  },  
});

const AppBar = () => {
  return <View style={styles.container}>
    <Pressable onPress={() => Alert.alert("Repositories")}>
      <Text variant="subheading" color="textDark">Repositories</Text>
    </Pressable>
  </View>;
};

export default AppBar;
