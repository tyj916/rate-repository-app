import { View, StyleSheet } from 'react-native';
import theme from '../theme';
import AppBarTab from './AppBarTab';

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    backgroundColor: theme.colors.darkbackground,
  },  
});

const AppBar = () => {
  return <View style={styles.container}>
    <AppBarTab text="Repositories" navigateTo="/" />
    <AppBarTab text="Sign In" navigateTo="/signIn" />
  </View>;
};

export default AppBar;
