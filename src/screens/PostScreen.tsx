import React from 'react';
import {StyleSheet} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import PostList from '../components/PostList';

const PostScreen = ({navigation}: {navigation: any}) => {
  return (
    <SafeAreaView style={styles.Container}>
      <PostList navigation={navigation} />
    </SafeAreaView>
  );
};

export default PostScreen;
const styles = StyleSheet.create({
  Container: {
    flex: 1,
  },
});
