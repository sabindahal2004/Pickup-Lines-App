import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {BORDERRADIUS, FONTFAMILY, FONTSIZE, SPACING} from '../theme/theme';
import Icon from 'react-native-vector-icons/Ionicons';

const PostCardFooter = () => {
  return (
    <View style={styles.PostCardFooterContainer}>
      <View style={styles.FooterIconContainer}>
        <TouchableOpacity>
          <Icon name="heart-outline" size={FONTSIZE.size_20} />
        </TouchableOpacity>
        <Text style={styles.FooterLabel}>Like</Text>
      </View>
      <View style={styles.FooterIconContainer}>
        <TouchableOpacity>
          <Icon name="save-outline" size={FONTSIZE.size_20} />
        </TouchableOpacity>
        <Text style={styles.FooterLabel}>Save</Text>
      </View>
      <View style={styles.FooterIconContainer}>
        <TouchableOpacity>
          <Icon name="copy-outline" size={FONTSIZE.size_20} />
        </TouchableOpacity>
        <Text style={styles.FooterLabel}>Copy</Text>
      </View>
      <View style={styles.FooterIconContainer}>
        <TouchableOpacity>
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
    fontFamily:FONTFAMILY.poppins_medium,
  },
});
