import { View, Text, Image, FlatList, RefreshControl, TouchableOpacity } from 'react-native';
import { useLocalSearchParams, router } from 'expo-router'; // Ajoutez `router` ici
import PlateCard from '@/components/PlateCard';
import React, { useState } from 'react';
import { SafeAreaView } from "react-native-safe-area-context";
import SearchInput from '@/components/SearchInput';
import images from '@/constants/images';
import EmptyState from '@/components/EmptyState'; // Assurez-vous d'avoir ce composant
import icons from '@/constants/icons';

const data = [
  { id: '1', name: 'Burger', price: '$5.99', image: 'https://example.com/burger.jpg' },
  { id: '2', name: 'Pizza', price: '$8.99', image: 'https://example.com/pizza.jpg' },
  { id: '3', name: 'Pasta', price: '$7.50', image: 'https://example.com/pasta.jpg' },
  { id: '4', name: 'Sushi', price: '$12.00', image: 'https://example.com/sushi.jpg' },
  { id: '5', name: 'Tacos', price: '$4.99', image: 'https://example.com/tacos.jpg' },
  { id: '6', name: 'Vary', price: '$7.99', image: 'https://example.com/Vary.jpg' },
];

const Search = () => {
  const { query } = useLocalSearchParams();
  const [refreshing, setRefreshing] = useState(false);

  // Filtrer les plats en fonction de la recherche
  const filteredData = data.filter((item) =>
    item.name.toLowerCase().includes(query.toLowerCase())
  );

  const onRefresh = async () => {
    setRefreshing(true);
    // Simuler un rechargement des données
    setRefreshing(false);
  };

  const handleBack = async () => {
    try {
      router.push("/home"); // Rediriger vers la page d'accueil
    } catch (error) {
      console.error("Retour Home", error);
    }
  };

  return (
    <SafeAreaView className="bg-primary h-full">
      <View className="flex my-6 px-4 space-y-6">
        <View className="flex justify-between items-start flex-row mb-6">
          <View>
          <TouchableOpacity onPress={handleBack} className="mt-1.5">
              <Text className="text-white text-lg">← Retour</Text>
            </TouchableOpacity>
            <Text className="text-2xl mt-5 font-psemibold text-white">
              Résultats pour "{query}"
            </Text>
          </View>

         
        </View>

        <SearchInput initialQuery={query} onSearch={undefined} />

        <View className="w-full flex-1 pt-5 pb-8">
          <Text className="text-lg font-pregular text-gray-100 mb-3">
            Nouveau plats
          </Text>
        </View>
      </View>

      <FlatList
        data={filteredData}
        keyExtractor={(item) => item.id}
        numColumns={2}
        contentContainerStyle={{ paddingBottom: 20, paddingHorizontal: 10 }}
        columnWrapperStyle={{ justifyContent: 'space-between' }}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => (
          <PlateCard item={item} />
        )}
        ListEmptyComponent={() => (
          <EmptyState
            title="Aucun plat trouvé"
            subtitle="Aucun plat ne correspond à votre recherche."
          />
        )}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      />
    </SafeAreaView>
  );
};

export default Search;