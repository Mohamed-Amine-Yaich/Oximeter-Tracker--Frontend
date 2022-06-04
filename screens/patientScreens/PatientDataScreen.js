import React, { useState, useEffect } from "react";
import { View, Text, StatusBar } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
const PatientDataScreen = ({ route, navigation }) => {
  /* this screen is data screen of patient 
 - when user is a doctor he select the user from the list then user data is passed to  this screen 
 -when user is patient he must require for his data from backend 
 -test depend of the user make a condition or (or if there is an item on the route
   means that we navigate to this screen from the list /or we query for user data from backend  ) 
 */


  return (
    /* add the top left button to message screen */
    <View>
      <StatusBar backgroundColor="#009387" barStyle="light-content" />
      <Icon.Button
        name="ios-menu"
        size={25}
        color="#111"
        backgroundColor="#009387"
        onPress={() => navigation.openDrawer()}
      ></Icon.Button>
      <Text> hello from patient data screen</Text>
      <Text> {route.params.token}</Text>
      <Text>current user : {route.params.currentUser.name}</Text>
      <Text>current user : {route.params.currentUser.lastName}</Text>
      <Text>current user : {route.params.currentUser.role}</Text>
      


    </View>
  );
};
export default PatientDataScreen;
