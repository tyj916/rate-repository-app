import { View, StyleSheet, ScrollView } from 'react-native';
import theme from '../theme';
import AppBarTab from './AppBarTab';

const styles = StyleSheet.create({
  container: {
    backgroundColor: theme.colors.darkbackground,
  },  
});

const AppBar = () => {
  return <View style={styles.container}>
    <ScrollView horizontal>
      <AppBarTab text="Repositories" navigateTo="/" />
      <AppBarTab text="Sign In" navigateTo="/signIn" />
    </ScrollView>
  </View>;
};

export default AppBar;
