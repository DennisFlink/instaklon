import {StyleSheet, Text, Pressable} from 'react-native';
import React from 'react';

interface ButtonProps {
   title: string;
   handlePress?: () => void;
   containerStyles?: string;
   textStyles?: string;
   isLoading?: boolean;
}

const Button = ({title, handlePress, containerStyles, textStyles, isLoading}: ButtonProps) => {
   return (
      <Pressable onPress={handlePress} className={` bg-slate-600 rounded-xl min-h-[62px] justify-center items-center ${containerStyles} ${isLoading ? 'opacity-50' : ''}`} disabled={isLoading}>
         <Text className={`font-psemibold text-lg text-cyan-50 ${textStyles}`}>{title}</Text>
      </Pressable>
   );
};

export default Button;

const styles = StyleSheet.create({});
