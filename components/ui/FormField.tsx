import {View, Text, TextInput, Pressable} from 'react-native';
import Entypo from '@expo/vector-icons/Entypo';
import React from 'react';
interface FormFieldProps {
   title?: string;
   value?: string;
   placeholder?: string;
   handleChangeText?: (text: string) => void;
   otherStyles?: string;
}

const FormField = ({title, value, placeholder, handleChangeText, otherStyles, ...props}: FormFieldProps) => {
   const [showPassword, setShowPassword] = React.useState(false);
   return (
      <View className={`space-y-2 ${otherStyles}`}>
         <Text className="text-base text-gray-800 font-pmedium">{title}</Text>
         <View className="w-full h-16 px-4 bg-slate-100 rounded-2xl focus: border-gray-200 items-center flex-row">
            <TextInput placeholder={placeholder} className="flex-1 text-gray-900 font-psemibold w-full" value={value} onChangeText={handleChangeText} placeholderTextColor="#2a2a2a" secureTextEntry={title === 'Password' && !showPassword} />
            {title === 'Password' && (
               <Pressable>
                  <Entypo name={showPassword ? 'eye' : 'eye-with-line'} size={24} color="#000" onPress={() => setShowPassword(!showPassword)} />
               </Pressable>
            )}
         </View>
      </View>
   );
};

export default FormField;
