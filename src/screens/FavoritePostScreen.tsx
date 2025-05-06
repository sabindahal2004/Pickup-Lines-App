import React from 'react';
import {StyleSheet} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import FavoritePostList from '../components/FavoritePostList';

const FavoritePostScreen = ({navigation}: {navigation: any}) => {
  return (
    <SafeAreaView style={styles.Container}>
      <FavoritePostList navigation={navigation}/>
    </SafeAreaView>
  );
};

export default FavoritePostScreen;
const styles = StyleSheet.create({
  Container: {
    flex: 1,
  },
});
