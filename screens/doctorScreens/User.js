import React, { useState, useEffect } from "react";
import { View, Text,StatusBar } from "react-native";

const User = ({ route, navigation }) => {
  const item = route.params.item;
  return (
    <View>
      <StatusBar backgroundColor="#009387" barStyle="light-content" />
      <Text> hello from user details</Text>
      <Text> {item.name}</Text>
      <Text> {route.params.token}</Text>
    </View>
  );
};
export default User;
