import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const Header = () => {
   return (
      <>
         <View className="h-32 bg-slate-500">
            <Text className=" font-bold text-4xl">Header</Text>
         </View>
      </>
   );
};

const styles = StyleSheet.create({
   header: {
      height: 60,
      backgroundColor: '#f8f8f8',
      justifyContent: 'center',
      alignItems: 'center',
      borderBottomWidth: 1,
      borderBottomColor: '#ddd',
   },
   headerText: {
      fontSize: 20,
      fontWeight: 'bold',
   },
});

export default Header;
