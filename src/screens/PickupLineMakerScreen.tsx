import {StyleSheet} from 'react-native';
import React from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import PickupLineMaker from '../components/PickupLineMaker';
import { useRoute } from '@react-navigation/native';

const PickupLineMakerScreen = ({navigation}:{navigation:any}) => {
  const route = useRoute();
  const {pickupLine}:any = route.params;
  return (
    <SafeAreaView style={styles.Container}>
      <PickupLineMaker navigation={navigation} pickupLine={pickupLine} />
    </SafeAreaView>
  );
};

export default PickupLineMakerScreen;

const styles = StyleSheet.create({
  Container: {
    flex: 1,
  },
});
