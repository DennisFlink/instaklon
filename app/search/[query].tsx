import {View, Text, FlatList, Image, StyleSheet, RefreshControl, Alert} from 'react-native';
import React from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import Images from '@/constants/Images';

import SearchInput from '@/components/ui/SearchInput';
import Trending from '@/components/ui/Trending';
import EmptyState from '@/components/ui/EmptyState';
import {searchPost} from '@/lib/appwrite';
import useAppWrite from '@/lib/useAppwrite';
import PictureCard from '../../components/ui/PictureCard';
import {useLocalSearchParams} from 'expo-router';

const Search = () => {
   const {query} = useLocalSearchParams();
   const searchQuery = Array.isArray(query) ? query[0] : query;
   const {data: posts} = useAppWrite(() => searchPost(searchQuery));

   return (
      <SafeAreaView className="bg-white h-full">
         <FlatList
            data={posts}
            keyExtractor={(item) => item.$id}
            renderItem={({item}) => <PictureCard post={item} />}
            ListHeaderComponent={() => (
               <View className="my-6 px-4 ">
                  <Text className="font-pmedium text-sm">Search result</Text>
                  <Text className="text-2xl font-psemibold ">{query}</Text>
                  <View className="mt-6 mb-8">
                     <SearchInput initialQuery={query} />
                  </View>
               </View>
            )}
            ListEmptyComponent={() => <EmptyState title="No Pictures Found" subtitle="No pictures found for this search" />}
         />
      </SafeAreaView>
   );
};

export default Search;
