import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import MyTabs from '../../StockChartModule/utils/TabNavigator';
import Login from '../View/Login';

const Stack = createStackNavigator();
const AuthNavigation = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{headerShown: false}}>
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="StocksScreen" component={MyTabs} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AuthNavigation;
