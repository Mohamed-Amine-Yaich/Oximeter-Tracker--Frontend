import React, { Component } from "react";
import { View, Text, Button, TouchableOpacity, StatusBar } from "react-native";

function UpdatePassword({ navigation }) {
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      {/* remove the black statusbar */}
      <StatusBar backgroundColor="#009387" barStyle="light-content" />

      <Text> this is update Password screen</Text>
      {/*  <TouchableOpacity>
        <Text> get all </Text>
      </TouchableOpacity> */}
    </View>
  );
}
export default UpdatePassword;
