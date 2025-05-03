import {Image, StyleSheet, Text, View, Pressable} from 'react-native';
import React from 'react';
import {BORDERRADIUS, FONTFAMILY, FONTSIZE, SPACING} from '../theme/theme';

interface CategoryItem {
  name: string;
  color: string;
  iconLink: any;
}

const CategoryCard = ({
  item,
  navigation,
}: {
  item: CategoryItem;
  navigation: any;
}) => {
  return (
      <Pressable
        onPress={() => navigation.navigate('Posts',{category:item.name})}
        style={[styles.CategoryCard, {backgroundColor: item.color}]}>
        <Text style={styles.CategoryTitle}>{item.name}</Text>
        <View style={styles.CategoryIconContainer}>
          <Image source={item.iconLink} style={styles.CategoryIcon} />
        </View>
      </Pressable>
  );
};

const styles = StyleSheet.create({
  CategoryCard: {
    height: 120,
    width: '100%',
    borderRadius: BORDERRADIUS.radius_4,
    paddingHorizontal: SPACING.space_16,
    elevation: 4,
    overflow: 'hidden',
  },
  CategoryIcon: {
    width: 70,
    height: 70,
    tintColor: '#fff',
  },
  CategoryTitle: {
    fontSize: FONTSIZE.size_20,
    fontFamily: FONTFAMILY.poppins_semibold,
    color: '#fff',
    position: 'absolute',
    top: 0,
    paddingTop: SPACING.space_16,
    paddingLeft: SPACING.space_16,
  },
  CategoryIconContainer: {
    position: 'absolute',
    right: 0,
    bottom: 0,
    paddingBottom: SPACING.space_16,
    paddingRight: SPACING.space_16,
  },
});

export default CategoryCard;
