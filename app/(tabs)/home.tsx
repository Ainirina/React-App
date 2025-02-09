
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
    try {
      const response = await fetch("https://symfony-app-production.up.railway.app/recettes");
      const data = await response.json();
      setRecettes(data);
    } catch (error) {
      console.error("Erreur lors de la récupération des recettes:", error);
    }
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
         <View className="flex my-6 px-4 space-y-6">
            
         <View className="flex justify-between items-start flex-row mb-6">
              <View>
                <Text className="font-pmedium text-sm text-gray-100">
                  Bienvenue sur
                </Text>
                <Text className="text-2xl mt-3 font-psemibold text-white">
                  Cooking
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
          

          </View>
        <ActivityIndicator size="large" color="#0ED700" />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView className="bg-primary h-full">
 <View className="flex my-6 px-4 space-y-6">
            
            <View className="flex justify-between items-start flex-row mb-6">
              <View>
                <Text className="font-pmedium text-sm text-gray-100">
                  Bienvenue sur
                </Text>
                <Text className="text-2xl mt-3 font-psemibold text-white">
                  Cooking
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
         

          </View>
     
         <FlatList 
        data={recettes}
        keyExtractor={(item) => item.id.toString()} // Assurez-vous que `id` est une chaîne
        renderItem={({ item }) => (
          <PlateCard 
            item={{ 
              id: item.id,
              name: item.nom +" ( t:" +item.tempsCuisson +" s )"  , 
              price: item.prix +" Ar", 
              image: `data:image/jpeg;base64,${item.photo}` 
            }}
          />
        )}
        numColumns={2}
        columnWrapperStyle={{ justifyContent: 'space-between', paddingHorizontal: 10 }}
        
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      />
    </SafeAreaView>
  );
}
