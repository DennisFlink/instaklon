import {View, Text, FlatList, Image, StyleSheet, RefreshControl, Alert} from 'react-native';
import React, {useEffect} from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import Images from '@/constants/Images';

import SearchInput from '@/components/ui/SearchInput';
import Trending from '@/components/ui/Trending';
import EmptyState from '@/components/ui/EmptyState';
import {getAllPosts, getLatestPosts} from '@/lib/appwrite';
import useAppWrite from '@/lib/useAppwrite';
import PictureCard from '../../components/ui/PictureCard';
import {useGlobalStore} from '@/context/GlobalProvider';

const Home = () => {
   const {data: posts, refetch} = useAppWrite(getAllPosts);
   const {data: latestPost} = useAppWrite(getLatestPosts);

   const [refreshing, setRefreshing] = React.useState(false);
   const {user, setUser, setIsLogged} = useGlobalStore();

   const onRefresh = async () => {
      setRefreshing(true);
      await refetch();
      setRefreshing(false);
   };
   useEffect(() => {}, [posts]);
   return (
      <SafeAreaView className="bg-white h-full">
         <FlatList
            data={posts}
            keyExtractor={(item) => item.$id}
            renderItem={({item}) => <PictureCard post={item} />}
            ListHeaderComponent={() => (
               <View className="my-6 px-4 space-y-6">
                  <View className=" justify-between items-start flex-row mb-6">
                     <View>
                        <Text className="font-pmedium text-sm">Hello </Text>
                        <Text className="text-2xl font-psemibold ">{user?.username}</Text>
                     </View>

                     <View className="mt-1.5 flex items-center justify-center">
                        <Image style={styles.image} source={Images.logo} resizeMode="contain" />
                     </View>
                  </View>
                  <SearchInput placeholder="Search for a picture" />
                  <View className="w-full flex-1 pt-5 pb-8">
                     <Text className="text-slate-600 text-lg font-pregular mb-3">Latest Pictures</Text>
                     <Trending posts={latestPost ?? []} />
                  </View>
               </View>
            )}
            ListEmptyComponent={() => <EmptyState title="No Pictures Found" subtitle="Be first to upload a picture" />}
            refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
         />
      </SafeAreaView>
   );
};

const styles = StyleSheet.create({
   image: {
      width: 80,
      height: 80,
   },
});
export default Home;
