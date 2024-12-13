import React from 'react';
import {View, Text, Image, StyleSheet} from 'react-native';

const TabIcon = ({icon, color, name, focused}) => {
   return (
      <View style={styles.container}>
         <Image source={icon} resizeMode="contain" style={{height: 24, width: 24}} />
         <Text style={[styles.text, focused ? styles.focusedText : styles.regularText]}>{name}</Text>
      </View>
   );
};

const styles = StyleSheet.create({
   container: {
      alignItems: 'center',
      justifyContent: 'center',
      height: 'auto',
      backgroundColor: 'red',
   },

   text: {
      fontSize: 12,
   },
   focusedText: {
      fontWeight: '600',
   },
   regularText: {
      fontWeight: '400',
   },
});

export default TabIcon;
