// BetterPhone-App/components/Contacts/SearchBar/index.js

import React, { Component } from "react";
import PropTypes from "prop-types";
import {
  View,
  TextInput,
  UIManager,
  LayoutAnimation,
  Animated,
  ActivityIndicator,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Text
} from "react-native";

class SearchBar extends Component {
  static propTypes = {
    searchPlaceholder: PropTypes.string,
    onClear: PropTypes.func,
    onFocus: PropTypes.func,
    onBlur: PropTypes.func,
    onChangeText: PropTypes.func
  };

  static defaultProps = {
    searchPlaceholder: "Search",
    onClear: () => null,
    onFocus: () => null,
    onBlur: () => null,
    onChangeText: () => null
  };

  constructor(props) {
    super(props);
    this.state = {
      hasFocus: false,
      isEmpty: true,
      showLoader: false
    };
  }

  focus = () => {
    this.input.focus();
  };

  blur = () => {
    this.input.blur();
  };

  clear = () => {
    this.input.clear();
    this.onChangeText("");
    this.props.onClear();
  };

  cancel = () => {
    this.blur();
  };

  onFocus = () => {
    this.props.onFocus();
    if (UIManager.configureNextLayoutAnimation) LayoutAnimation.easeInEaseOut();
    this.setState({
      hasFocus: true
    });
  };

  onBlur = () => {
    this.props.onBlur();
    if (UIManager.configureNextLayoutAnimation) LayoutAnimation.easeInEaseOut();
    this.setState({
      hasFocus: false
    });
  };

  onChangeText = text => {
    this.props.onChangeText(text);
    this.setState({ isEmpty: text === "" });
  };

  render() {
    const { searchPlaceholder, style } = this.props;
    const { hasFocus, isEmpty, showLoader } = this.state;

    return (
      <TouchableWithoutFeedback onPress={this.focus} style={style}>
        <Animated.View className="flex-row items-center h-10 rounded bg-gray-300 mx-2 mb-1 mt-1">
          <View className="h-7 justify-center items-center ml-2">
            <Text>🔍</Text>
          </View>
          <TextInput
            onFocus={this.onFocus}
            onBlur={this.onBlur}
            onChangeText={this.onChangeText}
            placeholder={searchPlaceholder}
            className={`flex-1 h-10 text-sm ml-1 ${hasFocus ? 'flex-1' : ''}`}
            placeholderTextColor="#515151"
            autoCorrect={false}
            ref={ref => {
              this.input = ref;
            }}
          />
          <View className="flex-row">
            {hasFocus && showLoader ? (
              <ActivityIndicator color="#515151" />
            ) : (
              <View />
            )}
            {hasFocus && !isEmpty ? (
              <TouchableOpacity onPress={this.clear}>
                <View className="h-7 justify-center items-center mr-2">
                  <Text>ⅹ</Text>
                </View>
              </TouchableOpacity>
            ) : (
              <View />
            )}
          </View>
        </Animated.View>
      </TouchableWithoutFeedback>
    );
  }
}

export default SearchBar;