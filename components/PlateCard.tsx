import React from 'react';
import { Image, Text, View, TouchableOpacity } from 'react-native';
import { router } from 'expo-router';

interface PlateCardProps {
  item: {
    id: string;
    name: string;
    price: string;
    image: string;
  };
}

const PlateCard: React.FC<PlateCardProps> = ({ item }) => {
  const handleOrder = () => {
    router.push({
      pathname: "/command",
      params: { name: item.name, price: item.price }
    });
  };

  return (
    <TouchableOpacity className="bg-gray-100 w-[48%] my-2 rounded-xl overflow-hidden shadow-md">
      <Image source={{ uri: item.image }} className="w-full h-40" resizeMode="cover" />
      <View className="p-4">
        <Text className="text-lg font-semibold text-gray-900">{item.name}</Text>
        <Text className="text-md text-green-600 font-bold">{item.price}</Text>
        <TouchableOpacity className="mt-2 bg-green-500 p-2 rounded-md" onPress={handleOrder}>
          <Text className="text-white text-center font-semibold">Commander</Text>
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );
};

export default PlateCard;
