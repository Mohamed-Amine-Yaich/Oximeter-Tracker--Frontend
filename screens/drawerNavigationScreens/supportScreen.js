import React, { Component } from "react";
import { View, Text, Button, TouchableOpacity } from "react-native";
import { StatusBar } from "expo-status-bar";
/* import { getAllService } from "./../api/service";
import { AuthContext } from "../components/context"; */

function SupportScreen({ navigation }) {
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
      <StatusBar style="auto" />

      <Text> this is Support Screen</Text>
      <TouchableOpacity>
        <Text> get all </Text>
      </TouchableOpacity>
    </View>
  );
}
export default SupportScreen;
