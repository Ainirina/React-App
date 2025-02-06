import { FlatList, Image, Text, View } from 'react-native';
import { SafeAreaView } from "react-native-safe-area-context";

const data = [
  { id: '1', name: 'Burger', price: '$5.99', image: 'https://example.com/burger.jpg' },
  { id: '2', name: 'Pizza', price: '$8.99', image: 'https://example.com/pizza.jpg' },
  { id: '3', name: 'Pasta', price: '$7.50', image: 'https://example.com/pasta.jpg' },
  // Ajouter d'autres éléments de menu ici
];

export default function HomeScreen() {
  return (
    <SafeAreaView className="bg-primary">
      <FlatList 
        data={data}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View className="flex-row mb-5 p-3 border-b border-gray-300">
            <Image 
              source={{ uri: item.image }} 
              className="w-20 h-20 mr-4"
              resizeMode="contain" 
            />
            <View className="flex-col justify-center">
              <Text className="text-lg font-semibold">{item.name}</Text>
              <Text className="text-green-500 text-sm">{item.price}</Text>
            </View>
          </View>
        )}
      />
    </SafeAreaView>
  );
}
