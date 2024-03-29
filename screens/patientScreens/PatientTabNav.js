import React from "react";
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";

import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import Font from "react-native-vector-icons/FontAwesome5";
//import Icon from "react-native-vector-icons/Ionicons";

//in the patient tab nav i use 3 screen
//when we select a user we enter the tab nav that containe userDetails(data),message,home
/* import HomeScreen from "../Home"; */
//this present user details
import MessageScreen from "../MessageScreen";
import { DeviceScreen } from "../../ble/screens/Device";
import DataHistorique from "./DataHistorique";
const Tab = createMaterialBottomTabNavigator();

function PatientTabNav({ navigation, route }) {
  return (
    <Tab.Navigator activeColor="#fff" barStyle={{ backgroundColor: "#009387" }}>
      <Tab.Screen
        name="Device"
        component={DeviceScreen}
        initialParams={{
          token: route.params.token,
          currentUser: route.params.currentUser,
          device: route.params.device,
        }}
        options={{
          title: "device connected",
          tabBarLabel: "Patient Details",
          tabBarColor: "#009387",
          tabBarIcon: ({ color }) => (
            <Icon name="account-details" color={color} size={26} />
          ),
        }}
      />

      <Tab.Screen
        name="Historique"
        component={DataHistorique}
        initialParams={{
          token: route.params.token,
          currentUser: route.params.currentUser,
        }}
        options={{
          tabBarLabel: "Historique",
          tabBarColor: "#009387",
          tabBarIcon: ({ color }) => (
            <Font name="book-medical" color={color} size={26} />
          ),
        }}
      />
      <Tab.Screen
        name="Message"
        component={MessageScreen}
        initialParams={{
          token: route.params.token,
          currentUser: route.params.currentUser,
        }}
        options={{
          tabBarLabel: "Message",
          tabBarColor: "#009387",
          tabBarIcon: ({ color }) => (
            <Icon name="message-text-outline" color={color} size={26} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

export default PatientTabNav;

const PatientDataStack = createStackNavigator();
