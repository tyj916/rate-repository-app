import { View, TextInput, Pressable } from "react-native";
import Text from "./Text";
import { useFormik } from "formik";
import * as yup from 'yup';

const initialValues = {
  ownerName: '',
  repositoryName: '',
  rating: 0,
  review: '',
};

const validationSchema = yup.object().shape({
  ownerName: yup
    .string()
    .required("Repository owner's username is a required string"),
  repositoryName: yup
    .string()
    .required("Repository's name is a required string"),
  rating: yup
    .number()
    .min(0, 'Rating cannot be lower than 0')
    .max(100, 'Rating must not exceed 100')
    .required('Rating is a required number between 0 and 100'),
  review: yup
    .string()
});

const ReviewForm = ({ onSubmit }) => {
  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit,
  });

  const ownerNameHasError = formik.touched.ownerName && formik.errors.ownerName;
  const repositoryNameHasError = formik.touched.repositoryName && formik.errors.repositoryName;
  const ratingHasError = formik.touched.rating && formik.errors.rating;
  const reviewHasError = formik.touched.review && formik.errors.review;

  return (
    <View>
      <TextInput 
        placeholder='Repository owner name'
        value={formik.values.ownerName}
        onChangeText={formik.handleChange('ownerName')}
        onBlur={formik.handleBlur('ownerName')}
      />
      {ownerNameHasError && (
        <Text>{formik.errors.ownerName}</Text>
      )}
      <TextInput 
        placeholder='Repository name'
        value={formik.values.repositoryName}
        onChangeText={formik.handleChange('repositoryName')}
        onBlur={formik.handleBlur('repositoryName')}
      />
      {repositoryNameHasError && (
        <Text>{formik.errors.repositoryName}</Text>
      )}
      <TextInput 
        placeholder='Rating between 0 and 100'
        value={formik.values.rating}
        onChangeText={formik.handleChange('rating')}
        onBlur={formik.handleBlur('rating')}
        inputMode='numeric'
      />
      {ratingHasError && (
        <Text>{formik.errors.rating}</Text>
      )}
      <TextInput 
        placeholder='Review'
        value={formik.values.review}
        onChangeText={formik.handleChange('review')}
        onBlur={formik.handleBlur('review')}
      />
      {reviewHasError && (
        <Text>{formik.errors.review}</Text>
      )}
      <Pressable onPress={formik.handleSubmit}>
        <Text>Create a review</Text>
      </Pressable>
    </View>
  );
};

const CreateReview = () => {
  const onSubmit = values => {
    console.log(values.ownerName);
    console.log(values.repositoryName);
    console.log(values.rating);
    console.log(values.review);
  };
  
  return <ReviewForm onSubmit={onSubmit} />
};

export default CreateReview;
