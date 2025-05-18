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
import WheelColorPicker from 'react-native-wheel-color-picker';

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

  const viewShotRef = useRef<ViewShot>(null);
  //Share
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
  //Save
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

  // Text Algin
  const AlignProperties = ['center', 'left', 'right'] as const;
  const [textAlignIndex, setTextAlignIndex] = useState(0);
  const handleTextAlign = () => {
    setTextAlignIndex(
      previousIndex => (previousIndex + 1) % AlignProperties.length,
    );
  };

  //Text Shadow
  const ShadowOptions = [
    {},
    {
      textShadowColor: '#888',
      textShadowOffset: {width: 1, height: -2},
      textShadowRadius: 4,
    },
    {
      textShadowColor: '#888',
      textShadowOffset: {width: 1, height: 2},
      textShadowRadius: 4,
    },
    {
      textShadowColor: '#888',
      textShadowOffset: {width: 1, height: 1},
      textShadowRadius: 4,
    },
  ];

  const [shadowIndex, setShadowIndex] = useState(0);
  const textShadowStyle = ShadowOptions[shadowIndex];
  const handleTextShadow = () => {
    setShadowIndex(previousIndex => (previousIndex + 1) % ShadowOptions.length);
  };

  // Text Styles
  const FontStyles = [
    {fontStyle: 'normal', fontWeight: 'normal'},
    {fontStyle: 'italic', fontWeight: 'normal'},
    {fontStyle: 'normal', fontWeight: 'bold'},
    {fontStyle: 'italic', fontWeight: 'bold'},
  ] as const;

  const [fontStyleIndex, setFontStyleIndex] = useState(0);
  const currentFontStyle = FontStyles[fontStyleIndex];

  const handleFontStyleChange = () => {
    setFontStyleIndex(prev => (prev + 1) % FontStyles.length);
  };

  //Wheel Text Color Picker
  const [textColor, setTextColor] = useState('#000');
  const [showColorPicker, setShowColorPicker] = useState(false);

  const handleTextColor = () => {
    setShowColorPicker(true);
  };

  // Wheel Background Color Picker
  const [bgColor, setBgColor] = useState('#ddd');
  const [showBgColorPicker, setShowBgColorPicker] = useState(false);

  const handleBgColor = () => {
    setShowBgColorPicker(true);
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
        <View style={[styles.PostCard, {backgroundColor: bgColor}]}>
          <View>
            <Text
              style={[
                styles.PickupLine,
                {textAlign: AlignProperties[textAlignIndex]},
                textShadowStyle,
                currentFontStyle,
                {color: textColor},
              ]}>
              {pickupLine}
            </Text>
          </View>
          <View style={styles.Watermark}>
            <Text style={styles.Copyright}>&copy;</Text>
            <Text style={styles.WatermarkText}>Pickup Lines</Text>
          </View>
        </View>
      </ViewShot>

      {/* Text Color Picker */}
      {showColorPicker && (
        <View style={styles.ColorPickerContainer}>
          <WheelColorPicker
            color={textColor}
            onColorChange={setTextColor}
            onColorChangeComplete={setTextColor}
          />
          <TouchableOpacity
            onPress={() => {
              setShowColorPicker(false);
              setTextColor(textColor);
            }}>
            <View style={styles.DoneContainer}>
              <Text style={styles.ColorPickerDoneText}>Done</Text>
              <Icon
                name="checkmark-done-outline"
                size={18}
                color={'#000'}
                style={styles.CheckmarkIcon}
              />
            </View>
          </TouchableOpacity>
        </View>
      )}

      {/* Background Color Picker */}
      {showBgColorPicker && (
        <View style={styles.ColorPickerContainer}>
          <WheelColorPicker
            color={bgColor}
            onColorChange={setBgColor}
            onColorChangeComplete={setBgColor}
          />
          <TouchableOpacity
            onPress={() => {
              setShowBgColorPicker(false);
              setBgColor(bgColor);
            }}>
            <View style={styles.DoneContainer}>
              <Text style={styles.ColorPickerDoneText}>Done</Text>
              <Icon
                name="checkmark-done-outline"
                size={18}
                color={'#000'}
                style={styles.CheckmarkIcon}
              />
            </View>
          </TouchableOpacity>
        </View>
      )}
      <EditorTools
        onShare={handleShare}
        onSave={handleSave}
        onTextAlign={handleTextAlign}
        onTextShadowChange={handleTextShadow}
        onTextStyleChange={handleFontStyleChange}
        onTextColorChange={handleTextColor}
        onBgColorChange={handleBgColor}
      />
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
    borderRadius: SPACING.space_10,
    marginHorizontal: SPACING.space_15,
    elevation: 2,
  },
  PickupLine: {
    fontFamily: FONTFAMILY.poppins_semibold,
    fontSize: FONTSIZE.size_24,
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
    marginLeft: '50%',
  },
  WatermarkText: {
    fontFamily: FONTFAMILY.poppins_semibold,
    fontSize: FONTSIZE.size_12,
    textShadowColor: '#bbb',
    textShadowRadius: 1,
    textShadowOffset: {width: -1, height: 1},
  },
  Copyright: {
    fontFamily: FONTFAMILY.poppins_semibold,
    fontSize: FONTSIZE.size_10,
    color: '#777',
    textShadowColor: '#bbb',
    textShadowRadius: 1,
    textShadowOffset: {width: -1, height: 1},
  },
  ColorPickerContainer: {
    height: '20%',
    alignSelf: 'center',
    justifyContent: 'center',
  },
  ColorPickerDoneText: {
    fontFamily: FONTFAMILY.poppins_semibold,
    fontSize: FONTSIZE.size_14,
    color:'purple',
    textTransform:'uppercase',
  },
  DoneContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingLeft: SPACING.space_10,
    gap: 2,
  },
  CheckmarkIcon: {
    fontFamily: FONTFAMILY.poppins_semibold,
    color:'purple',
  },
});
