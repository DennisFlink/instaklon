import {View, Text, SafeAreaView, ScrollView, Pressable, Image, Alert} from 'react-native';
import React from 'react';
import FormField from '@/components/ui/FormField';
import AntDesign from '@expo/vector-icons/AntDesign';
import * as ImagePicker from 'expo-image-picker';
import {ImagePickerAsset} from 'expo-image-picker';
import Button from '@/components/ui/button';
import {router} from 'expo-router';
import {uploadPicture} from '@/lib/appwrite';
import {useGlobalStore} from '@/context/GlobalProvider';

const Create = () => {
   const {user} = useGlobalStore();
   const [upLoad, setUpLoad] = React.useState(false);
   const [form, setForm] = React.useState<{
      title: string;
      picture: ImagePickerAsset | null;
      thumbnail: string;
   }>({
      title: '',
      picture: null,
      thumbnail: '',
   });

   const pickImage = async () => {
      let result = await ImagePicker.launchImageLibraryAsync({
         mediaTypes: ['images'],
         allowsEditing: false,
         aspect: [4, 3],
         quality: 0.1,
      });

      if (!result.canceled) {
         setForm({...form, picture: result.assets[0]});
      }
   };

   const onUpload = async () => {
      if (!form.picture || !form.title) {
         return Alert.alert('Error', 'Please fill in all fields');
      }

      setUpLoad(true);
      if (!user) {
         return Alert.alert('Error', 'You need to be logged in to upload a picture');
      }
      try {
         await uploadPicture({...form, userId: user.$id});
         Alert.alert('Success', 'Picture uploaded successfully');
         router.push('/home');
      } catch (error) {
         Alert.alert('Error', 'Something went wrong, please try again');
      } finally {
         setForm({
            title: '',
            picture: null,
            thumbnail: '',
         });
         setUpLoad(false);
      }
   };
   return (
      <SafeAreaView className="bg-white h-full">
         <ScrollView className="px-4 my-6">
            <Text className="text-2xl font-psemibold">Upload a Picture</Text>
            <FormField title="Picture Title" value={form.title} placeholder="Give your picture a nice title" handleChangeText={(e) => setForm({...form, title: e})} otherStyles="mt-10" />
            <View className="mt-7 space-y-2">
               <Text className="text-base font-pmedium py-4">Upload a Picture</Text>
               <Pressable onPress={pickImage}>
                  {form.picture ? (
                     <Image source={{uri: form.picture.uri}} resizeMode="cover" className="w-full h-96 rounded-2xl" />
                  ) : (
                     <View className="w-full h-16 px-4 rounded-2xl border border-black-100 flex justify-center items-center flex-row gap-6">
                        <Text className="text-sm  font-pmedium">Choose a file</Text>
                        <AntDesign name="upload" size={24} color="black" />
                     </View>
                  )}
               </Pressable>
            </View>
            <Button title="Upload" handlePress={onUpload} containerStyles="mt-12" isLoading={upLoad} />{' '}
         </ScrollView>
      </SafeAreaView>
   );
};

export default Create;
