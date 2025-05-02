import React from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import {FONTFAMILY, FONTSIZE, SPACING} from '../theme/theme';
import Icon from 'react-native-vector-icons/Ionicons';

const Header = () => {
  return (
    <View style={styles.HeaderContainer}>
      {/* Left Menu Icon */}
      <TouchableOpacity style={styles.IconContainer}>
        <Icon name="menu-outline" size={30} />
      </TouchableOpacity>

      {/* Center Title */}
      <Text style={styles.HeaderTitle}>Pickup Lines</Text>

      {/* Right Icon */}
      <View style={styles.RightIconContainer}>
        <TouchableOpacity style={styles.IconContainer}>
          <Icon name="star-outline" size={30} color={'orange'} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.IconContainer}>
          <Icon name="diamond-outline" size={30} color={'orange'} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  HeaderContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: SPACING.space_20,
    paddingVertical: SPACING.space_10,
  },
  HeaderTitle: {
    fontFamily: FONTFAMILY.poppins_semibold,
    fontSize: FONTSIZE.size_20,
    color: '#000000',
  },
  IconContainer: {
    paddingVertical: SPACING.space_8,
  },
  iconStyle: {
    width: 24,
    height: 24,
    tintColor: '#000000',
  },
  RightIconContainer: {
    flexDirection: 'row',
    gap: 20,
  },
});

export default Header;
