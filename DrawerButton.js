import React from "react";
import { View, StatusBar, Text, Button } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import { useNavigation } from "@react-navigation/native";
const DrawerButton = () => {
  /* this works for open drawer 
  navigation in props don't work */
  const navigation = useNavigation();
  return (
    <Icon.Button
      borderRadius={0}
      name="ios-menu"
      size={25}
      color="#111"
      backgroundColor="#009387"
      onPress={() => navigation.openDrawer()}
    ></Icon.Button>
  );
};
export default DrawerButton;
