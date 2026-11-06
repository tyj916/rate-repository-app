import { TextInput, Pressable, View, StyleSheet } from 'react-native';
import Text from './Text';
import { useFormik } from 'formik';
import { useState } from 'react';
import theme from '../theme';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.itemBackground,
    alignItems: "center",
    justifyContent: "center",
    gap: 16,
    padding: 16,
  },
  formContainer: {
    gap: 8,
  },
  button: {
    backgroundColor: theme.colors.primary,
    paddingVertical: 8,
    paddingHorizontal: 16,
  },
  input: {
    borderWidth: 1,
    borderColor: theme.colors.primary,
  },
});

const initialValues = {
  mass: '',
  height: '',
};

const getBodyMassIndex = (mass, height) => {
  return Math.round(mass / Math.pow(height, 2));
};

const BodyMassIndexForm = ({ onSubmit }) => {
  const formik = useFormik({
    initialValues,
    onSubmit,
  });

  return (
    <View style={styles.formContainer}>
      <TextInput
        placeholder="Weight (kg)"
        value={formik.values.mass}
        onChangeText={formik.handleChange('mass')}
        style={styles.input}
      />
      <TextInput
        placeholder="Height (m)"
        value={formik.values.height}
        onChangeText={formik.handleChange('height')}
        style={styles.input}
      />
      <Pressable onPress={formik.handleSubmit} style={styles.button}>
        <Text color="onDark">Calculate</Text>
      </Pressable>
    </View>
  );
};

const BodyMassIndexCalculator = () => {
  const [bmi, setBmi] = useState('');

  const onSubmit = values => {
    const mass = parseFloat(values.mass);
    const height = parseFloat(values.height);

    if (!isNaN(mass) && !isNaN(height) && height !== 0) {
      console.log(`Your body mass index is: ${getBodyMassIndex(mass, height)}`);
      setBmi(getBodyMassIndex(mass, height));
    }
  };

  return (
    <View style={styles.container}>
      <Text variant="subheading">BMI calculator</Text>
      <BodyMassIndexForm onSubmit={onSubmit} />
      {bmi && <Text>Your body mass index is: {bmi}</Text>}
    </View>
  );
};

export default BodyMassIndexCalculator;