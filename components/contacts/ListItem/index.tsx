// File: /Users/evanmccall/React-Projects/BetterPhone-App/components/Contacts/ListItem/index.tsx

import React, { Component } from "react";
import { View, TouchableHighlight, Animated, StyleSheet } from "react-native";
import PropTypes from "prop-types";
import { RectButton } from "react-native-gesture-handler";
import Swipeable from "react-native-gesture-handler/Swipeable";
import { ThemedView } from "@/components/ThemedComponents/ThemedView";
import { ThemedText } from "@/components/ThemedComponents/ThemedText";

// Define the prop types for the ListItem component
interface ListItemProps {
  leftElement?: React.ReactElement;
  title: string | React.ReactElement; // Allow title to be either a string or a React element
  description?: string | React.ReactElement; // Allow description to be either a string or a React element
  rightElement?: React.ReactElement;
  rightText?: string;
  onPress?: () => void;
  onDelete?: () => void;
  onLongPress?: () => void;
  disabled?: boolean;
}

class ListItem extends Component<ListItemProps> {
  private swipeableRow: Swipeable | null = null; // Reference to the swipeable row

  // Render the right action for swipeable
  renderRightAction = (iconName: string, color: string, x: number, progress: Animated.AnimatedInterpolation<number>) => {
    const trans = progress.interpolate({
      inputRange: [0, 1],
      outputRange: [x, 0]
    });

    const pressHandler = () => {
      const { onDelete } = this.props;
      if (onDelete) onDelete();
      this.close();
    };

    return (
      <Animated.View style={{ flex: 1, transform: [{ translateX: trans }] }}>
        <RectButton
          style={[styles.rightAction, { backgroundColor: color }]} // Apply background color dynamically
          onPress={pressHandler}
        >
          <ThemedText style={styles.rightActionText}>Delete</ThemedText>
        </RectButton>
      </Animated.View>
    );
  };

  // Render right actions for swipeable
  renderRightActions = (progress: Animated.AnimatedInterpolation<number>) => (
    <ThemedView style={styles.rightActionsContainer}>
      {this.renderRightAction("trash", "red", 64, progress)}
    </ThemedView>
  );

  updateRef = (ref: Swipeable) => {
    this.swipeableRow = ref;
  };

  close = () => {
    this.swipeableRow?.close(); // Safely close the swipeable row
  };

  render() {
    const {
      leftElement,
      title,
      description,
      rightElement,
      rightText,
      onPress,
      onLongPress,
      disabled
    } = this.props;

    const Component: React.ElementType = onPress || onLongPress ? TouchableHighlight : View;

    return (
      <Swipeable
        ref={this.updateRef}
        friction={1}
        renderRightActions={this.renderRightActions}
      >
        <Component
          onPress={onPress}
          onLongPress={onLongPress}
          disabled={disabled}
          underlayColor="#f2f3f5"
        >
          <ThemedView style={styles.container}>
            {leftElement ? (
              <ThemedView style={styles.leftElementContainer}>{leftElement}</ThemedView>
            ) : (
              <ThemedView />
            )}
            <ThemedView style={styles.mainContent}>
              <ThemedView style={styles.textContainer}>
                {/* Render title and description */}
                <ThemedText style={styles.titleText}>{typeof title === 'string' ? title : title}</ThemedText>
                {description ? (
                  <ThemedText style={styles.descriptionText}>{typeof description === 'string' ? description : description}</ThemedText>
                ) : (
                  <ThemedView />
                )}
              </ThemedView>
              <ThemedView style={styles.rightTextContainer}>
                {rightText ? <ThemedText>{rightText}</ThemedText> : <ThemedView />}
              </ThemedView>
              {rightElement ? (
                <ThemedView style={styles.rightElementContainer}>
                  {rightElement}
                </ThemedView>
              ) : (
                <ThemedView />
              )}
            </ThemedView>
          </ThemedView>
        </Component>
      </Swipeable>
    );
  }
}

// Styles
const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    height: 64,
    minHeight: 44,
  },
  leftElementContainer: {
    flex: 2,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 12,
  },
  mainContent: {
    flex: 20,
    marginLeft: 16,
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#d1d5db', // Tailwind gray-300
  },
  textContainer: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
  },
  titleText: {
    fontSize: 18, // Equivalent to text-lg
  },
  descriptionText: {
    fontSize: 14, // Equivalent to text-sm
    color: '#6b7280', // Tailwind gray-500
  },
  rightTextContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 8,
  },
  rightElementContainer: {
    flex: 0.4,
    alignItems: 'center',
    justifyContent: 'center',
  },
  rightActionsContainer: {
    flexDirection: 'row',
    width: 64,
  },
  rightAction: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  rightActionText: {
    color: 'white',
  },
});

export default ListItem;