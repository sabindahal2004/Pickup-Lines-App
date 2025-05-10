import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {useState, useEffect} from 'react';
import {BORDERRADIUS, FONTFAMILY, FONTSIZE, SPACING} from '../theme/theme';
import Icon from 'react-native-vector-icons/Ionicons';
import Clipboard from '@react-native-clipboard/clipboard';
import Toast from 'react-native-toast-message';
import useLikedPostsStore from '../store/LikedPostStore';
import {Post} from '../types/Post';

const PostCardFooter = ({
  post,
  onSave,
  onShare,
}: {
  post: Post;
  onSave: () => void;
  onShare: () => void;
}) => {
  const [liked, setLiked] = useState(false);
  const {likedPosts, addLikedPost, removeLikedPost} = useLikedPostsStore();

  useEffect(() => {
    const isLiked = likedPosts.some(p => p.id === post.id);
    setLiked(isLiked);
  }, [likedPosts, post.id]);

  // Handle Copy Function
  const handleCopy = () => {
    Clipboard.setString(post.pickup_line);
    Toast.show({
      type: 'success',
      text1: 'Copied!',
      position: 'bottom',
      visibilityTime: 1500,
    });
  };

  // Handle Like Function
  const handleLike = () => {
    if (liked) {
      removeLikedPost(post.id);
    } else {
      addLikedPost({
        id: post.id,
        pickup_line: post.pickup_line,
        category: post.category,
      });
    }
    setLiked(!liked);
  };

  return (
    <View style={styles.PostCardFooterContainer}>
      <View style={styles.FooterIconContainer}>
        <TouchableOpacity onPress={handleLike}>
          <Icon
            name={liked ? 'heart' : 'heart-outline'}
            size={FONTSIZE.size_20}
            color={liked ? 'red' : '#000'}
          />
        </TouchableOpacity>
        <Text style={styles.FooterLabel}>Like</Text>
      </View>

      <View style={styles.FooterIconContainer}>
        <TouchableOpacity onPress={onSave}>
          <Icon name="save-outline" size={FONTSIZE.size_20} />
        </TouchableOpacity>
        <Text style={styles.FooterLabel}>Save</Text>
      </View>

      <View style={styles.FooterIconContainer}>
        <TouchableOpacity onPress={handleCopy}>
          <Icon name="copy-outline" size={FONTSIZE.size_20} />
        </TouchableOpacity>
        <Text style={styles.FooterLabel}>Copy</Text>
      </View>

      <View style={styles.FooterIconContainer}>
        <TouchableOpacity onPress={onShare}>
          <Icon name="share-outline" size={FONTSIZE.size_20} />
        </TouchableOpacity>
        <Text style={styles.FooterLabel}>Share</Text>
      </View>
    </View>
  );
};

export default PostCardFooter;

const styles = StyleSheet.create({
  PostCardFooterContainer: {
    height: 50,
    width: '100%',
    borderBottomLeftRadius: BORDERRADIUS.radius_10,
    borderBottomRightRadius: BORDERRADIUS.radius_10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: SPACING.space_18,
  },
  FooterIconContainer: {
    flexDirection: 'row',
    gap: SPACING.space_8,
  },
  FooterLabel: {
    color: '#000',
    fontFamily: FONTFAMILY.poppins_medium,
  },
});
