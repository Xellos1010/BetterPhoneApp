// ./components/ThemedTextInput.tsx

import React from 'react';
import { TextInput, TextInputProps } from 'react-native';
import { useThemeColor } from '@/hooks/useThemeColor';

export type ThemedTextInputProps = TextInputProps & {
  placeholder?: string;
};

export const ThemedTextInput: React.FC<ThemedTextInputProps> = ({
  placeholder,
  ...rest
}) => {
  const textColor = useThemeColor({}, 'text'); // Text color from theme
  const borderColor = useThemeColor({}, 'border'); // Border color from theme

  return (
    <TextInput
      {...rest}
      placeholder={placeholder}
      placeholderTextColor={borderColor} // Use dynamic border color for placeholder
      style={[
        {
          borderWidth: 1,
          borderColor: borderColor,
          borderRadius: 8,
          padding: 10,
          color: textColor,
          // Use NativeWind utility classes in conjunction if needed
        },
        rest.style,
      ]}
    />
  );
};