import { View, Text, TextInput } from "react-native";
import React from "react";

export default function Search({ setSearchText, handleSearch }) {
  return (
    <View className="py-4">
      <TextInput
        placeholder="e.g chicken"
        className="bg-white mx-4 p-4 rounded-lg border border-[#939185] text-lg"
        onChangeText={(text) => setSearchText(text.toLowerCase())}
        onSubmitEditing={handleSearch}
      />
    </View>
  );
}
