import { Tabs ,Redirect} from 'expo-router';
import React from 'react';
import { StatusBar } from "expo-status-bar";
import { Image, Text, View } from "react-native";
import { icons } from "../../constants";
import { useColorScheme } from '@/hooks/useColorScheme';
import "../../global.css";
import { Stack } from 'expo-router';

const TabIcon = ({ icon, color }) => {
  return (
    <View className="flex items-center justify-center gap-2">
      <Image
        source={icon}
        resizeMode="contain"
        tintColor={color}
        className="w-7 h-7 mt-10"
      />
      {/* <Text
        className={`${focused ? "font-psemibold" : "font-pregular"} text-xs`}
        style={{ color: color }}
      >
        {name}
      </Text> */}
    </View>
  );
};


export default function TabLayout() {
  const colorScheme = useColorScheme();
 

  return (
    <>
    <Tabs
    screenOptions={{
      tabBarActiveTintColor: "#FFA201",
      tabBarInactiveTintColor: "#CDCDE0",
      tabBarShowLabel: false,
      tabBarStyle: {
        backgroundColor: "#161622",
        borderTopEndRadius:15,
        borderTopLeftRadius:15,
        borderTopWidth: 1,
        borderTopColor: "#232533",
        height: 80,
      },
    }}
  >
      <Tabs.Screen
        name="home"
        options={{
          title: 'Home',
          headerShown: false,
          tabBarIcon: ({ color, focused}) =>  
          <TabIcon
          icon={icons.home}
          color={color}
      
        />,
        }}
      />
      <Tabs.Screen
        name="command"
        options={{
          title: 'Commande',
          headerShown: false,
          tabBarIcon: ({ color, focused}) =>  
          <TabIcon
          icon={icons.bookmark}
          color={color}
     
        />,
        }}
      />
    <Tabs.Screen
          name="profil"
          options={{
            title: "Profil",
            headerShown: false,
            tabBarIcon: ({ color, focused }) => (
              <TabIcon
                icon={icons.profile}
                color={color}
             
              />
            ),
          }}
        />
    </Tabs>
    <StatusBar backgroundColor="#161622" style="light" />

    </>
  );
}
