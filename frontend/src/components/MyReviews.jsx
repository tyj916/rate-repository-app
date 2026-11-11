import { View } from "react-native";
import Text from "./Text";
import useMe from "../hooks/useMe";

const MyReviews = () => {
  const { me, loading } = useMe({ includeReviews: true });

  if (loading) {
    return <Text>Loading...</Text>
  }

  const reviews = me.reviews.edges.map(edge => edge.node);

  console.log(reviews);

  return (
    <View>
      <Text>My Reviews</Text>
    </View>
  );
};

export default MyReviews;
