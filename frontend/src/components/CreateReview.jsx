import { View, Pressable } from "react-native";
import Text from "./Text";
import { useFormik } from "formik";
import * as yup from 'yup';
import { useNavigate } from "react-router-native";
import { useMutation } from "@apollo/client/react";
import { CREATE_REVIEW } from "../graphql/mutations";
import styles from "../utils/formStyles";
import FormikTextInput from "./FormikTextInput";
import useMe from "../hooks/useMe";

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

  return (
    <View style={styles.formContainer}>
      <FormikTextInput 
        formik={formik}
        name="ownerName"
        placeholder="Repository owner name"
      />
      <FormikTextInput 
        formik={formik}
        name="repositoryName"
        placeholder="Repository name"
      />
      <FormikTextInput 
        formik={formik}
        name="rating"
        placeholder="Rating"
        inputMode="numeric"
      />
      <FormikTextInput 
        formik={formik}
        name="review"
        placeholder="Review"
      />
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
