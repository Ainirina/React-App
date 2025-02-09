import React, { useState, useEffect } from "react";
import { View, Image, TouchableOpacity, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { FIREBASE_AUTH } from "../../FireBaseConfig"; // Ensure this path is correct
import { icons } from "../../constants"; // Ensure you have a logout icon
import InfoBox from "../../components/InfoBox"; // Ensure this component exists

type User = {
  email: string | null;
  photoURL?: string | null;
  displayName?: string | null;
};

const ProfilScreen = () => {
  const [user, setUser] = useState<User>({
    email: null,
    photoURL: null,
    displayName: null,
  });

  const router = useRouter();

  // Listen for authentication state changes
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(FIREBASE_AUTH, (user) => {
      if (user) {
        setUser({
          email: user.email,
          photoURL: user.photoURL || "https://cdn-icons-png.flaticon.com/512/3135/3135715.png", // Default image
          displayName: user.displayName || "Utilisateur",
        });
      } else {
        setUser({ email: null, photoURL: null, displayName: null });
      }
    });

    return unsubscribe; // Unsubscribe on component unmount
  }, []);

  // Handle logout
  const handleLogout = async () => {
    try {
      await signOut(FIREBASE_AUTH);
      console.log("Utilisateur déconnecté");
      router.push("/"); // Redirect to home page
    } catch (error) {
      console.error("Erreur lors de la déconnexion:", error);
    }
  };

  return (
    <SafeAreaView className="bg-primary h-full">
      <View className="w-full flex justify-center items-center mt-6 mb-12 px-4">
        {/* Logout button */}
        <TouchableOpacity
          onPress={handleLogout}
          className="flex w-full items-end mb-10"
        >
          <Image
            source={icons.logout} // Ensure you have a logout icon
            resizeMode="contain"
            className="w-8 h-8" // Enlarged size
          />
        </TouchableOpacity>

        {/* Profile picture */}
        <View className="w-48 h-48 border-2 border-secondary rounded-full flex justify-center items-center mb-4">
          <Image
            source={{ uri: user.photoURL || "https://cdn-icons-png.flaticon.com/512/3135/3135715.png" }}
            className="w-[95%] h-[95%] rounded-full"
            resizeMode="cover"
          />
        </View>

        {/* Username */}
        <InfoBox
          title={user.displayName || "Utilisateur"}
          containerStyles="mt-5"
          titleStyles="text-2xl font-bold" // Enlarged size and style
        />

        {/* Email */}
        <View className="mt-5 flex flex-row">
          <InfoBox
            title={user.email || "Aucun email"}
            subtitle="Email"
            titleStyles="text-2xl font-bold" // Enlarged size and style
            containerStyles="mr-10"
          />
        </View>

        {/* Edit options */}
        <View className="mt-8 w-full">
          <TouchableOpacity className="flex-row items-center justify-between py-3 border-b border-gray-700">
            <Text className="text-lg text-white">Editer Nom </Text>
            <Text className="text-lg text-gray-400">{">"}</Text>
          </TouchableOpacity>
          <TouchableOpacity className="flex-row items-center justify-between py-3 border-b border-gray-700">
            <Text className="text-lg text-white">Editer Photo </Text>
            <Text className="text-lg text-gray-400">{">"}</Text>
          </TouchableOpacity>
          <TouchableOpacity className="flex-row items-center justify-between py-3 border-b border-gray-700">
            <Text className="text-lg text-white">Editer Mail </Text>
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