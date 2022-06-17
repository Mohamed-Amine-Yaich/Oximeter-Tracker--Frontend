import React, { Component, useEffect, useState } from "react";
import { View, Text, Button, TouchableOpacity, StatusBar } from "react-native";
import { useTheme } from "@react-navigation/native";
import Icon from "react-native-vector-icons/Ionicons";




function Settings({ navigation, route }) {
 

  //change the color of the home screen depend on the app
  const { colors } = useTheme();

  //check the dark propr return true if dark
  //use for change the color of the status bar
  const theme = useTheme();

 
  return (
    <View style={{ flex: 1 }}>
     <StatusBar backgroundColor="#009387" barStyle="light-content" />
      <Icon.Button
        name="ios-menu"
        borderRadius={0}
        size={25}
        color="#111"
        backgroundColor="#009387"
        onPress={() => navigation.openDrawer()}
      ></Icon.Button>
      <Text> this is Settings Screen</Text>
    
    </View>
  );
}
export default Settings;