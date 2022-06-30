import * as React from "react";
import { NavigationContainer, Route } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { HomeScreen } from "../screens/Home";
import { DeviceScreen } from "../screens/Device";
import { Device } from "react-native-ble-plx";
import PatientTabNav from "../../screens/patientScreens/PatientTabNav";
import Icon from "react-native-vector-icons/Ionicons";

export type RootStackParamList = {
  Home: undefined;
  Device: { device: Device; token: undefined; currentUser: undefined };
};

const Stack = createStackNavigator<RootStackParamList>();
//DeviceSettings name of component
export const RootNavigator = ({ navigation, route }) => (
  /*  <NavigationContainer> */
  <Stack.Navigator /* mode="card" initialRouteName="Home" */>
    <Stack.Screen
      name="Home"
      options={{
        title: "Scan Devices",
        headerStyle: {
          backgroundColor: "#009387",
        },
        headerRight: () => (
          <Icon.Button
            borderRadius={0}
            name="ios-menu"
            size={25}
            color="#111"
            backgroundColor="#009387"
            onPress={() => navigation.openDrawer()}
          ></Icon.Button>
        ),
      }}
      component={HomeScreen}
    />
    <Stack.Screen
      name="Details"
      initialParams={{
        token: route.params.token,
        currentUser: route.params.currentUser,
        //the device is passed from a component in home screen to this tabNav
      }}
      options={{
        title: "Details",
        headerStyle: {
          backgroundColor: "#009387",
        },
        headerRight: () => (
          <Icon.Button
            borderRadius={0}
            name="ios-menu"
            size={25}
            color="#111"
            backgroundColor="#009387"
            onPress={() => navigation.openDrawer()}
          ></Icon.Button>
        ),
      }}
      component={PatientTabNav}
    />
  </Stack.Navigator>
  /*   </NavigationContainer> */
);
