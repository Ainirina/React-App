import { useEffect, useState } from "react";
import { FlatList, Image, Text, View, ActivityIndicator } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function HomeScreen() {
  const [recettes, setRecettes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("https://symfony-app-production.up.railway.app/recettes") 
      .then((response) => response.json())
      .then((data) => {
        setRecettes(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Erreur lors de la récupération des recettes:", error);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <SafeAreaView className="bg-primary flex-1 justify-center items-center">
        <ActivityIndicator size="large" color="#ffffff" />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView className="bg-primary">
      <FlatList 
        data={recettes}
        keyExtractor={(item) => item.id.toString()} // Assurez-vous que `id` est un nombre ou une chaîne
        renderItem={({ item }) => (
          <View className="flex-row mb-5 p-3 border-b border-gray-300">
            <Image 
              source={{ uri: `data:image/jpeg;base64,${item.photo}` }} 
              className="w-20 h-20 mr-4"
              resizeMode="contain" 
            />
            <View className="flex-col justify-center">
              <Text className="text-lg font-semibold">{item.nom}</Text>
              <Text className="text-green-500 text-sm">{item.prix}</Text>
              <Text className="text-green-500 text-sm">{item.tempsCuisson}</Text>
            </View>
          </View>
        )}
      />
    </SafeAreaView>
  );
}
