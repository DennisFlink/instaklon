import {View, Text, Image} from 'react-native';
import React from 'react';
import Entypo from '@expo/vector-icons/Entypo';

interface PictureCardProps {
   post: {title: string; thumbnail: string; picture: string; creator: {username: string; avatar: string}};
}
const PictureCard = ({post: {title, picture, creator}}: PictureCardProps) => {
   return (
      <View className="flex flex-col items-center mb-14 px-2 ">
         <View className="w-full gap-3 flex flex-row items-center">
            <View className="w-[46px] h-[46px] rounded-lg flex justify-center items-center p-0.5">
               <Image className="w-10 h-10 rounded-full" source={{uri: creator.avatar}} resizeMode="cover" />
            </View>
            <View className="flex-1">
               <Text className="font-psemibold text-sm " numberOfLines={1}>
                  {title}
               </Text>
               <Text className="font-pregular text-xs text-gray-500" numberOfLines={1}>
                  {creator.username}
               </Text>
            </View>
            <View>
               <Entypo name="dots-three-vertical" size={24} color="black" />
            </View>
         </View>
         <View className="w-full h-80 rounded-xl mt-3 relative flex justify-center items-center">
            <Image className="w-full h-full rounded-xl" source={{uri: picture}} resizeMode="cover" />
         </View>
      </View>
   );
};

export default PictureCard;
