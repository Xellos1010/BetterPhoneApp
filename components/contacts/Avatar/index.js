// BetterPhone-App/components/Contacts/Avatar/index.js

import React, { Component } from "react";
import { Image, View, Text, StyleSheet } from "react-native";
import PropTypes from "prop-types";

class Avatar extends Component {
  static propTypes = {
    img: PropTypes.oneOfType([
      PropTypes.number,
      PropTypes.shape({ uri: PropTypes.string })
    ]),
    placeholder: PropTypes.string,
    width: PropTypes.number.isRequired,
    height: PropTypes.number.isRequired,
    roundedImage: PropTypes.bool,
    roundedPlaceholder: PropTypes.bool,
    style: PropTypes.oneOfType([
      PropTypes.object,
      PropTypes.array,
    ]),
  };

  static defaultProps = {
    roundedImage: true,
    roundedPlaceholder: true,
    style: {}, // Default to empty object for custom style prop
  };

  renderImage = () => {
    const { img, width, height, roundedImage } = this.props;

    return (
      <View style={[
        styles.imageContainer,
        roundedImage && styles.rounded,
      ]}>
        <Image source={img} style={{ width, height }} />
      </View>
    );
  };

  renderPlaceholder = () => {
    const { placeholder, width, height, roundedPlaceholder } = this.props;

    return (
      <View style={[
        styles.placeholderContainer,
        roundedPlaceholder && styles.rounded,
        { width, height }
      ]}>
        <Text
          adjustsFontSizeToFit
          numberOfLines={1}
          minimumFontScale={0.01}
          style={[styles.placeholderText, { fontSize: Math.round(width / 2) }]} // Dynamically set font size based on width
        >
          {placeholder}
        </Text>
      </View>
    );
  };

  render() {
    const { img, width, height, style } = this.props;

    return (
      <View style={[styles.container, style, { width, height }]}>
        {img ? this.renderImage() : this.renderPlaceholder()}
      </View>
    );
  }
}

// Stylesheet
const styles = StyleSheet.create({
  container: {
    width: '100%',
  },
  imageContainer: {
    overflow: 'hidden',
    justifyContent: 'center',
    height: '100%',
  },
  placeholderContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#D1D5DB', // Gray-300 equivalent in Tailwind
  },
  placeholderText: {
    color: 'white',
    fontWeight: 'bold',
  },
  rounded: {
    borderRadius: 9999, // For full rounding, use a large border radius
  },
});

export default Avatar;