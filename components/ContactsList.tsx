// Relative path: src/components/ContactsList.tsx
import React from "react";
import { SectionList, View } from "react-native";
import AlphabetList, { DataItem } from "./AlphabetList";
import ContactView from "./ContactView";
import ContactHeader from "./ContactHeader";

interface ContactsListProps {
  data: Array<DataItem>; // Adjusted to hold DataItem[]
}

const ContactsList: React.FC<ContactsListProps> = (props) => {
  const { data } = props;

  const didSelectContact = (contact: string) => {
    console.log(contact);
  };

  const onSelectAlphabet = (alphabet: string) => {
    // Implement scrolling logic if needed
  };

  return (
    <View className="flex-1 flex-col bg-white">
      {/* Pass correctly formatted data to AlphabetList */}
      <AlphabetList
        data={data}
      />
      
      {/* <SectionList
        sections={data}
        keyExtractor={(item) => item.key} // Use item.key for the unique key
        renderItem={({ item }) => (
          <ContactView text={item.value} onPress={didSelectContact} />
        )}
        renderSectionHeader={({ section: { title } }) => (
          <ContactHeader text={title} />
        )}
        showsVerticalScrollIndicator={false}
      /> */}
    </View>
  );
};

export default ContactsList;