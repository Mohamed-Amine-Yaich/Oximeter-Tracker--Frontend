import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { HomeScreen } from "../screens/Home";
import { DeviceScreen } from "../screens/Device";
import { Device } from "react-native-ble-plx";
import Icon from "react-native-vector-icons/Ionicons";

export type RootStackParamList = {
  Home: undefined;
  Device: { device: Device };
};

const Stack = createStackNavigator<RootStackParamList>();

export const RootNavigator = () => (
  /*  <NavigationContainer> */
  <Stack.Navigator mode="card" initialRouteName="Home">
    <Stack.Screen
      name="Home"
      options={{
        title: "Scan Devices",
        headerStyle: {
          backgroundColor: "#009387",
        },
        headerLeft: () => (
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
    <Stack.Screen name="Device" component={DeviceScreen} />
  </Stack.Navigator>
  /*   </NavigationContainer> */
);
