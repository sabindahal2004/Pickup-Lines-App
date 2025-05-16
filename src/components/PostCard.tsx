import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Platform,
  AppState,
  Pressable,
} from 'react-native';
import React, {useRef, useState} from 'react';
import {BORDERRADIUS, FONTFAMILY, FONTSIZE, SPACING} from '../theme/theme';
import PostCardFooter from './PostCardFooter';
import Icon from 'react-native-vector-icons/Ionicons';
import {Post} from '../types/Post';
import ViewShot from 'react-native-view-shot';
import Toast from 'react-native-toast-message';
import {CameraRoll} from '@react-native-camera-roll/camera-roll';
import {PERMISSIONS, RESULTS, request} from 'react-native-permissions';
import Share from 'react-native-share';

const PostCard = ({item, navigation}: {item: Post; navigation: any}) => {
  const Colors = ['#000', 'purple', '#ff6b6b', '#6bc1ff', '#a1ff6b', '#f5a623'];
  const [colorIndex, setColorIndex] = useState(0);

  const handlePress = () => {
    setColorIndex(previousIndex => (previousIndex + 1) % Colors.length);
  };

  const viewShotRef = useRef<ViewShot>(null);

  const handleSave = async () => {
    try {
      // Prevent permission request if app is not active
      if (AppState.currentState !== 'active') {
        Toast.show({
          type: 'error',
          text1: 'App not ready',
          text2: 'Please wait and try again.',
          visibilityTime: 1500,
        });
        return;
      }
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
      console.log('Error sharing image', error);
      Toast.show({
        type: 'error',
        text1: 'Failed to share',
        text2: 'Try again or check permissions',
      });
    }
  };

  const handleEdit = () => {
    navigation.navigate('LineMaker',{pickupLine:item.pickup_line});
  };

  return (
    <View style={styles.PostContainer}>
      <View style={styles.CardWithFooter}>
        <ViewShot ref={viewShotRef}>
          <Pressable
            style={[styles.PostCard, {backgroundColor: Colors[colorIndex]}]}
            onPress={handlePress}>
            <View>
              <Text style={styles.PickupLine}>
                <Icon name="leaf-outline" size={FONTSIZE.size_24} />
                {'  '}
                {item.pickup_line}
              </Text>
            </View>
          </Pressable>
        </ViewShot>
        <TouchableOpacity style={styles.EditIconContainer} onPress={handleEdit}>
          <Icon name="brush-outline" size={FONTSIZE.size_20} />
        </TouchableOpacity>
        <PostCardFooter post={item} onSave={handleSave} onShare={handleShare} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  PostContainer: {},
  PostCard: {
    position: 'relative',
    backgroundColor: '#000',
    height: 390,
    paddingHorizontal: SPACING.space_30,
    overflow: 'hidden',
    justifyContent: 'center',
    alignItems: 'center',
    borderTopRightRadius: BORDERRADIUS.radius_10,
    borderTopLeftRadius: BORDERRADIUS.radius_10,
  },
  PickupLine: {
    fontFamily: FONTFAMILY.poppins_semibold,
    fontSize: FONTSIZE.size_24,
    color: '#fff',
    textAlign: 'center',
  },
  EditIconContainer: {
    position: 'absolute',
    right: 0,
    top: 0,
    marginRight: SPACING.space_15,
    marginTop: SPACING.space_15,
    backgroundColor: '#fff',
    padding: SPACING.space_8,
    borderRadius: BORDERRADIUS.radius_25,
  },
  CardWithFooter: {
    elevation: 4,
    borderRadius: BORDERRADIUS.radius_10,
    backgroundColor: 'white',
    position: 'relative',
  },
});

export default PostCard;
