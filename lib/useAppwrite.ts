import {Alert} from 'react-native';
import React from 'react';
type FetchFunction<T> = () => Promise<T>;

const useAppWrite = <T>(fn: FetchFunction<T>) => {
   const [data, setData] = React.useState<T | null>(null);
   const [isLoding, setIsLoading] = React.useState(true);

   const fetchData = async () => {
      setIsLoading(true);
      try {
         const respone = await fn();
         setData(respone);
      } catch (error) {
         console.error(error);
         Alert.alert('Error', 'Something went wrong');
      } finally {
         setIsLoading(false);
      }
   };
   React.useEffect(() => {
      fetchData();
   }, []);

   const refetch = async () => {
      await fetchData();
   };
   return {data, isLoding, refetch};
};

export default useAppWrite;
