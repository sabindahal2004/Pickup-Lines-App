import React from 'react';
import {StyleSheet, FlatList} from 'react-native';
import PostsData from '../data/PostsData';
import PostCard from './PostCard';
import { SPACING } from '../theme/theme';

const PostList = ({navigation}: {navigation: any}) => {
  return (
    <FlatList
      data={PostsData}
      renderItem={({item}) => <PostCard item={item} navigation={navigation} />}
      keyExtractor={item => item.id.toString()}
      contentContainerStyle={styles.PostListContainer}
      showsVerticalScrollIndicator={false}
    />
  );
};

export default PostList;

const styles = StyleSheet.create({
  PostListContainer: {
    gap:30,
    padding:SPACING.space_10,
  },
});
