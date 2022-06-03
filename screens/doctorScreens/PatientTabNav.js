import React from "react";
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";

import Icon from "react-native-vector-icons/MaterialCommunityIcons";

//import Icon from "react-native-vector-icons/Ionicons";

//in the patient tab nav i use 3 screen
//when we select a user we enter the tab nav that containe userDetails(data),message,home
import HomeScreen from "../Home";
//this present user details
import User from "./User";
import Message from "../MessageScreen";

const Tab = createMaterialBottomTabNavigator();

function PatientTabNav({ navigation, route }) {
  return (
    <Tab.Navigator
      initialRouteName="User"
      activeColor="#fff"
      barStyle={{ backgroundColor: "#009387" }}
    >
      <Tab.Screen
        name="Home"
        component={HomeScreen} /* send  props the home screen  */
     /*   not works because the route containe the item(user data) initialParams={{ token: route.params.token }} */
     initialParams={{ token: route.params.token }}
       
     options={{
       
          tabBarLabel: "Home",
          tabBarColor: "#009387",
          tabBarIcon: ({ color }) => (
            <Icon name="home" color={color} size={26} />
          ),
        }}
      />
      <Tab.Screen
        name="User"
        component={User }
        initialParams={{ item: route.params.item }}
        options={{
          tabBarLabel: "Patient Details",
          tabBarColor: "#009387",
          tabBarIcon: ({ color }) => (
            <Icon name="account-details" color={color} size={26} />
          ),
        }}
      />
      <Tab.Screen
        name="Message"
        component={Message}
        options={{
          headerStyle: {
            backgroundColor: "#1f65ff",
          },
          tabBarLabel: "Message",
          tabBarColor: "#009387",
          tabBarIcon: ({ color }) => (
            <Icon name="message-text-outline" color={color} size={26} />
          ),
        }}
      />

      {/* <Tab.Screen
        name="Profile"
        component={Profile}
        initialParams={{ token: route.params.token }}
        options={{
          tabBarLabel: "Profile",
          tabBarColor: "#009387",
          tabBarIcon: ({ color }) => (
            <Icon name="ios-person" color={color} size={26} />
          ),
        }}
      /> */}
    </Tab.Navigator>
  );
}

export default PatientTabNav;
