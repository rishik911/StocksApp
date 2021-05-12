import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Profile from '../../ProfileModule/VIew/Profile';
import StocksChats from '../View/StocksChats';
import React from 'react';

const Tab = createBottomTabNavigator();

function MyTabs() {
  return (
    <Tab.Navigator
      tabBarOptions={{
        activeTintColor: '#d8dce6',
        activeBackgroundColor: '#2d467a',
        labelStyle: {fontSize: 18, bottom: 10},
      }}>
      <Tab.Screen name="Stocks" component={StocksChats} />
      <Tab.Screen name="Profile" component={Profile} />
    </Tab.Navigator>
  );
}

export default MyTabs;
