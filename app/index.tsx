import { StatusBar } from 'expo-status-bar';
import { Image,View ,ScrollView,Text,StyleSheet} from 'react-native';

import { SafeAreaView } from "react-native-safe-area-context";
import { images } from "../constants";
import { router } from 'expo-router';
import CustomButton from '../components/CustomButton';
import React , { useEffect } from 'react';


export default function Welcome() {

  return (
    
    <SafeAreaView className='bg-primary h-full' >
    
      <ScrollView contentContainerStyle={{ height:'100%'}} >
        <View className='w-full justify-center items-center h-full px-4'>
        <Image
            source={images.logo}
            className="w-[200px] h-[100px]"
            resizeMode="contain"
          />
          <Image
            source={images.cards}
            className="max-w-[380px] w-full h-[308px]"
            resizeMode="contain"
          />
           <View className="relative mt-5">
            <Text className="text-3xl text-white font-bold text-center">
            Commandez vos plats {"\n"}
            préférés avec {" "}
              <Text className="text-secondary-200">Cooking</Text>
            </Text>

            <Image
              source={images.path}
              className="w-[136px] h-[15px] absolute -bottom-2 -right-8"
              resizeMode="contain"
            />
          </View>
    
          <CustomButton
            title="Se connecter"
            handlePress={() => router.push("/sign-in")}
            containerStyles="w-full mt-7" textStyles={undefined} isLoading={undefined}  />
        </View>
      </ScrollView>
      <StatusBar backgroundColor="#161622" style="light" />
    </SafeAreaView>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});