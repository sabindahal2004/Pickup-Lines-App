import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import React from 'react';
import {SPACING, FONTFAMILY, FONTSIZE} from '../theme/theme';
import Icon from 'react-native-vector-icons/Ionicons';

const PickupLineMaker = ({
  navigation,
  pickupLine,
}: {
  navigation: any;
  pickupLine: string;
}) => {
  const handleBack = () => {
    navigation.goBack();
  };
  return (
    <View style={styles.PostContainer}>
      <View style={styles.header}>
        <TouchableOpacity onPress={handleBack} style={styles.backButton}>
          <Icon name="chevron-back-outline" size={24} color="#000" />
        </TouchableOpacity>
        <Text style={styles.title}>Pickup Line Maker</Text>
      </View>
      <View style={styles.PostCard}>
        <View>
          <Text style={styles.PickupLine}>{pickupLine}</Text>
        </View>
        <View style={styles.Watermark}>
          <Text style={styles.Copyright}>&copy;</Text>
          <Text style={styles.WatermarkText}>Pickup Lines</Text>
        </View>
      </View>
    </View>
  );
};

export default PickupLineMaker;

const styles = StyleSheet.create({
  PostContainer: {},
  PostCard: {
    backgroundColor: '#ddd',
    height: 390,
    paddingHorizontal: SPACING.space_30,
    overflow: 'hidden',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: SPACING.space_10,
    marginHorizontal: SPACING.space_15,
    elevation: 2,
  },
  PickupLine: {
    fontFamily: FONTFAMILY.poppins_semibold,
    fontSize: FONTSIZE.size_24,
    color: '#000',
    textAlign: 'center',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: SPACING.space_10,
    paddingHorizontal: SPACING.space_10,
    gap: SPACING.space_12,
    marginBottom: 80,
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
  },
  backButton: {
    paddingRight: 10,
  },
  Watermark: {
    position: 'absolute',
    bottom: 0,
    paddingBottom: SPACING.space_10,
    display: 'flex',
    flexDirection: 'row',
    gap: 1,
  },
  WatermarkText: {
    fontFamily: FONTFAMILY.poppins_semibold,
    fontSize: FONTSIZE.size_12,
  },
  Copyright: {
    fontFamily: FONTFAMILY.poppins_semibold,
    fontSize: FONTSIZE.size_10,
    color: '#777',
  },
});
