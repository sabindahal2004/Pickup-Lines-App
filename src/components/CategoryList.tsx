import {FlatList, StyleSheet, View} from 'react-native';
import React from 'react';
import CategoriesData from '../data/CategoriesData';
import CategoryCard from './CategoryCard';
import {SPACING} from '../theme/theme';

const ItemSeparator = () => <View style={{height: SPACING.space_10}} />;

const CategoryList = ({navigation}: {navigation: any}) => {
  return (
    <FlatList
      data={CategoriesData}
      renderItem={({item}) => (
        <CategoryCard item={item} navigation={navigation} />
      )}
      keyExtractor={item => item.name}
      contentContainerStyle={[styles.CategoryListContainer]}
      ItemSeparatorComponent={ItemSeparator}
      showsVerticalScrollIndicator={false}
    />
  );
};

export default CategoryList;

const styles = StyleSheet.create({
  CategoryListContainer: {
    paddingTop: SPACING.space_10,
    paddingHorizontal: SPACING.space_10,
  },
});
