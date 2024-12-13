import {View, Text, Image, StyleSheet} from 'react-native';
import React from 'react';
import {router, Router} from 'expo-router';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import Button from './button';

interface props {
   title: string;
   subtitle: string;
}
const EmptyState = ({title, subtitle}: props) => {
   return (
      <View className=" justify-center items-center px-4">
         <MaterialIcons name="search" size={60} color="black" />
         <Text className="font-psemibold text-xl">{title} </Text>
         <Text className="text-sm text-center mt-2 font-pmedium ">{subtitle}</Text>
         <Button title="Upload Picture" handlePress={() => router.push('/create')} containerStyles="w-full my-5" />
      </View>
   );
};

export default EmptyState;
