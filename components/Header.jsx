import { View, Text } from "react-native";
import React from "react";
import { Entypo } from "@expo/vector-icons";

export default function Header({ title, navigation }) {
  return (
    <View className="bg-[#e6b9a6] p-4 flex-row items-center gap-x-8">
      <Entypo
        name="chevron-left"
        size={28}
        color="#2f3654"
        onPress={() => navigation.goBack()}
      />
      <Text className="text-[#2f3654] font-bold text-center text-lg">
        {title}
      </Text>
    </View>
  );
}
