import React, { Component } from "react";
import { View, Text, Button, TouchableOpacity } from "react-native";
import { StatusBar } from "expo-status-bar";
/* import { getAllService } from "./../api/service";
import { AuthContext } from "../components/context"; */

function DetailsScreen({ navigation }) {
  /* const { getUserData } = React.useContext(AuthContext);

  const [currentUser, token] = getUserData();

  const { name, email, lastName, doctor, device, password, patient } = {
    ...currentUser,
  };

  const handelGetAll = async () => {
    console.log(token);
    const data =await getAllService(token);
    console.log("data from the handel get all : ");
    console.log(data);
  };
 */
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      {/* remove the black statusbar */}
      <StatusBar backgroundColor="#009387" barStyle="light-content" />

      <Text> this is DetailScreen</Text>
      <TouchableOpacity>
        <Text> get all </Text>
      </TouchableOpacity>
    </View>
  );
}
export default DetailsScreen;
