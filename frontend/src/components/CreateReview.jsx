import { View, TextInput, Pressable } from "react-native";
import Text from "./Text";
import { useFormik } from "formik";
import * as yup from 'yup';
import { useNavigate } from "react-router-native";
import { useMutation } from "@apollo/client/react";
import { CREATE_REVIEW } from "../graphql/mutations";
import styles, { fieldWithError } from "../utils/formStyles";

const initialValues = {
  ownerName: '',
  repositoryName: '',
  rating: null,
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
    <View style={styles.formContainer}>
      <View style={styles.inputContainer}>
        <TextInput 
          placeholder='Repository owner name'
          value={formik.values.ownerName}
          onChangeText={formik.handleChange('ownerName')}
          onBlur={formik.handleBlur('ownerName')}
          style={ownerNameHasError ? fieldWithError : styles.textInput}
        />
        {ownerNameHasError && (
          <Text style={styles.errorText}>{formik.errors.ownerName}</Text>
        )}
      </View>
      <View style={styles.inputContainer}>
        <TextInput 
          placeholder='Repository name'
          value={formik.values.repositoryName}
          onChangeText={formik.handleChange('repositoryName')}
          onBlur={formik.handleBlur('repositoryName')}
          style={repositoryNameHasError ? fieldWithError : styles.textInput}
        />
        {repositoryNameHasError && (
          <Text style={styles.errorText}>{formik.errors.repositoryName}</Text>
        )}
      </View>
      <View style={styles.inputContainer}>
        <TextInput 
          placeholder='Rating between 0 and 100'
          value={formik.values.rating}
          onChangeText={formik.handleChange('rating')}
          onBlur={formik.handleBlur('rating')}
          inputMode='numeric'
          style={ratingHasError ? fieldWithError : styles.textInput}
        />
        {ratingHasError && (
          <Text style={styles.errorText}>{formik.errors.rating}</Text>
        )}
      </View>
      <View style={styles.inputContainer}>
        <TextInput 
          placeholder='Review'
          value={formik.values.review}
          onChangeText={formik.handleChange('review')}
          onBlur={formik.handleBlur('review')}
          multiline
          style={reviewHasError ? fieldWithError : styles.textInput}
        />
        {reviewHasError && (
          <Text style={styles.errorText}>{formik.errors.review}</Text>
        )}
      </View>
      <Pressable onPress={formik.handleSubmit}>
        <Text style={styles.submitButton}>Create a review</Text>
      </Pressable>
    </View>
  );
};

const CreateReview = () => {
  const navigate = useNavigate();
  const [mutation, result] = useMutation(CREATE_REVIEW);

  const createReview = async (review) => {
    try {
      const { data } = await mutation({
        variables: { review }
      });
  
      return data;
    } catch (e) {
      console.error(e);
    }
  };

  const onSubmit = async ({ ownerName, repositoryName, rating, review }) => {
    try {
      const data = await createReview({ 
        ownerName, 
        repositoryName, 
        rating: parseInt(rating), 
        text: review 
      });
      navigate(`/repositories/${data.createReview.repositoryId}`);
    } catch (e) {
      console.error(e);
    };
  };
  
  return <ReviewForm onSubmit={onSubmit} />
};

export default CreateReview;
