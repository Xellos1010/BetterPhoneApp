// Relative path: src/components/ContactView.tsx
import { View, Text, Pressable } from "react-native";

interface ContactViewProps {
  text: string;
  onPress: (contact: string) => void;
  showBorder?: boolean;
}

const ContactView: React.FC<ContactViewProps> = (props) => {
  return (
    <Pressable onPress={() => props.onPress(props.text)}>
      <View className="bg-transparent pl-4 pt-1">
        <Text className="text-black text-lg">{props.text}</Text>
      </View>
      {props.showBorder && <View className="border-b border-lightgray" />}
    </Pressable>
  );
};

export default ContactView;