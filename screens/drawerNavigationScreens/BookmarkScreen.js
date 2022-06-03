import React, { Component } from "react";
import { View, Text, Button, TouchableOpacity, StatusBar } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
/* import { getAllService } from "./../api/service";
import { AuthContext } from "../components/context"; */

function bookmark({ navigation, route }) {
  return (
    <View style={{ flex: 1 }}>
      {/* remove the black statusbar */}
      <StatusBar backgroundColor="#009387" barStyle="light-content" />
      <Icon.Button
        name="ios-menu"
        size={25}
        color="#111"
        backgroundColor="#009387"
        onPress={() => navigation.openDrawer()}
      ></Icon.Button>
      <Text> this is bookmark Screen</Text>
      <TouchableOpacity>
        <Text> token : {route.params.token} </Text>
      </TouchableOpacity>
    </View>
  );
}
export default bookmark;
