import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import React from 'react';
import {BORDERRADIUS, FONTFAMILY, FONTSIZE, SPACING} from '../theme/theme';
import PostCardFooter from './PostCardFooter';
import Icon from 'react-native-vector-icons/Ionicons';
import { Post } from '../types/Post';

const PostCard = ({item}: {item: Post}) => {
  return (
    <View style={styles.PostContainer}>
      <View style={styles.CardWithFooter}>
        <View style={styles.PostCard}>
          <TouchableOpacity style={styles.EditIconContainer}>
            <Icon name="brush-outline" size={FONTSIZE.size_20} />
          </TouchableOpacity>
          <View>
            <Text style={styles.PickupLine}>
              <Icon name="leaf-outline" size={FONTSIZE.size_24} />
              {'  '}
              {item.pickup_line}
            </Text>
          </View>
        </View>
        <PostCardFooter post={item} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  PostContainer: {},
  PostCard: {
    position: 'relative',
    backgroundColor: '#000',
    height: 390,
    paddingHorizontal: SPACING.space_30,
    overflow: 'hidden',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    borderTopRightRadius: BORDERRADIUS.radius_10,
    borderTopLeftRadius: BORDERRADIUS.radius_10,
  },
  PickupLine: {
    fontFamily: FONTFAMILY.poppins_semibold,
    fontSize: FONTSIZE.size_24,
    color: '#fff',
    textAlign: 'center',
  },
  EditIconContainer: {
    position: 'absolute',
    right: 0,
    top: 0,
    marginRight: SPACING.space_15,
    marginTop: SPACING.space_15,
    backgroundColor: '#fff',
    padding: SPACING.space_8,
    borderRadius: BORDERRADIUS.radius_25,
  },
  CardWithFooter: {
    elevation: 4,
    borderRadius: BORDERRADIUS.radius_10,
    backgroundColor: 'white',
  },
});

export default PostCard;
