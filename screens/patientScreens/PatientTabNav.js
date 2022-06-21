import React from "react";
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";

import Icon from "react-native-vector-icons/MaterialCommunityIcons";

//import Icon from "react-native-vector-icons/Ionicons";

//in the patient tab nav i use 3 screen
//when we select a user we enter the tab nav that containe userDetails(data),message,home
/* import HomeScreen from "../Home"; */
//this present user details
import PatientDataScreen from "./PatientDataScreen";
import MessageScreen from "../MessageScreen";
import BluetoothScanner from "../../ble/BluetoothScanner";
import { HomeScreen } from "../../ble/screens/Home";
import { DeviceScreen } from "../../ble/screens/Device";
import { RootNavigator } from "../../ble/navigation";
const Tab = createMaterialBottomTabNavigator();

function PatientTabNav({ navigation, route }) {
  return (
    <Tab.Navigator
      initialRouteName="ScanRoot"
      activeColor="#fff"
      barStyle={{ backgroundColor: "#009387" }}
    >
      {/*  <Tab.Screen
        name="Home"
        component={HomeScreen} /* send  props the home screen  */
      /*   not works because the route containe the item(user data) initialParams={{ token: route.params.token }} 
        initialParams={{ token: route.params.token }}
        options={{
          tabBarLabel: "Home",
          tabBarColor: "#009387",
          tabBarIcon: ({ color }) => (
            <Icon name="home" color={color} size={26} />
          ),
        }}
      /> */}
      {/*     <Tab.Screen
        name="ScanRoot"
        component={RootNavigator}
        /* initialParams={{
          token: route.params.token,
          currentUser: route.params.currentUser,
        }} 
        options={{
          title: "scan devices",
          tabBarLabel: "Patient Details",
          tabBarColor: "#009387",
          tabBarIcon: ({ color }) => (
            <Icon name="account-details" color={color} size={26} />
          ),
        }}
      /> */}
      {/*  <Tab.Screen
        name="ScanDevices"
        component={HomeScreen} */
      /* initialParams={{
          token: route.params.token,
          currentUser: route.params.currentUser,
        }} */
      /*   options={{
          title: "scan devices",
          tabBarLabel: "Patient Details",
          tabBarColor: "#009387",
          tabBarIcon: ({ color }) => (
            <Icon name="account-details" color={color} size={26} />
          ),
        }}
      /> */
      /* <Tab.Screen
        name="ConnectedDevice"
        component={DeviceScreen} */
      /*  initialParams={{
          token: route.params.token,
          currentUser: route.params.currentUser,
        }} */
      /*  options={{
          title: "device connected",
          tabBarLabel: "Patient Details",
          tabBarColor: "#009387",
          tabBarIcon: ({ color }) => (
            <Icon name="account-details" color={color} size={26} />
          ),
        }}
      /> */}
      <Tab.Screen
        name="PatientData"
        component={PatientDataScreen}
        initialParams={{
          token: route.params.token,
          currentUser: route.params.currentUser,
        }}
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

/* const PatientDataStackScreen = ({ navigation,route }) => (
    <PatientDataStack.Navigator
 
    >
      <PatientDataStack.Screen
        name="PatientData"
        component={PatientDataScreen}
        initialParams={{ item: route.params.item }}
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
    </PatientDataStack.Navigator>
  ); */
