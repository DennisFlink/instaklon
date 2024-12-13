import {View, Text, ScrollView, Image, StyleSheet, Alert} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import React from 'react';
import {images} from '../../constants';
import FormField from '@/components/ui/FormField';
import Button from '@/components/ui/button';
import {Link, router} from 'expo-router';
import {createUser} from '@/lib/appwrite';
import {useGlobalStore} from '@/context/GlobalProvider';

const SignUp = () => {
   const {setUser, setIsLogged} = useGlobalStore();
   const [form, setForm] = React.useState({
      username: '',
      email: '',
      password: '',
   });
   const [isSubmitting, setIsSubmitting] = React.useState(false);

   const onSubmit = async () => {
      if (!form.username || !form.email || !form.password) {
         Alert.alert('Error', 'Please fill all fields');
      }
      setIsSubmitting(true);

      try {
         const result = await createUser(form.email, form.password, form.username);
         setUser(result);
         setIsLogged(true);
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
               <Text className=" text-2xl font-bold mt-10">Sign up </Text>
               <FormField title="Username" value={form.username} handleChangeText={(e: string) => setForm({...form, username: e})} otherStyles="mt-7" placeholder="email-adress" />
               <FormField title="Email" value={form.email} handleChangeText={(e: string) => setForm({...form, email: e})} otherStyles="mt-7" placeholder="email-adress" />
               <FormField title="Password" value={form.password} handleChangeText={(e: string) => setForm({...form, password: e})} otherStyles="mt-7" placeholder="your password" />
               <Button title="Sign Up" handlePress={onSubmit} containerStyles="w-full mt-7" isLoading={isSubmitting} />
               <View className="flex-row justify-center mt-5">
                  <Text className="text-gray-800">Have a account already?</Text>
                  <Link href="/sign-in" className="text-cyan-600 ml-1 font-semibold">
                     Sign in
                  </Link>
               </View>
            </View>
         </ScrollView>
      </SafeAreaView>
   );
};

export default SignUp;
const styles = StyleSheet.create({
   image: {
      width: 80,
      height: 100,
   },
});
