import { FlatList, StyleSheet } from 'react-native';
import React from 'react';
import CategoriesData from '../data/CategoriesData';
import CategoryCard from './CategoryCard';
import { BORDERRADIUS, SPACING } from '../theme/theme';

const CategoryList = ({ navigation }: { navigation: any }) => {
  return (
    <FlatList
      data={CategoriesData}
      renderItem={({ item }) => (
        <CategoryCard item={item} navigation={navigation} />
      )}
      keyExtractor={item => item.name}
      contentContainerStyle={styles.CategoryListContainer}
      showsVerticalScrollIndicator={false}
    />
  );
};

export default CategoryList;

const styles = StyleSheet.create({
  CategoryListContainer: {
    gap: BORDERRADIUS.radius_10,
    padding: SPACING.space_10,
  },
});
