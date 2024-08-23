// ./constants/Colors.ts

const tintColorLight = '#0a7ea4';
const tintColorDark = '#fff';

export const Colors = {
  light: {
    text: '#11181C',
    background: '#fff',
    tint: tintColorLight,
    icon: '#687076',
    tabIconDefault: '#687076',
    tabIconSelected: tintColorLight,
    border: '#ddd', // Border color for light mode
    buttonBackground: '#0a7ea4', // Light Button Background Color
    buttonText: '#fff', // Light Button Text Color
  },
  dark: {
    text: '#ECEDEE',
    background: '#151718',
    tint: tintColorDark,
    icon: '#9BA1A6',
    tabIconDefault: '#9BA1A6',
    tabIconSelected: tintColorDark,
    border: '#444', // Border color for dark mode
    buttonBackground: '#444', // Dark Button Background Color
    buttonText: '#fff', // Dark Button Text Color
  },
};