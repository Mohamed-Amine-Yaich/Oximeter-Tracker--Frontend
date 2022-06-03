import React, { Component } from "react";
import Home from "./Home";
import { createStackNavigator } from "@react-navigation/stack";

import Icon from "react-native-vector-icons/Ionicons";

const HomeStack = createStackNavigator();

//we create a home stack that containe lonly the home screen for adding
//the header left button
export default function HomeStackScreen({ navigation }) {
  return (
    <HomeStack.Navigator
      initialRouteName="Home"
      screenOptions={{
        headerLeft: () => (
          <Icon.Button
            name="ios-menu"
            size={25}
            color="#111"
            backgroundColor="#009387"
            onPress={() => navigation.openDrawer()}
          ></Icon.Button>
        ),
        headerStyle: {
          backgroundColor: "#009387",
        },
        /*   headerShown: false, */
        headerTintColor: "#fff",
        headerTitleStyle: {
          fontWeight: "bold",
        },
      }}
    >
      <HomeStack.Screen name="Home" component={Home} />
    </HomeStack.Navigator>
  );
}
