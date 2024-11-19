import { View, Text } from "react-native";
import React from "react";

export default function HomeHeader({ title }) {
  return (
    <View className="bg-[#E6B9A6] p-4 flex-row items-center justify-center gap-x-8">
      <Text className="text-[#2F3645] font-bold text-center text-xl">
        {title}
      </Text>
    </View>
  );
}
