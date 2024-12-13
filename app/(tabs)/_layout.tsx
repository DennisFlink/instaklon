import React from 'react';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import {View, Text, Image} from 'react-native';
import {Tabs, Redirect} from 'expo-router';

const TabsLayout = () => {
   return (
      <>
         <Tabs
            screenOptions={{
               tabBarActiveTintColor: '#FF3310',
               tabBarInactiveTintColor: '#CDCDE0',

               tabBarLabelStyle: {textAlignVertical: 'center'},
               tabBarStyle: {
                  backgroundColor: '#fff',
                  borderTopWidth: 1,
                  height: 84,
                  paddingBottom: 0,
               },
            }}
         >
            <Tabs.Screen name="home" options={{title: 'Home', headerShown: false, tabBarIcon: ({color}) => <FontAwesome size={30} name="home" color={color} />}} />
            {/*             <Tabs.Screen name="bookmark" options={{title: 'Bookmark', headerShown: false, tabBarIcon: ({color}) => <FontAwesome size={30} name="bookmark" color={color} />}} /> */}
            <Tabs.Screen name="create" options={{title: 'Create', headerShown: false, tabBarIcon: ({color}) => <FontAwesome size={30} name="plus" color={color} />}} />
            <Tabs.Screen name="profile" options={{title: 'Profile', headerShown: false, tabBarIcon: ({color}) => <FontAwesome size={30} name="user" color={color} />}} />
         </Tabs>
      </>
   );
};

export default TabsLayout;
