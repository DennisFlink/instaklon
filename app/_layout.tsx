import FontAwesome from '@expo/vector-icons/FontAwesome';
import {DarkTheme, DefaultTheme, ThemeProvider} from '@react-navigation/native';
import {useFonts} from 'expo-font';
import {Stack} from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import {useEffect} from 'react';
import 'react-native-reanimated';
import {useColorScheme} from '@/components/useColorScheme';
import {useGlobalStore} from '@/context/GlobalProvider';
import '../global.css';

export {
   // Catch any errors thrown by the Layout component.
   ErrorBoundary,
} from 'expo-router';

export const unstable_settings = {
   // Ensure that reloading on `/modal` keeps a back button present.
};

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
   const [fontsLoaded, error] = useFonts({
      'Poppins-Black': require('../assets/fonts/Poppins-Black.ttf'),
      'Poppins-Bold': require('../assets/fonts/Poppins-Bold.ttf'),
      'Poppins-ExtraBold': require('../assets/fonts/Poppins-ExtraBold.ttf'),
      'Poppins-ExtraLight': require('../assets/fonts/Poppins-ExtraLight.ttf'),
      'Poppins-Light': require('../assets/fonts/Poppins-Light.ttf'),
      'Poppins-Medium': require('../assets/fonts/Poppins-Medium.ttf'),
      'Poppins-Regular': require('../assets/fonts/Poppins-Regular.ttf'),
      'Poppins-SemiBold': require('../assets/fonts/Poppins-SemiBold.ttf'),
      'Poppins-Thin': require('../assets/fonts/Poppins-Thin.ttf'),
   });
   // Expo Router uses Error Boundaries to catch errors in the navigation tree.
   const {fetchCurrentUser} = useGlobalStore();
   useEffect(() => {
      if (error) throw error;
   }, [error]);

   useEffect(() => {
      if (fontsLoaded) {
         SplashScreen.hideAsync();
         fetchCurrentUser();
      }
   }, [fontsLoaded]);

   if (!fontsLoaded) {
      return null;
   }

   return <RootLayoutNav />;
}

function RootLayoutNav() {
   const colorScheme = useColorScheme();

   return (
      <Stack>
         <Stack.Screen name="index" options={{headerShown: false}} />
         <Stack.Screen name="(auth)" options={{headerShown: false}} />
         <Stack.Screen name="(tabs)" options={{headerShown: false}} />
         <Stack.Screen name="search/[query]" options={{headerShown: false}} />
      </Stack>
   );
}