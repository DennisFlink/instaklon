import {View, Text} from 'react-native';
import React from 'react';
interface InfoBoxProps {
   title?: string | number;
   containerStyling?: string;
   titleStyling?: string;
   subTitle?: string;
}

const InfoBox = ({title, containerStyling, titleStyling, subTitle}: InfoBoxProps) => {
   return (
      <View className={containerStyling}>
         <Text className={` text-center font-psemibold ${titleStyling} `}>{title}</Text>
         <Text className="text-sm text-gray-600 text-center font-pregular">{subTitle}</Text>
      </View>
   );
};

export default InfoBox;
