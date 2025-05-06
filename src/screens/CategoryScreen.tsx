import React from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import CategoryList from '../components/CategoryList';
import HeaderBar from '../components/HeaderBar';
import {StyleSheet} from 'react-native';

const CategoryScreen = ({navigation}: {navigation: any}) => {
  return (
    <SafeAreaView style={styles.container}>
      <HeaderBar navigation={navigation} />
      <CategoryList navigation={navigation} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex:1,
  },
});

export default CategoryScreen;
