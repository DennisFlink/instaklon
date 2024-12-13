import {View, Text, FlatList, Image, StyleSheet, RefreshControl, Alert, Pressable} from 'react-native';
import React from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import EmptyState from '@/components/ui/EmptyState';
import {getuserPost, signOut} from '@/lib/appwrite';
import useAppWrite from '@/lib/useAppwrite';
import PictureCard from '../../components/ui/PictureCard';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';

import {useGlobalStore} from '@/context/GlobalProvider';
import InfoBox from '@/components/ui/infoBox';
import {router} from 'expo-router';
const Profile = () => {
   const {user, setUser, setIsLogged} = useGlobalStore();

   if (!user) {
      return null;
   }
   const {data: posts} = useAppWrite(() => getuserPost(user.$id));
   const onLogout = async () => {
      await signOut();
      setUser(null);
      setIsLogged(false);
      router.replace('/(auth)/sign-in');
   };
   return (
      <SafeAreaView className="bg-white h-full">
         <FlatList
            data={posts}
            keyExtractor={(item) => item.$id}
            renderItem={({item}) => <PictureCard post={item} />}
            ListHeaderComponent={() => (
               <View className="w-full justify-center items-center mt-6 mb-12 px-4">
                  <Pressable className=" w-full items-end mb-18" onPress={onLogout}>
                     <MaterialIcons name="logout" size={24} color="black" />
                  </Pressable>

                  <View className="w-16 h-16 border border-primary rounded-lg justify-center items-center">
                     <Image source={{uri: user.avatar}} className="w-14 h-14 rounded-lg" />
                  </View>
                  <InfoBox title={user.username} containerStyling="mt-5" titleStyling="text-lg" />

                  <View className=" flex-row mt-5">
                     <InfoBox title={posts?.length || 0} subTitle="Posts" containerStyling="mr-10" titleStyling="text-xl" />

                     <InfoBox title="1.2k" subTitle="Followers" titleStyling="text-xl" />
                  </View>
               </View>
            )}
            ListEmptyComponent={() => <EmptyState title="No Pictures Found" subtitle="No pictures found for this search" />}
         />
      </SafeAreaView>
   );
};

export default Profile;
