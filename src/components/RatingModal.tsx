import {
  Modal,
  StyleSheet,
  Text,
  View,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import React from 'react';
import Icon from 'react-native-vector-icons/Ionicons';
import {BORDERRADIUS, FONTFAMILY, FONTSIZE, SPACING} from '../theme/theme';

interface RatingModalProps {
  visible: boolean;
  onClose: () => void;
}
const {height} = Dimensions.get('window');
const modalHeight = Math.min(height * 0.75, 500);
const RatingModal = ({visible, onClose}: RatingModalProps) => {
  return (
    <Modal
      animationType="fade"
      transparent
      visible={visible}
      onRequestClose={onClose}>
      <View style={styles.modalOverlay}>
        <View style={[styles.modalContent, {height: modalHeight}]}>
          <TouchableOpacity style={styles.closeBtn} onPress={onClose}>
            <Icon name="close" color={'#999'} size={30} />
          </TouchableOpacity>
          <View style={styles.topContainer}>
            <Text style={styles.title}>Do you like{'\n'}Pickup Lines ?</Text>

            <View style={styles.subTitleContainer}>
              <Text style={styles.subTitle}>
                We are working hard for a better user experience.
              </Text>
              <Text style={styles.subTitle}>
                We'd greatly appreciate if you can rate us
              </Text>
            </View>
          </View>

          <View style={styles.bottomContainer}>
            <View style={styles.starsRow}>
              {[1, 2, 3, 4, 5].map(index => (
                <TouchableOpacity key={index}>
                  <Icon
                    key={index}
                    name="star"
                    size={40}
                    color="#999"
                    style={{marginHorizontal: SPACING.space_18}}
                  />
                </TouchableOpacity>
              ))}
            </View>
            <View style={styles.arrowText}>
              <Text style={styles.subTitle}>The best we can get</Text>
              <Icon
                name="arrow-undo-outline"
                size={35}
                color={'#555'}
                style={styles.arrowIcon}
              />
            </View>
            <TouchableOpacity style={styles.rateBtn}>
              <Text style={styles.btnText}>Rate</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.4)',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: SPACING.space_8,
  },
  modalContent: {
    backgroundColor: '#fff',
    borderRadius: BORDERRADIUS.radius_10,
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: SPACING.space_32,
    width: '100%',
    overflow: 'hidden',
  },
  title: {
    fontSize: 22,
    marginBottom: SPACING.space_18,
    textAlign: 'center',
    letterSpacing: 1,
    fontFamily: FONTFAMILY.poppins_semibold,
    lineHeight: 28,
  },
  starsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
  },

  subTitle: {
    fontSize: 17,
    color: '#555',
    textAlign: 'center',
    fontFamily: FONTFAMILY.poppins_semibold,
    paddingHorizontal: SPACING.space_12,
    letterSpacing: 0.5,
  },
  subTitleContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: SPACING.space_30,
  },
  topContainer: {},
  bottomContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    gap: 40,
    width: '100%',
  },
  rateBtn: {
    backgroundColor: '#999',
    height: 50,
    width: '95%',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: BORDERRADIUS.radius_4,
    elevation: 5,
  },
  btnText: {
    color: '#eee',
    fontFamily: FONTFAMILY.poppins_semibold,
    fontSize: FONTSIZE.size_18,
  },
  arrowText: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  arrowIcon: {
    transform: [{rotate: '130deg'}],
  },
  closeBtn: {
    position: 'absolute',
    left: 0,
    marginLeft: SPACING.space_15,
    marginTop: SPACING.space_15,
    zIndex:1,
  },
});

export default RatingModal;
