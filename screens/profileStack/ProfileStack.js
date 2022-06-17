import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
const ProfileStack = createStackNavigator();

import Icon from "react-native-vector-icons/Ionicons";
import Profile from "../Profile";
/* replaced by commun list for the screen that desplay doctorlist */
import UpdateDoctor from "./UpdateDoctor";
import CommunList from "./../CommunList"
import UpdateMe from "./UpdateMe";
import UpdatePassword from "./UpdatePassword";
import AboutDoctor from './AboutDoctor';

const ProfileStackScreens = ({ navigation, route }) => (
  <ProfileStack.Navigator initialRouteName="Profile">
    <ProfileStack.Screen
      name="Profile"
      component={Profile}
      initialParams={{ token: route.params.token }}
      options={{
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
      /* for using the token pass the token from the app js to the 
       ProfileStack in the drawer navigation */
      /*     initialParams={{ token: route.params.token }} */
    />
    <ProfileStack.Screen
      name="UpdateDoctor"
      component={CommunList}
      initialParams={{ token: route.params.token }}
      options={{
        headerStyle: {
          backgroundColor: "#009387",
        },
      }}
    />
    <ProfileStack.Screen
      name="AboutDoctor"
      component={AboutDoctor}
      initialParams={{ token: route.params.token }}
      options={{
        headerStyle: {
          backgroundColor: "#009387",
        },
      }}
    />
    <ProfileStack.Screen
      name="UpdateMe"
      component={UpdateMe}
      initialParams={{ token: route.params.token }}
      options={{
        headerStyle: {
          backgroundColor: "#009387",
        },
      }}
    />
    <ProfileStack.Screen
      name="UpdatePassword"
      component={UpdatePassword}
      initialParams={{ token: route.params.token }}
      options={{
        headerStyle: {
          backgroundColor: "#009387",
        },
      }}
    />
  </ProfileStack.Navigator>
);

export default ProfileStackScreens;
