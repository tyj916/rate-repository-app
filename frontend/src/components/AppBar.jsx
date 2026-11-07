import { View, StyleSheet, ScrollView } from 'react-native';
import Constants from 'expo-constants';
import theme from '../theme';
import AppBarTab from './AppBarTab';

const styles = StyleSheet.create({
  container: {
    paddingTop: Constants.statusBarHeight,
    backgroundColor: theme.colors.darkbackground,
  },  
});

const AppBar = () => {
  return <View style={styles.container}>
    <ScrollView horizontal>
      <AppBarTab text="Repositories" navigateTo="/" />
      <AppBarTab text="Sign In" navigateTo="/signIn" />
      <AppBarTab text="BMI" navigateTo="/bmiCalculator" />
    </ScrollView>
  </View>;
};

export default AppBar;
