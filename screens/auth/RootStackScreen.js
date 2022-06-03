import React from "react";

import Login from "./Login";
import Signup from "./Signup";
import ForgetPassword from "./ForgetPassword";
import ResetPassword from "./ResetPassword";
import Splash from "./Splash";

import { createStackNavigator } from "@react-navigation/stack";

const RootStack = createStackNavigator();

function RootStackScreen({ navigation }) {
  return (
    <RootStack.Navigator
      initialRouteName="Splash"
      screenOptions={{
        headerStyle: {
          backgroundColor: "#009387",
        },
        headerShown: false,
        headerTintColor: "#fff",
        headerTitleStyle: {
          fontWeight: "bold",
        },
      }}
    >
      <RootStack.Screen name="Splash" component={Splash} />

      <RootStack.Screen name="Login" component={Login} />
      <RootStack.Screen name="Signup" component={Signup} />
      <RootStack.Screen name="ForgetPassword" component={ForgetPassword} />
      <RootStack.Screen name="ResetPassword" component={ResetPassword} />
    </RootStack.Navigator>
  );
}

export default RootStackScreen;
