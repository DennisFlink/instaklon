import React from 'react';
import {Text, StyleSheet, View} from 'react-native';
import {Stack} from 'expo-router';
import {StatusBar} from 'expo-status-bar';

const AuthLayout = () => {
   return (
      <>
         <Stack screenOptions={{headerTitle: 'Sign'}}>
            <Stack.Screen name="sign-in" options={{headerShown: false}} />
            <Stack.Screen name="sign-up" options={{headerShown: false}} />
         </Stack>
         <StatusBar backgroundColor="#161622" style="dark" />
      </>
   );
};

export default AuthLayout;

const styles = StyleSheet.create({});
