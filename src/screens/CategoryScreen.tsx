import {StyleSheet} from 'react-native';
import React from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import CategoryList from '../components/CategoryList';
import Header from '../components/Header';

const CategoryScreen = ({navigation}:{navigation:any}) => {
  return (
    <SafeAreaView>
      <Header />
      <CategoryList navigation={navigation} />
    </SafeAreaView>
  );
};

export default CategoryScreen;

const styles = StyleSheet.create({});
