import { View, StyleSheet, ScrollView } from 'react-native';
import Constants from 'expo-constants';
import theme from '../theme';
import AppBarTab from './AppBarTab';
import useMe from '../hooks/useMe';

const styles = StyleSheet.create({
  container: {
    paddingTop: Constants.statusBarHeight,
    backgroundColor: theme.colors.darkbackground,
  },  
});

const AppBar = () => {
  const { me } = useMe();

  return <View style={styles.container}>
    <ScrollView horizontal>
      <AppBarTab text="Repositories" navigateTo="/" />
      {!me && <AppBarTab text="Sign In" navigateTo="/signIn" />}
      {me && <AppBarTab text="Sign Out" navigateTo="/" />}
      <AppBarTab text="BMI" navigateTo="/bmiCalculator" />
    </ScrollView>
  </View>;
};

export default AppBar;
