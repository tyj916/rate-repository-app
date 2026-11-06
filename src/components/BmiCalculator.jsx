import { TextInput, Pressable, View, StyleSheet } from 'react-native';
import Text from './Text';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { useState } from 'react';
import theme from '../theme';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.itemBackground,
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
    alignItems: "center"
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

const validationSchema = yup.object().shape({
  mass: yup
    .number()
    .min(1, 'Weight must be greater or equal to 1')
    .required('Weight is required'),
  height: yup
    .number()
    .min(0.5, 'Height must be greater or equal to 0.5')
    .required('Height is requried'),
});

const BodyMassIndexForm = ({ onSubmit }) => {
  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit,
  });

  return (
    <View style={styles.formContainer}>
      <TextInput
        placeholder="Weight (kg)"
        value={formik.values.mass}
        onChangeText={formik.handleChange('mass')}
        onBlur={formik.handleBlur('mass')}
        style={styles.input}
      />
      {formik.touched.mass && formik.errors.mass && (
        <Text style={{ color: "red" }}>{formik.errors.mass}</Text>
      )}
      <TextInput
        placeholder="Height (m)"
        value={formik.values.height}
        onChangeText={formik.handleChange('height')}
        onBlur={formik.handleBlur('height')}
        style={styles.input}
      />
      {formik.touched.height && formik.errors.height && (
        <Text style={{ color: "red" }}>{formik.errors.height}</Text>
      )}
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