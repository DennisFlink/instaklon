import {View, Text, TextInput, Pressable, Image, Alert} from 'react-native';

import FontAwesome from '@expo/vector-icons/FontAwesome';
import React, {useState} from 'react';
import {router, usePathname} from 'expo-router';

interface FormFieldProps {
   title?: string;
   value?: string;
   initialQuery?: string | string[];
   placeholder?: string;
   handleChangeText?: (text: string) => void;
   otherStyles?: string;
}

const SearchInput = ({initialQuery, placeholder}: FormFieldProps) => {
   const pathname = usePathname();
   const [query, setQuery] = useState<string>(Array.isArray(initialQuery) ? initialQuery[0] : initialQuery || '');

   return (
      <View className="flex flex-row items-center space-x-4 w-full h-16 px-4 bg-slate-100  rounded-2xl border-2 border-black-200">
         <TextInput className="text-base mt-0.5 text-gray-900 flex-1 font-pregular " value={query} placeholder={placeholder} placeholderTextColor="#060606" onChangeText={(e) => setQuery(e)} />

         <Pressable
            onPress={() => {
               if (query === '') return Alert.alert('Missing Query', 'Please input something to search');

               if (pathname.startsWith('/search')) router.setParams({query});
               else router.push(`/search/${query}`);
            }}
         >
            <FontAwesome name="search" size={24} color="#000" />
         </Pressable>
      </View>
   );
};

export default SearchInput;
