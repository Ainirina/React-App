import { View, Text, TouchableOpacity, Image } from 'react-native';
import React, { useState, useEffect } from 'react';
import { FIREBASE_AUTH } from '../../FireBaseConfig';
import { signOut, onAuthStateChanged } from 'firebase/auth';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { Stack } from 'expo-router';

const ProfilScreen = () => {
  // const [user, setUser] = useState<{ email: string | null; photoURL?: string | null; displayName?: string | null }>({
  //   email: null,
  //   photoURL: null,
  //   displayName: null
  // });
  
  // const router = useRouter();

  // useEffect(() => {
  //   const unsubscribe = onAuthStateChanged(FIREBASE_AUTH, (user) => {
  //     if (user) {
  //       setUser({
  //         email: user.email,
  //         photoURL: user.photoURL || 'https://cdn-icons-png.flaticon.com/512/3135/3135715.png', // Image par défaut
  //         displayName: user.displayName || 'Utilisateur'
  //       });
  //     } else {
  //       setUser({ email: null, photoURL: null, displayName: null });
  //     }
  //   });

  //   return unsubscribe;
  // }, []);

  // const handleLogout = async () => {
  //   try {
  //     await signOut(FIREBASE_AUTH);
  //     console.log('Utilisateur déconnecté');
  //     router.push('/');
  //   } catch (error) {
  //     console.error('Erreur lors de la déconnexion:', error);
  //   }
  // };

  // return (
  //   <SafeAreaView className="bg-gray-100 flex-1">
  //     {/* Header du profil */}
  //     <View className="bg-blue-500 h-36 w-full rounded-b-3xl shadow-lg"></View>

  //     {/* Contenu du profil */}
  //     <View className="flex-1 items-center px-4 mt-[-50px]">
  //       {/* Photo de profil */}
  //       <Image
  //         source={{ uri: user.photoURL || 'https://cdn-icons-png.flaticon.com/512/3135/3135715.png' }}
  //         className="w-24 h-24 rounded-full border-4 border-white shadow-lg"
  //       />

  //       {/* Nom de l'utilisateur */}
  //       <Text className="text-2xl font-semibold text-gray-900 mt-3">{user.displayName}</Text>

  //       {/* Email */}
  //       {user.email ? (
  //         <Text className="text-lg text-gray-600">{user.email}</Text>
  //       ) : (
  //         <Text className="text-lg text-gray-500">Aucun utilisateur connecté</Text>
  //       )}

  //       {/* Boutons */}
  //       <View className="mt-6 space-y-4 w-full px-6">
  //         {/* <TouchableOpacity className="bg-blue-600 py-3 rounded-full shadow" onPress={() => console.log('Modifier le profil')}>
  //           <Text className="text-center text-white font-semibold">Modifier le profil</Text>
  //         </TouchableOpacity> */}

  //         <TouchableOpacity className="bg-red-500 py-3 rounded-full shadow" onPress={handleLogout}>
  //           <Text className="text-center text-white font-semibold">Déconnexion</Text>
  //         </TouchableOpacity>
  //       </View>
  //     </View>
  //   </SafeAreaView>
  // );
};

export default ProfilScreen;
