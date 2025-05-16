import {StyleSheet, Text, View, TouchableOpacity, Platform} from 'react-native';
import React, {useRef, useState} from 'react';
import {SPACING, FONTFAMILY, FONTSIZE} from '../theme/theme';
import Icon from 'react-native-vector-icons/Ionicons';
import EditorTools from './EditorTools';
import ViewShot from 'react-native-view-shot';
import Share from 'react-native-share';
import Toast from 'react-native-toast-message';
import {CameraRoll} from '@react-native-camera-roll/camera-roll';
import {PERMISSIONS, RESULTS, request} from 'react-native-permissions';

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

  const Colors = ['#ddd', 'purple', '#ff6b6b', '#6bc1ff', '#a1ff6b', '#f5a623'];
  const [colorIndex, setColorIndex] = useState(0);

  const handleBgColor = () => {
    setColorIndex(previousIndex => (previousIndex + 1) % Colors.length);
  };

  const viewShotRef = useRef<ViewShot>(null);
  const handleShare = async () => {
    try {
      const uri = await viewShotRef.current?.capture?.();
      if (!uri) {
        throw new Error('Failed to capture image');
      }

      await Share.open({
        url: 'file://' + uri,
        type: 'image/jpeg',
        failOnCancel: false,
        message: 'Thank you for using Pickup Lines',
      });
    } catch (error) {
      Toast.show({
        type: 'error',
        text1: 'Failed to share',
        text2: 'Try again or check permissions',
        visibilityTime: 1500,
        position: 'bottom',
      });
    }
  };
  const handleSave = async () => {
    try {
      const uri = await viewShotRef.current?.capture?.();
      if (!uri) {
        throw new Error('Failed to capture image');
      }

      const permission =
        Platform.OS === 'android'
          ? PERMISSIONS.ANDROID.READ_MEDIA_IMAGES
          : PERMISSIONS.IOS.PHOTO_LIBRARY_ADD_ONLY;

      const result = await request(permission);

      if (result !== RESULTS.GRANTED) {
        Toast.show({
          type: 'error',
          text1: 'Permission denied',
          visibilityTime: 1500,
          position: 'bottom',
        });
        return;
      }

      await CameraRoll.saveAsset(uri);
      Toast.show({
        type: 'success',
        text1: 'Saved to gallery!',
        position: 'bottom',
        visibilityTime: 1500,
      });
    } catch (error) {
      Toast.show({
        type: 'error',
        text1: 'Save failed',
        text2: 'Check permissions or storage.',
        position: 'bottom',
        visibilityTime: 1500,
      });
    } finally {
      console.log('Save attempt finished.');
    }
  };
  return (
    <View style={styles.PostEditorContainer}>
      <View style={styles.header}>
        <TouchableOpacity onPress={handleBack} style={styles.backButton}>
          <Icon name="chevron-back-outline" size={24} color="#000" />
        </TouchableOpacity>
        <Text style={styles.title}>Pickup Line Maker</Text>
      </View>
      <ViewShot ref={viewShotRef}>
        <View style={[styles.PostCard, {backgroundColor:Colors[colorIndex]}]}>
          <View>
            <Text style={styles.PickupLine}>{pickupLine}</Text>
          </View>
          <View style={styles.Watermark}>
            <Text style={styles.Copyright}>&copy;</Text>
            <Text style={styles.WatermarkText}>Pickup Lines</Text>
          </View>
        </View>
      </ViewShot>
      <EditorTools onShare={handleShare} onSave={handleSave} onBgChange={handleBgColor} />
    </View>
  );
};

export default PickupLineMaker;

const styles = StyleSheet.create({
  PostEditorContainer: {},
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

