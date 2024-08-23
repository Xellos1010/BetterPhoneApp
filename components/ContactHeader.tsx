// Relative path: src/components/ContactHeader.tsx
import { View, Text } from "react-native";

interface ContactHeaderProps {
  text: string;
}

const ContactHeader: React.FC<ContactHeaderProps> = ({ text }) => {
  return (
    <View className="bg-lightgray pl-4">
      <Text className="text-2xl font-bold text-black">{text}</Text>
    </View>
  );
};

export default ContactHeader;