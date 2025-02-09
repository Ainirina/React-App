import { useState } from "react";
import { Link, router } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { View, Text, ScrollView, Dimensions, Alert, Image } from "react-native";
import { images } from '@/constants';
import FormField from '@/components/FormField';
import CustomButton from '@/components/CustomButton';
import { FIREBASE_AUTH, FIREBASE_DB } from '../../FireBaseConfig'; // Import Firestore
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore'; // Firestore functions

const SignUp = () => {
  const [isSubmitting, setSubmitting] = useState(false);
  const [form, setForm] = useState({
    photo: "",
    username: "",
    email: "",
    password: "",
  });

  const submit = async () => {
    const { email, password, username } = form;
    setSubmitting(true); // Set loading state

    try {
      // Create user with email and password
      const userCredential = await createUserWithEmailAndPassword(FIREBASE_AUTH, email, password);
      const user = userCredential.user; // Access the user from userCredential

      // Update the display name (username)
      await updateProfile(user, {
        displayName: username,
      });

      // Enregistrer l'utilisateur dans Firestore
      const userDocRef = doc(FIREBASE_DB, 'Client', user.uid); // Utiliser l'UID comme ID de document
      await setDoc(userDocRef, {
        uid: user.uid, // Stocker l'UID pour référence
        username: username,
        email: email,
        photoURL: form.photo || "", // Optionnel : URL de la photo de profil
        createdAt: new Date().toISOString(), // Date de création
      });

      // After successful sign-up, navigate to the home page
      router.replace("/home");
    } catch (error) {
      console.error(error);
      Alert.alert('Error', 'Failed to sign up. Please try again.');
    } finally {
      setSubmitting(false); // Reset loading state
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
          <Image
            source={images.logo}
            resizeMode="contain"
            className="w-[115px] h-[34px]"
          />

          <Text className="text-2xl font-semibold text-white mt-10 font-psemibold">
            S'inscrire à Cooking
          </Text>

          <FormField
            title="Username"
            value={form.username}
            handleChangeText={(e) => setForm({ ...form, username: e })}
            otherStyles="mt-10"
          />

          <FormField
            title="Email"
            value={form.email}
            handleChangeText={(e) => setForm({ ...form, email: e })}
            otherStyles="mt-7"
            keyboardType="email-address"
          />

          <FormField
            title="Password"
            value={form.password}
            handleChangeText={(e) => setForm({ ...form, password: e })}
            otherStyles="mt-7"
          />

          <CustomButton
            title="S'inscrire"
            handlePress={submit}
            containerStyles="mt-7"
            isLoading={isSubmitting}
          />

          <View className="flex justify-center pt-5 flex-row gap-2">
            <Text className="text-lg text-gray-100 font-pregular">
              Déjà un compte?
            </Text>
            <Link
              href="/sign-in"
              className="text-lg font-psemibold text-secondary"
            >
              Se connecter
            </Link>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default SignUp;