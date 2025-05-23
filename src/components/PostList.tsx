import React from 'react';
import {StyleSheet, FlatList} from 'react-native';
import PostsData from '../data/PostsData';
import PostCard from './PostCard';
import {SPACING} from '../theme/theme';
import {Text, View, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

const PostList = ({
  navigation,
  category,
}: {
  navigation: any;
  category: string;
}) => {
  const handleBack = () => {
    navigation.goBack();
  };
  const filteredPosts = PostsData.filter(post => post.category.toLowerCase() === category.toLowerCase());
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={handleBack} style={styles.backButton}>
          <Icon name="chevron-back-outline" size={24} color="#000" />
        </TouchableOpacity>
        <Text style={styles.title}>{category}</Text>
      </View>

      {/* Post List */}
      <FlatList
        data={filteredPosts}
        renderItem={({item}) => <PostCard item={item} navigation={navigation} />}
        keyExtractor={item => item.id.toString()}
        contentContainerStyle={styles.PostListContainer}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};

export default PostList;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: SPACING.space_10,
    paddingHorizontal: SPACING.space_10,
    gap: SPACING.space_12,
    marginBottom:SPACING.space_10,
  },
  backButton: {
    paddingRight: 10,
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
  },
  PostListContainer: {
    gap: 20,
    padding: SPACING.space_10,
  },
});
