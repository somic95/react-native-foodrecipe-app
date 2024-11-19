import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Image,
  ActivityIndicator,
} from "react-native";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import HomeHeader from "../components/HomeHeader";
import Search from "../components/Search";

export default function Home({ navigation }) {
  const [categories, setCategories] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchText, setSearchText] = useState("");
  const [results, setResults] = useState();

  useEffect(() => {
    const getCategories = async () => {
      try {
        setIsLoading(true);

        const res = await fetch(
          "https://www.themealdb.com/api/json/v1/1/categories.php"
        );
        const data = await res.json();

        setCategories(data.categories);
        setIsLoading(false);
      } catch (error) {
        console.error(error);
      }
    };

    getCategories();
  }, []);

  const handleSearch = async () => {
    try {
      setIsLoading(true);

      const res = await fetch(
        `https://www.themealdb.com/api/json/v1/1/search.php?s=${searchText}`
      );
      const data = await res.json();

      setResults(data.meals);
      setIsLoading(false);
      setSearchText("");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <SafeAreaView className="bg-[#eeedeb] flex-1">
      <HomeHeader
        title="Foods Ingredient"
        onPress={() => navigation.goBack()}
      />
      <Search setSearchText={setSearchText} handleSearch={handleSearch} />
      <ScrollView showsVerticalScrollIndicator={false} className="p-4">
        {results ? (
          <View>
            {isLoading ? (
              <ActivityIndicator size="large" />
            ) : (
              results.map((result) => (
                <TouchableOpacity
                  key={result.idMeal}
                  className="bg-white border border-[#939185] rounded-lg p-4 mb-4"
                  onPress={() => navigation.navigate("Food", result)}
                >
                  <Image
                    source={{ uri: result.strMealThumb }}
                    className="w-full h-44 mb-4"
                  />
                  <Text className="text-[#E6B9A6] font-bold text-xl">
                    {result.strMeal}
                  </Text>
                </TouchableOpacity>
              ))
            )}
          </View>
        ) : (
          <View>
            {isLoading ? (
              <ActivityIndicator size="large" />
            ) : (
              categories.map((category) => (
                <TouchableOpacity
                  key={category.idCategory}
                  className="bg-white border border-[#939185] rounded-lg p-4 mb-4"
                  onPress={() => navigation.navigate("Foods", category)}
                >
                  <Image
                    source={{ uri: category.strCategoryThumb }}
                    className="w-full h-52"
                  />
                  <Text className="font-bold text-[#E6B9A6] text-2xl my-2">
                    {category.strCategory}
                  </Text>
                  <Text className="text-[#939185] text-sm leading-6">
                    {`${category.strCategoryDescription.substring(0, 72)}...`}
                  </Text>
                </TouchableOpacity>
              ))
            )}
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}
