import { View, StyleSheet, ScrollView } from 'react-native';
import Constants from 'expo-constants';
import theme from '../theme';
import AppBarTab from './AppBarTab';
import useMe from '../hooks/useMe';
import SignOut from './SignOut';

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
      {!me && <>
        <AppBarTab text="Sign In" navigateTo="/signIn" />
        <AppBarTab text="Sign Up" navigateTo="/signUp" />
      </>}
      {me && <>
        <AppBarTab text="Create a review" navigateTo="/createReview" />
        <AppBarTab text="My reviews" navigateTo="/myReviews" />
        <SignOut />
      </>}
      <AppBarTab text="BMI" navigateTo="/bmiCalculator" />
    </ScrollView>
  </View>;
};

export default AppBar;
