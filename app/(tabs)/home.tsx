import { images } from '@/constants';
import React, { useState } from 'react';
import { FlatList, Image, Text, View, TouchableOpacity, RefreshControl } from 'react-native';
import { SafeAreaView } from "react-native-safe-area-context";
import SearchInput from '@/components/SearchInput';
import PlateCard from '@/components/PlateCard';

const data = [
  { id: '1', name: 'Burger', price: '$5.99', image: 'https://example.com/burger.jpg' },
  { id: '2', name: 'Pizza', price: '$8.99', image: 'https://example.com/pizza.jpg' },
  { id: '3', name: 'Pasta', price: '$7.50', image: 'https://example.com/pasta.jpg' },
  { id: '4', name: 'Sushi', price: '$12.00', image: 'https://example.com/sushi.jpg' },
  { id: '5', name: 'Tacos', price: '$4.99', image: 'https://example.com/tacos.jpg' },
  { id: '6', name: 'Vary', price: '$7.99', image: 'https://example.com/Vary.jpg' },
];

export default function HomeScreen() {
  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = async () => {
    setRefreshing(true);
  
    setRefreshing(false);
  };
  return (
    <SafeAreaView className="bg-primary h-full">
     

      <FlatList
        data={data}
        keyExtractor={(item) => item.id}
        numColumns={2}
        contentContainerStyle={{ paddingBottom: 20, paddingHorizontal: 10 }}
        columnWrapperStyle={{ justifyContent: 'space-between' }}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => (
          <PlateCard item={item} />
        )}

        ListHeaderComponent={() => (
          <View className="flex my-6 px-4 space-y-6">
            <View className="flex justify-between items-start flex-row mb-6">
              <View>
                <Text className="font-pmedium text-sm text-gray-100">
                  Bienvenue !
                </Text>
                <Text className="text-2xl font-psemibold text-white">
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
            <SearchInput initialQuery={undefined} />
            <View className="w-full flex-1 pt-5 pb-8">
              <Text className="text-lg font-pregular text-gray-100 mb-3">
               Nouveau plats
              </Text>

            
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
