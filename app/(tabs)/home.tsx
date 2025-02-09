
import { images } from '@/constants';
import React, {  useEffect, useState } from 'react';
import { FlatList, Image, Text, View, TouchableOpacity, RefreshControl,ActivityIndicator } from 'react-native';

import { SafeAreaView } from "react-native-safe-area-context";
import SearchInput from '@/components/SearchInput';
import PlateCard from '@/components/PlateCard';


export default function HomeScreen() {
  const [recettes, setRecettes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
          
  const onRefresh = async () => {
    setRefreshing(true);
  
    setRefreshing(false);
  };

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
    <SafeAreaView className="bg-primary h-full">
 <View className="flex my-6 px-4 space-y-6">
            
            <View className="flex justify-between items-start flex-row mb-6">
              <View>
                <Text className="font-pmedium text-sm text-gray-100">
                  Bienvenue !
                </Text>
                <Text className="text-2xl mt-5 font-psemibold text-white">
                  Tiffany
                </Text>
              </View>

              <View className="mt-1.5">
                <Image
                  source={images.logoSmall}
                  className="w-9 h-10"
                  resizeMode="contain"
                />
              </View>
            </View>
            <SearchInput initialQuery={undefined} onSearch={undefined} />
            <View className="w-full flex-1 pt-5 pb-8">
              <Text className="text-lg font-pregular text-gray-100 mb-3">
               Nouveau plats
              </Text>

            </View>

          </View>
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
        
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      />
    </SafeAreaView>
  );
}
