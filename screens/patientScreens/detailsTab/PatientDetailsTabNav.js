import React from "react";
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";

import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import Font from "react-native-vector-icons/FontAwesome5";

import MessageScreen from "../../MessageScreen";

import DetailsChartScreen from "./DetailsChartScreen";
import DataHistorique from "../DataHistorique";
const Tab = createMaterialBottomTabNavigator();

function PatientDetailsTabNav({ navigation, route }) {
  return (
    <Tab.Navigator activeColor="#fff" barStyle={{ backgroundColor: "#009387" }}>
      <Tab.Screen
        name="chart"
        component={DetailsChartScreen}
        initialParams={{
          token: route.params.token,
          currentUser: route.params.currentUser,
          device: route.params.device,
        }}
        options={{
          tabBarLabel: "Chart",
          tabBarColor: "#009387",
          tabBarIcon: ({ color }) => (
            <Icon name="chart-line" color={color} size={26} />
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

export default PatientDetailsTabNav;

const PatientDataStack = createStackNavigator();
