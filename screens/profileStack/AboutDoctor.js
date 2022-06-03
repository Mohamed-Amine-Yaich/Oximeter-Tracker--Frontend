import React, { useState, useEffect } from "react";
import { View, Text,StatusBar } from "react-native";

const AboutDoctor = ({ route, navigation }) => {
  const item = route.params.item;
  return (
    <View>
      <StatusBar backgroundColor="#009387" barStyle="light-content" />
      <Text> hello About Doctor Screen :</Text>
      <Text> {item.name}</Text>
    </View>
  );
};
export default AboutDoctor;
