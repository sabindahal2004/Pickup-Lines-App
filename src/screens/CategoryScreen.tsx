import React from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import CategoryList from '../components/CategoryList';
import HeaderBar from '../components/HeaderBar';

const CategoryScreen = ({navigation}: {navigation: any}) => {
  return (
    <SafeAreaView>
      <HeaderBar />
      <CategoryList navigation={navigation} />
    </SafeAreaView>
  );
};

export default CategoryScreen;
