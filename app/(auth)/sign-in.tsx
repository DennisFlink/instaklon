import {View, Text, ScrollView, Image, StyleSheet, Alert} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import React, {useState} from 'react';
import {images} from '../../constants';
import FormField from '@/components/ui/FormField';
import Button from '@/components/ui/button';
import {Link, router} from 'expo-router';
import {getCurrentUser, signIn} from '@/lib/appwrite';
import {useGlobalStore} from '@/context/GlobalProvider';

const SignIn = () => {
   const {setUser, setIsLogged, fetchCurrentUser} = useGlobalStore();
   const [form, setForm] = useState({
      email: '',
      password: '',
   });
   const [isSubmitting, setIsSubmitting] = useState(false);

   const onSubmit = async () => {
      if (!form.email || !form.password) {
         Alert.alert('Error', 'Please fill all fields');
      }
      setIsSubmitting(true);

      try {
         await signIn(form.email, form.password);
         await fetchCurrentUser();

         router.replace('/home');
      } catch (error) {
         Alert.alert('Error', (error as Error).message);
      } finally {
         setIsSubmitting(false);
      }
   };
   return (
      <SafeAreaView className=" bg-white h-full">
         <ScrollView>
            <View className="w-full justify-center min-h-[85vh] px-4 my-6">
               <Text className=" text-2xl font-bold mt-10">Sign In</Text>
               <FormField title="Email" value={form.email} handleChangeText={(e: string) => setForm({...form, email: e})} otherStyles="mt-7" placeholder="email-adress" />
               <FormField title="Password" value={form.password} handleChangeText={(e: string) => setForm({...form, password: e})} otherStyles="mt-7" placeholder="your password" />
               <Button title="Sign In" handlePress={onSubmit} containerStyles="w-full mt-7" isLoading={isSubmitting} />
               <View className="flex-row justify-center mt-5">
                  <Text className="text-gray-800">Don't have an account?</Text>
                  <Link href="/sign-up" className="text-cyan-600 ml-1 font-semibold">
                     Sign Up
                  </Link>
               </View>
            </View>
         </ScrollView>
      </SafeAreaView>
   );
};

export default SignIn;
const styles = StyleSheet.create({
   image: {
      width: 80,
      height: 100,
   },
});
