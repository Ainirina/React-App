import { View, Text } from 'react-native'
import React, { useState } from 'react'
import { Stack } from 'expo-router'
import { StatusBar } from 'expo-status-bar';
import Loader from '@/components/Loader';

const Authlayout = () => {
 
 
  
  return (
    <>
      <Stack>
        <Stack.Screen
          name="sign-in"
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="sign-up"
          options={{
            headerShown: false,
          }}
        />
      </Stack>


      <StatusBar backgroundColor="#161622" style="light" />
    </>
  );
};

export default Authlayout