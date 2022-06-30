/* import React from "react";
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";

//import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

import Icon from "react-native-vector-icons/Ionicons";

import Settings from "./Settings";
import HomeScreen from "./Home";
//import HomeStackScreen from './HomeStackScreen'; 
import Profile from "./Profile";
import Notification from "./Notification";
import PatientStackScreen from "./doctorScreens/PatientsStack";
import Patients from "./doctorScreens/Patients";
import User from "./doctorScreens/User";

//for the homeStackScreen component
import DetailsScreen from "./details";
const HomeStack = createStackNavigator();
const DetailStack = createStackNavigator();
 const Tab = createMaterialBottomTabNavigator();

function MainTabScreen({ navigation, route }) {
  return (
    <Tab.Navigator
      initialRouteName="Home"
      activeColor="#fff"
      barStyle={{ backgroundColor: "#009387" }}
    >
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        initialParams={{ token: route.params.token }}
        options={{
          tabBarLabel: "Home",
          tabBarColor: "#009387",
          tabBarIcon: ({ color }) => (
            <Icon name="ios-home" color={color} size={26} />
          ),
        }}
      />
      <Tab.Screen
        name="Details"
        component={DetailsScreen}
        options={{
          tabBarLabel: "Detail",
          tabBarColor: "#009387",
          tabBarIcon: ({ color }) => (
            <Icon name="ios-home" color={color} size={26} />
          ),
        }}
      />
      <Tab.Screen
        name="Notification"
        component={Notification}
        options={{
          headerStyle: {
            backgroundColor: "#1f65ff",
          },
          tabBarLabel: "Message",
          tabBarColor: "#009387",
          tabBarIcon: ({ color }) => (
            <Icon name="ios-text-outline" color={color} size={26} />
          ),
        }}
      />

     
    </Tab.Navigator>
  );
}

export default MainTabScreen;

const HomeStackScreen = ({ navigation }) => (
  <HomeStack.Navigator
    screenOptions={{
      headerStyle: {
        backgroundColor: "#009387",
      },
    
      headerTintColor: "#fff",
      headerTitleStyle: {
        fontWeight: "bold",
      },
    }}
  >
    <HomeStack.Screen
      name="Home"
      component={HomeScreen}
      options={{
        headerLeft: () => (
          <Icon.Button
            name="ios-menu"
            size={25}
            color="#111"
            backgroundColor="#009387"
            onPress={() => navigation.openDrawer()}
          ></Icon.Button>
        ),
      }}
    />
  </HomeStack.Navigator>
);

const DetailStackScreen = ({ navigation }) => (
  <DetailStack.Navigator

  >
    <DetailStack.Screen
      name="Detail"
      component={DetailsScreen}
      options={{
        headerStyle: {
          backgroundColor: "#009387",
        },
       
        headerTintColor: "#fff",
        headerTitleStyle: {
          fontWeight: "bold",
        },
        headerLeft: () => (
          <Icon.Button
            name="ios-menu"
            size={25}
            color="#111"
            backgroundColor="#009387"
            onPress={() => navigation.openDrawer()}
          ></Icon.Button>
        ),
      }}
    />
  </DetailStack.Navigator>
);
 */
