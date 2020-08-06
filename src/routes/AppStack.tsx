import React from 'react';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack'; 

import Landing from './../pages/Landing';
import GiveClasses from '../pages/GiveClasses';
import StudyTab from './StudyTabs';

const Stack = createStackNavigator();

const AppStack: React.FC = () => {
  return (
    <NavigationContainer>
        <Stack.Navigator screenOptions={{headerShown: false}}>
          <Stack.Screen name="Landing" component={Landing}/>
          <Stack.Screen name="GiveClasses" component={GiveClasses} />
          <Stack.Screen name="Study" component={StudyTab} />
        </Stack.Navigator>
    </NavigationContainer>
  )
}

export default AppStack;