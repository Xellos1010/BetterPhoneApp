// ./components/ThemedButton.tsx

import React from 'react';
import { TouchableOpacity, Text, TouchableOpacityProps } from 'react-native';
import { useThemeColor } from '@/hooks/useThemeColor';

export type ThemedButtonProps = TouchableOpacityProps & {
  title: string;
};

export const ThemedButton: React.FC<ThemedButtonProps> = ({ title, onPress, style, ...rest }) => {
  const backgroundColor = useThemeColor({}, 'buttonBackground'); // Get background color from theme
  const textColor = useThemeColor({}, 'buttonText'); // Get text color from theme

  return (
    <TouchableOpacity
      onPress={onPress}
      style={[
        {
          backgroundColor,
          paddingVertical: 10, // Padding for the button
          paddingHorizontal: 16,
          borderRadius: 5,
        },
        style, // Merge with any custom styling passed in
      ]}
      {...rest} // Spread the rest of the props
    >
      <Text style={{ color: textColor, textAlign: 'center', fontWeight: 'bold' }}>{title}</Text>
    </TouchableOpacity>
  );
};