import {View, Text, Pressable, StyleSheet, ScrollView, Image} from 'react-native';
import React from 'react';
import {Link, Redirect, useRouter} from 'expo-router';
import {SafeAreaView} from 'react-native-safe-area-context';
import {images} from '../constants';
import {AntDesign} from '@expo/vector-icons';
import Button from '@/components/ui/button';
import {StatusBar} from 'expo-status-bar';
import {useGlobalStore} from '@/context/GlobalProvider';

const App = () => {
   const router = useRouter();
   const {isLogged, isLoading} = useGlobalStore();

   if (!isLoading && isLogged) return <Redirect href="/home" />;

   return (
      <SafeAreaView style={styles.container}>
         <ScrollView contentContainerStyle={styles.scrollViewContent}>
            <View className=" w-full justify-center items-center min-h-[85] px-4">
               <Image style={styles.image} source={images.logo} resizeMode="contain" />
               <AntDesign name="bulb1" size={250} color="grey" />
               <View style={styles.middleContainer}>
                  <Text style={styles.linkText}>
                     Welcome to my<Text style={styles.highlight}> App</Text>
                  </Text>
                  <Image style={styles.path} source={images.path} />
               </View>
               <Text className=" text-sm font-pregular mt-7 text-center">Start uploading pictures!</Text>
               <Button title="Login" handlePress={() => router.push('/sign-in')} containerStyles="w-full mt-7" />
            </View>
         </ScrollView>
         <StatusBar backgroundColor="#161622" style="dark" />
      </SafeAreaView>
   );
};

const styles = StyleSheet.create({
   container: {
      flex: 1,
      margin: 3,
      backgroundColor: '#fff',
   },
   scrollViewContent: {
      flexGrow: 1,
   },

   image: {
      width: 100,
      height: 100,
   },
   middleContainer: {
      position: 'relative',
   },
   pressable: {},
   linkText: {
      fontSize: 28,
   },
   highlight: {
      fontSize: 48,
      fontFamily: 'poppins-bold',
   },
   path: {
      width: 136,
      height: 35,
      position: 'absolute',
      bottom: -20,
      right: -10,
   },
   text: {},
});

export default App;
