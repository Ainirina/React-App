

import React, { useState } from 'react';
import { SafeAreaView } from "react-native-safe-area-context";
import { View, Text, ScrollView, Dimensions, Alert, Image } from "react-native";
import { images } from '@/constants';
import FormField from '@/components/FormField';
import CustomButton from '@/components/CustomButton';
import { Link, router } from 'expo-router';
import { FIREBASE_AUTH } from '../../FireBaseConfig'; 
import { signInWithEmailAndPassword } from 'firebase/auth';

// Déclaration correcte de l'interface User
interface User {
  email: string;
  uid: string;
}

const SignIn = () => {
  const [user, setUser] = useState<User | null>(null);
  
  const [form, setForm] = useState({
    email: '',
    password: '',
  });

  const [isSubmitting, setSubmitting] = useState(false);

  // Fonction pour mettre à jour les champs du formulaire
  const handleChangeText = (field: string, value: string) => {
    setForm((prevForm) => ({
      ...prevForm,
      [field]: value,
    }));
  };

  // Fonction pour gérer la soumission du formulaire
  const submit = async () => {
    const { email, password } = form;
    setSubmitting(true);

    try {
      // Connexion avec Firebase
      const userCredential = await signInWithEmailAndPassword(FIREBASE_AUTH, email, password);
      const user = userCredential.user;

      // Mise à jour de l'état `user`
      setUser({
        email: user.email!,
        uid: user.uid
      });

      console.log("Utilisateur connecté :", user.email, user.uid);
      
      // Redirection après connexion
      router.replace('/home');

    } catch (error: any) {
      console.error('Erreur de connexion:', error.message);
      
      let errorMessage = 'Une erreur inattendue s\'est produite. Veuillez réessayer.';
      if (error.code === 'auth/invalid-credential') {
        errorMessage = 'Identifiants invalides, veuillez vérifier votre email et mot de passe.';
      } else if (error.code === 'auth/user-not-found') {
        errorMessage = 'Utilisateur non trouvé. Veuillez vérifier votre adresse email.';
      } else if (error.code === 'auth/wrong-password') {
        errorMessage = 'Mot de passe incorrect.';
      }

      Alert.alert('Erreur', errorMessage);
    } finally {
      // Désactiver le chargement après la requête
      setSubmitting(false);
    }
  };

  return (
    <SafeAreaView className="bg-primary h-full">
      <ScrollView>
        <View
          className="w-full flex justify-center h-full px-4 my-6"
          style={{
            minHeight: Dimensions.get("window").height - 100,
          }}
        >
          {images.logo && (
            <Image
              source={images.logo}
              resizeMode="contain"
              className="w-[115px] h-[34px]"
            />
          )}

          <Text className="text-2xl font-semibold text-white mt-10 font-psemibold">
            Se connecter à Cooking
          </Text>

          {/* Champ Email */}
          <FormField
            title="Email"
            value={form.email}
            handleChangeText={(e) => handleChangeText('email', e)}
            otherStyles="mt-7"
            keyboardType="email-address"
          />

          {/* Champ Mot de passe */}
          <FormField
            title="Mot de passe"
            value={form.password}
            handleChangeText={(e) => handleChangeText('password', e)}
            otherStyles="mt-7"
            secureTextEntry
          />

          {/* Bouton de connexion */}
          <CustomButton
            title="Se connecter"
            handlePress={submit}
            containerStyles="mt-7"
            isLoading={isSubmitting}
          />

          {/* Lien d'inscription */}
          <View className="flex justify-center pt-5 flex-row gap-2">
            <Text className="text-lg text-gray-100 font-pregular">
              Pas encore de compte?
            </Text>
            <Link
              href="/sign-up"
              className="text-lg font-psemibold text-secondary"
            >
              S'inscrire
            </Link>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default SignIn;

  