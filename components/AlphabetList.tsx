// Relative path: src/components/AlphabetList.tsx

import React from 'react';
import { SafeAreaView, Text, View } from 'react-native';
import { AlphabetList as RNAlphabetList, IData } from 'react-native-section-alphabet-list';

export interface DataItem extends IData {
  key: string; // unique identifier
  value: string; // the display value
}

interface AlphabetListProps {
  data: Array<DataItem>; // Adjusted to reflect the new data form
}

const AlphabetList: React.FC<AlphabetListProps> = ({ data }) => {
  
  const renderListItem = (item: DataItem) => {
    return (
      <View className="flex-1 h-12 px-4 justify-center border-t border-gray-300">
        <Text className="text-gray-800 text-base">{item.value}</Text>
      </View>
    );
  };

  const renderSectionHeader = (section: any) => {
    return (
      <View className="h-10 bg-gray-800 justify-center px-4">
        <Text className="text-white">{section.title}</Text>
      </View>
    );
  };

  const renderCustomListHeader = () => {
    return (
      <View className="h-16 flex-row items-center justify-center">
        <Text>List Header</Text>
      </View>
    );
  };

  return (
    <SafeAreaView className="flex-1 bg-gray-100">
      <RNAlphabetList
        className="flex-1"
        data={data}
        renderCustomItem={renderListItem}
        renderCustomSectionHeader={renderSectionHeader}
        renderCustomListHeader={renderCustomListHeader}
        getItemHeight={() => 50} // Adjust this value as needed
        sectionHeaderHeight={40}  // Adjust this value as needed
        listHeaderHeight={60}     // Adjust this value as needed
        indexLetterStyle={{
          color: '#007AFF' // Example inline style
        }}
      />
    </SafeAreaView>
  );
};

export default AlphabetList;