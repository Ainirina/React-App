import { View, Text, TouchableOpacity, Platform } from 'react-native';
import React, { useState, useEffect } from 'react';
import { FIREBASE_AUTH } from '../../FireBaseConfig'; // Assurez-vous que votre config Firebase est dans ce fichier
import { signOut, onAuthStateChanged } from 'firebase/auth';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router'; // Importation du hook pour la redirection

const ProfilScreen = () => {
  const [userEmail, setUserEmail] = useState<string | null>(null);
  const router = useRouter(); // Hook pour rediriger l'utilisateur

  // Récupérer l'email de l'utilisateur à l'ouverture de la page
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(FIREBASE_AUTH, (user) => {
      if (user) {
        setUserEmail(user.email);
      } else {
        setUserEmail(null);
      }
    });

    return unsubscribe; // Nettoyer le listener lors de la sortie de la page
  }, []);

  // Fonction pour gérer la déconnexion
  const handleLogout = async () => {
    try {
      await signOut(FIREBASE_AUTH);
      console.log('Utilisateur déconnecté');
      // Redirection vers la page index après la déconnexion
      router.push('/'); // Redirige vers la page d'accueil ou index
    } catch (error) {
      console.error('Erreur lors de la déconnexion:', error);
    }
  };

  return (
    <SafeAreaView className="bg-gray-100 flex-1 pt-6">
      <View className="flex-1 justify-center items-center space-y-8 px-4">
        <Text className="text-2xl font-bold text-gray-900">Profil</Text>
        
        {userEmail ? (
          <Text className="text-lg text-gray-700">Email: {userEmail}</Text>
        ) : (
          <Text className="text-lg text-gray-500">Aucun utilisateur connecté</Text>
        )}

        <TouchableOpacity
          onPress={handleLogout}
          className="bg-red-500 text-white py-3 px-8 rounded-full"
        >
          <Text className="font-semibold text-white text-center">Déconnexion</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default ProfilScreen;
