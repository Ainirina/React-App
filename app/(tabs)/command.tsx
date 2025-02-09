import { View, Text, FlatList, TouchableOpacity, Image, Alert } from 'react-native';
import React, { useEffect, useState } from 'react';
import { useLocalSearchParams } from 'expo-router';
import { SafeAreaView } from "react-native-safe-area-context";
import { images } from '@/constants';
import Modal from 'react-native-modal';
import { useNotification } from '@/context/NotificatonContext';

import * as Notifications from 'expo-notifications';

const Command = () => {
  const { name, price } = useLocalSearchParams();
  const [cart, setCart] = useState<{ name: string; price: string }[]>([]);
  const [isModalVisible, setIsModalVisible] = useState(false); // Modal visibility state

  // Ajouter un plat au panier si on arrive ici depuis "Commander"
  useEffect(() => {
    if (name && price) {
      setCart((prevCart) => [...prevCart, { name, price }]);
    }
  }, [name, price]);

  // Supprimer un plat du panier
  const removeItem = (index: number) => {
    setCart((prevCart) => prevCart.filter((_, i) => i !== index));
  };

  // Vider le panier
  const clearCart = () => {
    setCart([]);
  };

  // Calculer le prix total du panier
  const totalPrice = cart.reduce((total, item) => total + parseFloat(item.price.replace('$', '')), 0);

  // Afficher le modal de confirmation de paiement
  const handlePayment = () => {
    setIsModalVisible(true); // Ouvrir le modal
  };
  const {expoPushToken,notification,error}=useNotification();
  if (error) {
    return <Text>Error: {error.message}</Text>;
  }
  
 const handleTestNotification = async () => {
    await Notifications.scheduleNotificationAsync({
      content: {
        title: "Cooking",
        body: "Votre commande à bien été prise en compte!",
      },
      trigger: null,
    });
  };
  // Confirmer le paiement
  const confirmPayment = () => {
    setIsModalVisible(false); // Fermer le modal
    Alert.alert("Paiement effectué", "Votre paiement a été validé avec succès.", [{ text: "OK" }]);
    handleTestNotification();
    clearCart(); // Vider le panier après paiement
  };

  return (
    <SafeAreaView className="bg-primary h-full">
      <View className="flex my-6 px-4 space-y-6">
        {/* HEADER */}
        <View className="flex justify-between items-start flex-row mb-6">
          <View>
            <Text className="font-pmedium text-sm text-gray-100">Mon Panier</Text>
            <Text className="text-2xl font-psemibold text-white">Tiffany</Text>
          </View>
          <View className="mt-1.5">
            <Image source={images.logoSmall} className="w-9 h-10" resizeMode="contain" />
          </View>
        </View>
  {/* PRIX TOTAL ET BOUTON PAYER */}
  <View className=" p-4 rounded-md mb-6 shadow-md">
          <Text className="text-xl font-semibold text-green-600">Prix Total</Text>
          <Text className="text-xl text-green-600 font-bold">{totalPrice.toFixed(2)} Ar</Text>
          <TouchableOpacity
            onPress={handlePayment}
            className="mt-4 bg-green-500 p-3 rounded-md"
          >
            <Text className="text-white text-center font-bold">Payer</Text>
          </TouchableOpacity>
        </View>
        {/* LISTE DES COMMANDES */}
        {cart.length > 0 ? (
          <>
            <FlatList
              data={cart}
              keyExtractor={(item, index) => index.toString()}
              renderItem={({ item, index }) => (
                <View className="bg-gray-100 mx-4 my-2 rounded-xl p-4 shadow-md flex-row justify-between items-center">
                  <View>
                    <Text className="text-lg font-semibold text-gray-900">{item.name}</Text>
                    <Text className="text-md text-green-600 font-bold">{item.price}</Text>
                  </View>
                  <TouchableOpacity
                    onPress={() => removeItem(index)}
                    className="mt-2 bg-red-500 p-2 rounded-md"
                  >
                    <Text className="text-white text-center font-semibold">Supprimer</Text>
                  </TouchableOpacity>
                </View>
              )}
            />
          </>
        ) : (
          <Text className="text-gray-500 text-center">Votre panier est vide.</Text>
        )}

      

        {/* MODAL DE CONFIRMATION */}
        <Modal
          isVisible={isModalVisible}
          onBackdropPress={() => setIsModalVisible(false)} // Fermer le modal quand on touche l'extérieur
          onBackButtonPress={() => setIsModalVisible(false)} // Fermer le modal quand on appuie sur le bouton retour
        >
          <View className="bg-white p-6 rounded-lg shadow-lg">
            <Text className="text-lg font-bold text-gray-900">Confirmer le Paiement</Text>
            <Text className="text-md text-gray-600 mt-2">Êtes-vous sûr de vouloir procéder au paiement ?</Text>

            <View className="flex flex-row justify-around mt-4">
              <TouchableOpacity
                onPress={() => setIsModalVisible(false)} // Fermer sans payer
                className="bg-gray-500 p-3 rounded-md"
              >
                <Text className="text-white text-center font-bold">Annuler</Text>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={confirmPayment} // Confirmer le paiement
                className="bg-green-500 p-3 rounded-md"
              >
                <Text className="text-white text-center font-bold">Confirmer</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      </View>
    </SafeAreaView>
  );
};

export default Command;
