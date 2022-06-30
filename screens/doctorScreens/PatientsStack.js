import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import Patients from "./Patients";
import User from "./User";
import PatientTabNav from "./PatientTabNav";
import CommunList from "../CommunList";
const PatientStack = createStackNavigator();

import Icon from "react-native-vector-icons/Ionicons";

const PatientStackScreen = ({ navigation, route }) => (
  <PatientStack.Navigator initialRouteName="Patients">
    <PatientStack.Screen
      name="Patients"
      component={
        CommunList
      } /* component={Patients} */ /* replace the patients screen commun list screen */
      initialParams={{
        token: route.params.token,
        currentUser: route.params.currentUser,
      }}
      options={{
        title: "Patient List ",
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
      /* for using the token pass the token from the app js to the 
       patientStack in the drawer navigation */
      /*     initialParams={{ token: route.params.token }} */
    />
    <PatientStack.Screen
      name="PatientTabNav"
      component={PatientTabNav}
      initialParams={{
        token: route.params.token,
        currentUser: route.params.currentUser,
      }}
      options={{
        title: " Historique and Messages ",
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
    />
  </PatientStack.Navigator>
);

export default PatientStackScreen;
