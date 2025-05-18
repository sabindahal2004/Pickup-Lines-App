import {StyleSheet, Text, View, ScrollView, Pressable} from 'react-native';
import React from 'react';
import Icon from 'react-native-vector-icons/Ionicons';
import {FONTFAMILY, FONTSIZE, SPACING} from '../theme/theme';

const EditorTools = ({
  onShare,
  onSave,
  onTextAlign,
  onTextShadowChange,
  onTextStyleChange,
  onTextColorChange,
  onBgColorChange,
  onFontSizeChange,
}: {
  onShare: () => void;
  onSave: () => void;
  onTextAlign: () => void;
  onTextShadowChange: () => void;
  onTextStyleChange: () => void;
  onTextColorChange: () => void;
  onBgColorChange: () => void;
  onFontSizeChange: () => void;
}) => {
  return (
    <View style={styles.ToolsContainer}>
      <ScrollView
        style={styles.ToolRowOne}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.ScrollContainer}>
        <Pressable style={styles.Tools} onPress={onFontSizeChange}>
          <Icon name="expand-outline" size={SPACING.space_36} />
          <Text style={styles.ToolText}>Text Size</Text>
        </Pressable>
        <Pressable style={styles.Tools} onPress={onTextColorChange}>
          <Icon name="color-palette-outline" size={SPACING.space_36} />
          <Text style={styles.ToolText}>Text Color</Text>
        </Pressable>
        <Pressable style={styles.Tools}>
          <Icon name="text-outline" size={SPACING.space_36} />
          <Text style={styles.ToolText}>Fonts</Text>
        </Pressable>
        <Pressable style={styles.Tools} onPress={onTextAlign}>
          <Icon name="stats-chart-outline" size={SPACING.space_36} />
          <Text style={styles.ToolText}>Text Align</Text>
        </Pressable>
        <Pressable style={styles.Tools}>
          <Icon name="code-working-outline" size={SPACING.space_36} />
          <Text style={styles.ToolText}>Padding</Text>
        </Pressable>
        <Pressable style={styles.Tools} onPress={onTextStyleChange}>
          <Icon name="sparkles-outline" size={SPACING.space_36} />
          <Text style={styles.ToolText}>Text Style</Text>
        </Pressable>
        <Pressable style={styles.Tools} onPress={onTextShadowChange}>
          <Icon name="invert-mode-outline" size={SPACING.space_36} />
          <Text style={styles.ToolText}>Text Shadow</Text>
        </Pressable>
      </ScrollView>
      <ScrollView
        style={styles.ToolRowTwo}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.ScrollContainer}>
        <Pressable style={styles.Tools}>
          <Icon name="aperture-outline" size={SPACING.space_36} />
          <Text style={styles.ToolText}>Gradient</Text>
        </Pressable>
        <Pressable style={styles.Tools} onPress={onBgColorChange}>
          <Icon name="color-fill-outline" size={SPACING.space_36} />
          <Text style={styles.ToolText}>BG Color</Text>
        </Pressable>
        <Pressable style={styles.Tools}>
          <Icon name="image-outline" size={SPACING.space_36} />
          <Text style={styles.ToolText}>Image</Text>
        </Pressable>
        <Pressable style={styles.Tools}>
          <Icon name="contrast-outline" size={SPACING.space_36} />
          <Text style={styles.ToolText}>Opacity</Text>
        </Pressable>
        <Pressable style={styles.Tools} onPress={onSave}>
          <Icon name="save-outline" size={SPACING.space_36} />
          <Text style={styles.ToolText}>Save</Text>
        </Pressable>
        <Pressable style={styles.Tools} onPress={onShare}>
          <Icon name="share-social-outline" size={SPACING.space_36} />
          <Text style={styles.ToolText}>Share</Text>
        </Pressable>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  ScrollContainer: {
    paddingHorizontal: SPACING.space_36,
    gap: 34,
  },
  ToolsContainer: {
    marginTop: '48%',
    gap: SPACING.space_20,
  },
  ToolRowOne: {
    width: '100%',
  },
  ToolRowTwo: {
    width: '100%',
  },
  Tools: {
    alignItems: 'center',
  },
  ToolText: {
    fontFamily: FONTFAMILY.poppins_semibold,
    fontSize: FONTSIZE.size_10,
  },
});

export default EditorTools;
