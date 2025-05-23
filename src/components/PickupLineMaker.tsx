import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Platform,
  Pressable,
  TextInput,
  ImageBackground,
} from 'react-native';
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
import Slider from '@react-native-community/slider';
import LinearGradient from 'react-native-linear-gradient';
import ImagePicker from 'react-native-image-crop-picker';

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

  // Font Size Slider
  const [fontSizeRange, setFontSizeRange] = useState(24);
  const [showFontSlider, setShowFontSlider] = useState(false);

  const handleFontSize = () => {
    setShowFontSlider(true);
  };

  // Padding Slider
  const [leftPadding, setLeftPadding] = useState(30);
  const [rightPadding, setRightPadding] = useState(30);
  const [topPadding, setTopPadding] = useState(0);
  const [bottomPadding, setBottomPadding] = useState(0);

  const [showPaddingSlider, setShowPaddingSlider] = useState(false);

  const handleTextPadding = () => {
    setShowPaddingSlider(true);
  };

  // Text Transform
  const TextTransform = [
    'none',
    'uppercase',
    'lowercase',
    'capitalize',
  ] as const;
  const [textTransformIndex, setTextTransformIndex] = useState(0);

  const handleTextTransform = () => {
    setTextTransformIndex(
      previousIndex => (previousIndex + 1) % TextTransform.length,
    );
  };

  // Background Opacity Slider
  const [bgOpacity, setBgOpacity] = useState(1);
  const [showOpacitySlider, setShowOpacitySlider] = useState(false);

  const handleBgOpactiy = () => {
    setShowOpacitySlider(true);
  };

  // Editable Content
  const [isEditing, setIsEditing] = useState(false);
  const [editableText, setEditableText] = useState(pickupLine);

  // Gradient Color Picker
  const [showGradientPicker, setShowGradientPicker] = useState(false);
  const [startGradientColor, setStartGradientColor] = useState('#ddd');
  const [endGradientColor, setEndGradientColor] = useState('#ddd');
  const [showGradientFirstPicker, setShowGradientFirstPicker] = useState(false);
  const [showGradientSecondPicker, setShowGradientSecondPicker] =
    useState(false);

  const handleGradientPicker = () => {
    setShowGradientPicker(true);
    setBgImageUri(null);
  };

  // Image Picker
  const [bgImageUri, setBgImageUri] = useState<string | null>(null);
  const chooseBgImage = () => {
    ImagePicker.openPicker({
      width: 300,
      height: 400,
      cropping: true,
    }).then(image => {
      console.log(image);
      setBgImageUri(image.path);
    });
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
        {bgImageUri ? (
          <ImageBackground
            style={styles.PostCard}
            resizeMode="cover"
            source={bgImageUri ? {uri: bgImageUri} : undefined}>
            <Pressable onPress={() => setIsEditing(true)}>
              {isEditing ? (
                <TextInput
                  selectionColor={'purple'}
                  style={[
                    styles.PickupLine,
                    {
                      textAlign: AlignProperties[textAlignIndex],
                      color: textColor,
                      fontSize: fontSizeRange,
                      paddingLeft: leftPadding,
                      paddingRight: rightPadding,
                      paddingTop: topPadding,
                      paddingBottom: bottomPadding,
                      textTransform: TextTransform[textTransformIndex],
                    },
                    textShadowStyle,
                    currentFontStyle,
                  ]}
                  value={editableText}
                  onChangeText={setEditableText}
                  multiline
                  autoFocus
                  onBlur={() => setIsEditing(false)}
                />
              ) : (
                <Text
                  style={[
                    styles.PickupLine,
                    {
                      textAlign: AlignProperties[textAlignIndex],
                      color: textColor,
                      fontSize: fontSizeRange,
                      paddingLeft: leftPadding,
                      paddingRight: rightPadding,
                      paddingTop: topPadding,
                      paddingBottom: bottomPadding,
                      textTransform: TextTransform[textTransformIndex],
                    },
                    textShadowStyle,
                    currentFontStyle,
                  ]}>
                  {editableText}
                </Text>
              )}
            </Pressable>

            <View style={styles.Watermark}>
              <Text style={styles.Copyright}>&copy;</Text>
              <Text style={styles.WatermarkText}>Pickup Lines</Text>
            </View>
          </ImageBackground>
        ) : (
          <LinearGradient
            colors={[startGradientColor, endGradientColor]}
            style={[styles.PostCard]}>
            <Pressable onPress={() => setIsEditing(true)}>
              {isEditing ? (
                <TextInput
                  selectionColor={'purple'}
                  style={[
                    styles.PickupLine,
                    {
                      textAlign: AlignProperties[textAlignIndex],
                      color: textColor,
                      fontSize: fontSizeRange,
                      paddingLeft: leftPadding,
                      paddingRight: rightPadding,
                      paddingTop: topPadding,
                      paddingBottom: bottomPadding,
                      textTransform: TextTransform[textTransformIndex],
                    },
                    textShadowStyle,
                    currentFontStyle,
                  ]}
                  value={editableText}
                  onChangeText={setEditableText}
                  multiline
                  autoFocus
                  onBlur={() => setIsEditing(false)}
                />
              ) : (
                <Text
                  style={[
                    styles.PickupLine,
                    {
                      textAlign: AlignProperties[textAlignIndex],
                      color: textColor,
                      fontSize: fontSizeRange,
                      paddingLeft: leftPadding,
                      paddingRight: rightPadding,
                      paddingTop: topPadding,
                      paddingBottom: bottomPadding,
                      textTransform: TextTransform[textTransformIndex],
                    },
                    textShadowStyle,
                    currentFontStyle,
                  ]}>
                  {editableText}
                </Text>
              )}
            </Pressable>

            <View style={styles.Watermark}>
              <Text style={styles.Copyright}>&copy;</Text>
              <Text style={styles.WatermarkText}>Pickup Lines</Text>
            </View>
          </LinearGradient>
        )}
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

      {/* Font Size Slider */}
      {showFontSlider && (
        <View style={styles.TextSizeSlider}>
          <Text style={styles.TextSizeTitle}>Text Size</Text>
          <Slider
            style={{width: '100%', height: '40%'}}
            onValueChange={setFontSizeRange}
            minimumValue={18}
            maximumValue={100}
            step={1}
            minimumTrackTintColor="purple"
            thumbTintColor="purple"
            value={fontSizeRange}
          />
          <TouchableOpacity
            style={styles.DoneBtn}
            onPress={() => setShowFontSlider(false)}>
            <Text style={styles.DoneBtnText}>done</Text>
          </TouchableOpacity>
        </View>
      )}

      {/* Padding Slider */}
      {showPaddingSlider && (
        <View style={styles.PaddingContainer}>
          <Text style={styles.PaddingTextTitle}>Padding</Text>
          <View style={styles.SliderContainer}>
            <View style={styles.HorizontalPadding}>
              {/* Left Padding Slider */}
              <Slider
                style={styles.Slider}
                onValueChange={setLeftPadding}
                minimumValue={10}
                maximumValue={50}
                step={1}
                minimumTrackTintColor="purple"
                thumbTintColor="purple"
                value={leftPadding}
              />
              {/* Right Padding Slider */}
              <Slider
                style={styles.Slider}
                onValueChange={setRightPadding}
                minimumValue={10}
                maximumValue={50}
                step={1}
                minimumTrackTintColor="purple"
                thumbTintColor="purple"
                value={rightPadding}
              />
            </View>

            <View style={styles.HorizontalPadding}>
              {/* Top Padding Slider */}
              <Slider
                style={styles.Slider}
                onValueChange={setTopPadding}
                minimumValue={-10}
                maximumValue={50}
                step={1}
                minimumTrackTintColor="purple"
                thumbTintColor="purple"
                value={topPadding}
              />
              {/* Bottom Padding Slider */}
              <Slider
                style={styles.Slider}
                onValueChange={setBottomPadding}
                minimumValue={-10}
                maximumValue={50}
                step={1}
                minimumTrackTintColor="purple"
                thumbTintColor="purple"
                value={bottomPadding}
              />
            </View>
          </View>
          <TouchableOpacity
            style={styles.DoneBtn}
            onPress={() => setShowPaddingSlider(false)}>
            <Text style={styles.DoneBtnText}>done</Text>
          </TouchableOpacity>
        </View>
      )}

      {/* Bg Opacity Slider */}
      {showOpacitySlider && (
        <View style={styles.OpacitySliderContainer}>
          <Text style={styles.TextSizeTitle}>Image Opacity</Text>
          <Slider
            style={styles.OpacitySlider}
            onValueChange={setBgOpacity}
            minimumValue={0.1}
            maximumValue={1}
            thumbTintColor="purple"
            value={bgOpacity}
            minimumTrackTintColor="purple"
          />
          <TouchableOpacity
            style={styles.DoneBtn}
            onPress={() => setShowOpacitySlider(false)}>
            <Text style={styles.DoneBtnText}>done</Text>
          </TouchableOpacity>
        </View>
      )}

      {/* Gradient Color Picker */}
      {showGradientPicker && (
        <View style={styles.GradientColorPickerContainer}>
          <Text style={styles.PaddingTextTitle}>Gradient</Text>
          <View style={styles.GradientBtnContainer}>
            <Pressable
              style={styles.FirstColorBtn}
              onPress={() => {
                setShowGradientFirstPicker(true);
                setShowGradientPicker(false);
              }}>
              <Text style={styles.BtnText}>First Color</Text>
            </Pressable>

            <Pressable
              style={styles.SecondColorBtn}
              onPress={() => {
                setShowGradientSecondPicker(true);
                setShowGradientPicker(false);
              }}>
              <Text style={styles.BtnText}>Second Color</Text>
            </Pressable>
          </View>
          <TouchableOpacity
            style={styles.DoneBtn}
            onPress={() => setShowGradientPicker(false)}>
            <Text style={styles.DoneBtnText}>done</Text>
          </TouchableOpacity>
        </View>
      )}

      {/* First Gradient Color */}
      {showGradientFirstPicker && (
        <View style={styles.ColorPickerContainer}>
          <WheelColorPicker
            color={bgColor}
            onColorChange={setStartGradientColor}
            onColorChangeComplete={setStartGradientColor}
          />
          <TouchableOpacity
            onPress={() => {
              setShowGradientFirstPicker(false);
              setShowGradientPicker(true);
              setStartGradientColor(startGradientColor);
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

      {/* Second Gradient COlor */}
      {showGradientSecondPicker && (
        <View style={styles.ColorPickerContainer}>
          <WheelColorPicker
            color={bgColor}
            onColorChange={setEndGradientColor}
            onColorChangeComplete={setEndGradientColor}
          />
          <TouchableOpacity
            onPress={() => {
              setShowGradientSecondPicker(false);
              setShowGradientPicker(true);
              setEndGradientColor(endGradientColor);
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
        onFontSizeChange={handleFontSize}
        onPaddingChange={handleTextPadding}
        onTextTransform={handleTextTransform}
        onBgOpacityChange={handleBgOpactiy}
        onGradientColorChange={handleGradientPicker}
        onChooseBgImage={chooseBgImage}
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
    overflow: 'hidden',
    justifyContent: 'center',
    borderRadius: SPACING.space_10,
    marginHorizontal: SPACING.space_15,
    elevation: 2,
  },
  PickupLine: {
    fontFamily: FONTFAMILY.poppins_semibold,
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
    left: '50%',
    transform: [{translateX: -50}],
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
    width: '92%',
  },
  ColorPickerDoneText: {
    fontFamily: FONTFAMILY.poppins_semibold,
    fontSize: FONTSIZE.size_14,
    color: 'white',
    textTransform: 'uppercase',
  },
  DoneContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingLeft: SPACING.space_10,
    gap: 2,
    backgroundColor: 'purple',
    elevation: 2,
  },
  CheckmarkIcon: {
    fontFamily: FONTFAMILY.poppins_semibold,
    color: 'white',
  },
  TextSizeSlider: {
    height: '20%',
    width: '100%',
    paddingHorizontal: SPACING.space_8,
    marginTop: '43%',
  },
  DoneBtn: {
    backgroundColor: 'purple',
    elevation: 2,
  },
  DoneBtnText: {
    color: '#fff',
    textTransform: 'uppercase',
    fontFamily: FONTFAMILY.poppins_semibold,
    fontSize: FONTSIZE.size_20,
    textAlign: 'center',
    paddingVertical: SPACING.space_8,
  },
  TextSizeTitle: {
    fontFamily: FONTFAMILY.poppins_semibold,
    fontSize: FONTSIZE.size_16,
    textAlign: 'center',
  },
  PaddingContainer: {
    height: '40%',
    width: '100%',
    paddingHorizontal: SPACING.space_8,
    marginTop: '40%',
  },
  SliderContainer: {},
  PaddingTextTitle: {
    fontFamily: FONTFAMILY.poppins_semibold,
    fontSize: FONTSIZE.size_16,
    textAlign: 'center',
    marginBottom: SPACING.space_10,
  },
  Slider: {
    width: '50%',
    height: 50,
  },
  HorizontalPadding: {
    flexDirection: 'row',
  },
  OpacitySliderContainer: {
    height: '20%',
    width: '100%',
    paddingHorizontal: SPACING.space_8,
    marginTop: '43%',
  },
  OpacitySlider: {
    width: '100%',
    height: '40%',
  },
  GradientBtnContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingVertical: 20,
  },
  FirstColorBtn: {
    backgroundColor: 'purple',
    paddingVertical: SPACING.space_16,
    paddingHorizontal: SPACING.space_28,
    elevation: 3,
  },
  SecondColorBtn: {
    backgroundColor: 'purple',
    paddingVertical: SPACING.space_16,
    paddingHorizontal: SPACING.space_18,
    elevation: 3,
  },
  BtnText: {
    fontFamily: FONTFAMILY.poppins_semibold,
    fontSize: FONTSIZE.size_16,
    color: '#fff',
  },
  GradientColorPickerContainer: {
    height: '20%',
    width: '100%',
    paddingHorizontal: SPACING.space_8,
    marginTop: '40%',
  },
});
