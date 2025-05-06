import React from 'react';
import {StyleSheet, FlatList} from 'react-native';
import FavoritePostCard from './FavoritePostCard';
import {SPACING} from '../theme/theme';
import {Text, View, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import useLikedPostsStore from '../store/LikedPostStore';

const FavoritePostList = ({navigation}: {navigation: any}) => {

    const {likedPosts} = useLikedPostsStore();

  const handleBack = () => {
    navigation.goBack();
  };
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={handleBack} style={styles.backButton}>
          <Icon name="chevron-back-outline" size={24} color="#000" />
        </TouchableOpacity>
        <Text style={styles.title}>Favorite</Text>
      </View>

      {/* Post List */}
      <FlatList
        data={likedPosts}
        renderItem={({item}) => <FavoritePostCard item={item} />}
        keyExtractor={item => item.id.toString()}
        contentContainerStyle={styles.PostListContainer}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};

export default FavoritePostList;

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
