import React, { useState, useEffect } from "react";
import { View, Image, TouchableOpacity, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { FIREBASE_AUTH } from "../../FireBaseConfig"; // Assurez-vous que ce chemin est correct
import { icons } from "../../constants"; // Assurez-vous d'avoir une icône de déconnexion
import InfoBox from "../../components/InfoBox"; // Assurez-vous d'avoir ce composant

const ProfilScreen = () => {
  const [user, setUser] = useState<{
    email: string | null;
    photoURL?: string | null;
    displayName?: string | null;
  }>({
    email: null,
    photoURL: null,
    displayName: null,
  });

  const router = useRouter();

  // Écouter les changements d'état de l'authentification
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(FIREBASE_AUTH, (user) => {
      if (user) {
        setUser({
          email: user.email,
          photoURL: user.photoURL || "https://cdn-icons-png.flaticon.com/512/3135/3135715.png", // Image par défaut
          displayName: user.displayName || "Utilisateur",
        });
      } else {
        setUser({ email: null, photoURL: null, displayName: null });
      }
    });

    return unsubscribe; // Désabonnement lors du démontage du composant
  }, []);

  // Gérer la déconnexion
  const handleLogout = async () => {
    try {
      await signOut(FIREBASE_AUTH);
      console.log("Utilisateur déconnecté");
      router.push("/"); // Rediriger vers la page d'accueil
    } catch (error) {
      console.error("Erreur lors de la déconnexion:", error);
    }
  };

  return (
    <SafeAreaView className="bg-primary h-full">
      <View className="w-full flex justify-center items-center mt-6 mb-12 px-4">
        {/* Bouton de déconnexion */}
        <TouchableOpacity
          onPress={handleLogout}
          className="flex w-full items-end mb-10"
        >
          <Image
            source={icons.logout} // Assurez-vous d'avoir une icône de déconnexion
            resizeMode="contain"
            className="w-8 h-8" // Taille agrandie
          />
        </TouchableOpacity>

        {/* Photo de profil */}
      <View className="w-48 h-48 border-2 border-secondary rounded-full flex justify-center items-center mb-4">
  <Image
    source={{ uri: user?.photoURL }}
    className="w-[95%] h-[95%] rounded-full"
    resizeMode="cover"
  />
</View>

        {/* Nom d'utilisateur */}
        <InfoBox
          title={user?.displayName || "Utilisateur"}
          containerStyles="mt-5"
          titleStyles="text-2xl font-bold" // Taille et style agrandis
        />

        {/* Statistiques (Posts et Abonnés) */}
        <View className="mt-5 flex flex-row">
          <InfoBox
            title="0" // Remplacez par le nombre réel de posts si nécessaire
            subtitle="Posts"
            titleStyles="text-2xl font-bold" // Taille et style agrandis
            containerStyles="mr-10"
          />
          <InfoBox
            title="1.2k"
            subtitle="Abonnés"
            titleStyles="text-2xl font-bold" // Taille et style agrandis
            containerStyles={undefined}          />
        </View>

        {/* Liens "Edit Nom" et "Edit Photo" */}
        <View className="mt-8 w-full">
          <TouchableOpacity className="flex-row items-center justify-between py-3 border-b border-gray-700">
            <Text className="text-lg text-white">Edité Nom </Text>
            <Text className="text-lg text-gray-400">{">"}</Text>
          </TouchableOpacity>
          <TouchableOpacity className="flex-row items-center justify-between py-3 border-b border-gray-700">
            <Text className="text-lg text-white">Edité Photo </Text>
            <Text className="text-lg text-gray-400">{">"}</Text>
          </TouchableOpacity>
          <TouchableOpacity className="flex-row items-center justify-between py-3 border-b border-gray-700">
            <Text className="text-lg text-white">Edité Mail </Text>
            <Text className="text-lg text-gray-400">{">"}</Text>
          </TouchableOpacity>
          <TouchableOpacity className="flex-row items-center justify-between py-3 border-b border-gray-700">
            <Text className="text-lg text-white">Confidentialité </Text>
            <Text className="text-lg text-gray-400">{">"}</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default ProfilScreen;