import React from 'react';
import {StyleSheet} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import PostList from '../components/PostList';
import { useRoute } from '@react-navigation/native';

const PostScreen = ({navigation}: {navigation: any}) => {
  const route = useRoute();
  const {category} = route.params;
  return (
    <SafeAreaView style={styles.Container}>
      <PostList navigation={navigation} category={category} />
    </SafeAreaView>
  );
};

export default PostScreen;
const styles = StyleSheet.create({
  Container: {
    flex: 1,
  },
});
