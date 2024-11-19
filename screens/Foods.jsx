import {
  View,
  Text,
  ScrollView,
  Image,
  ActivityIndicator,
  TouchableOpacity,
} from "react-native";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import Header from "../components/Header";

export default function Foods({ navigation, route }) {
  const [meals, setMeals] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const getMeals = async () => {
      try {
        setIsLoading(true);

        const res = await fetch(
          `https://www.themealdb.com/api/json/v1/1/filter.php?i=${route.params.strCategory}`
        );
        const data = await res.json();

        setMeals(data.meals);
        setIsLoading(false);
      } catch (error) {
        console.error(error);
      }
    };

    getMeals();
  }, []);

  return (
    <SafeAreaView>
      <Header title={route.params.strCategory} navigation={navigation} />
      <ScrollView className="p-4">
        <Image
          source={{ uri: route.params.strCategoryThumb }}
          className="w-full h-52"
        />
        <Text className="text-4xl font-bold text-[#e6b9a6] my-6">
          {route.params.strCategory}
        </Text>
        <Text className="text-[#939185] text-sm leading-5">
          {route.params.strCategoryDescription}
        </Text>
        <View className="mt-8">
          {isLoading ? (
            <ActivityIndicator size="large" />
          ) : (
            meals.map((meal) => (
              <TouchableOpacity
                key={meal.idMeal}
                className="border border-[#939185] p-4 rounded-lg mb-4"
                onPress={() => navigation.navigate("Food", meal)}
              >
                <Image
                  source={{ uri: meal.strMealThumb }}
                  className="w-full h-52 object-cover"
                />
                <Text className="text-xl font-bold text-[#e6b9a6] mt-2">
                  {meal.strMeal}
                </Text>
              </TouchableOpacity>
            ))
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
