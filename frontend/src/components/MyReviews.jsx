import { View, FlatList } from "react-native";
import Text from "./Text";
import useMe from "../hooks/useMe";
import ReviewItem from "./ReviewItem";

const ItemSeparator = () => <View style={{ height: 10 }} />;

const MyReviews = () => {
  const { me, loading } = useMe({ includeReviews: true });

  if (loading) {
    return <Text>Loading...</Text>
  }

  const reviews = me.reviews.edges.map(edge => edge.node);

  return (
    <FlatList 
      data={reviews}
      renderItem={({item}) => <ReviewItem review={item} />}
      ItemSeparatorComponent={<ItemSeparator />}
    />
  );
};

export default MyReviews;
