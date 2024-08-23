// Relative path: src/components/AlphabetView.tsx
import React from "react";
import { View, Text } from "react-native";

interface AlphabetViewProps {
  text: string;
  width: number;
  height: number;
}

const AlphabetView: React.FC<AlphabetViewProps> = ({ text }) => {
  return (
    <View className="items-center bg-transparent">
      <Text className="text-blue-600">{text}</Text>
    </View>
  );
};

export default AlphabetView;