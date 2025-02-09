import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, RefreshControl, TouchableOpacity, ActivityIndicator } from 'react-native';
import { useLocalSearchParams, router } from 'expo-router';
import { SafeAreaView } from "react-native-safe-area-context";
import SearchInput from '@/components/SearchInput';
import PlateCard from '@/components/PlateCard';
import EmptyState from '@/components/EmptyState';

const Search = () => {
  const { query } = useLocalSearchParams();
  const [recettes, setRecettes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  // Récupérer les recettes depuis l'API
  const fetchRecettes = async () => {
    setLoading(true);
    try {
      const response = await fetch("https://symfony-app-production.up.railway.app/recettes");
      const data = await response.json();
      setRecettes(data);
    } catch (error) {
      console.error("Erreur lors de la récupération des recettes:", error);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchRecettes();
  }, []);

  // Fonction de rafraîchissement
  const onRefresh = async () => {
    setRefreshing(true);
    await fetchRecettes();
    setRefreshing(false);
  };

  // Filtrer les recettes en fonction de la recherche
  const filteredData = recettes.filter((item) =>
    item.nom.toLowerCase().includes(query.toLowerCase())
  );

  // Retour à la page d'accueil
  const handleBack = () => {
    router.push("/home");
  };

  return (
    <SafeAreaView className="bg-primary h-full">
      <View className="flex my-6 px-4 space-y-6">
        <View className="flex justify-between items-start flex-row mb-6">
          <TouchableOpacity onPress={handleBack} className="mt-1.5">
            <Text className="text-white text-lg">← Retour</Text>
          </TouchableOpacity>
          <Text className="text-2xl mt-5 font-psemibold text-white">
            Résultats pour "{query}"
          </Text>
        </View>

        <SearchInput initialQuery={query} onSearch={undefined} />

        <View className="w-full flex-1 pt-5 pb-8">
          <Text className="text-lg font-pregular text-gray-100 mb-3">
            Résultats trouvés
          </Text>
        </View>
      </View>

      {loading ? (
        <ActivityIndicator size="large" color="#0ED700" />
      ) : (
        <FlatList
          data={filteredData}
          keyExtractor={(item) => item.id.toString()}
          numColumns={2}
          contentContainerStyle={{ paddingBottom: 20, paddingHorizontal: 10 }}
          columnWrapperStyle={{ justifyContent: 'space-between' }}
          showsVerticalScrollIndicator={false}
          renderItem={({ item }) => (
            <PlateCard 
              item={{ 
                id: item.id,
                name: `${item.nom} ( c: ${item.tempsCuisson} min )`,  
                price: `${item.prix} Ar`, 
                image: `data:image/jpeg;base64,${item.photo}`
              }}
            />
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
      )}
    </SafeAreaView>
  );
};

export default Search;
