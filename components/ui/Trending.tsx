import {View, Text, FlatList, Dimensions, Image} from 'react-native';
import Carousel from 'react-native-reanimated-carousel';
import React from 'react';

const Trending = ({posts}) => {
   const width = Dimensions.get('window').width;
   return (
      <View className="border-t-fuchsia-400 bg-cyan-400 flex-1 items-center justify-center">
         <Carousel
            loop
            width={width}
            height={width / 1.5}
            autoPlay={true}
            data={posts}
            scrollAnimationDuration={1000}
            onSnapToItem={(index) => index}
            renderItem={({item}) => (
               <View
                  style={{
                     flex: 1,
                     justifyContent: 'center',
                  }}
               >
                  <Image source={{uri: item.picture}} style={{width: '100%', height: '100%'}} resizeMode="cover" />
               </View>
            )}
         />
      </View>
   );
};

export default Trending;
