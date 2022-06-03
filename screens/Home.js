import React, { Component, useEffect, useState } from "react";
import { View, Text, Button, TouchableOpacity, StatusBar } from "react-native";
import { useTheme } from "@react-navigation/native";
import { getAllService } from "./../api/service";
import { AuthContext } from "../components/context";

import AsyncStorage from "@react-native-async-storage/async-storage";

//props is the token that is passed from the appjs
function HomeScreen({ navigation, route }) {
  const { getUserData, getToken } = React.useContext(AuthContext);
  const [token, setToken] = useState(null);
  const [userData, setUserData] = useState(null);

  //change the color of the home screen depend on the app
  const { colors } = useTheme();

  //check the dark propr return true if dark
  //use for change the color of the status bar
  const theme = useTheme();

  /*  const currentUser = getUserData();

  const { name, email, lastName, doctor, device, password, patient } = {
    ...currentUser,
  }; */

  const handelGetAll = async () => {
    /*      props is the token passed as props to the main tab and to the homescreen
     */ const data = await getAllService(token);

    console.log(data);
  };

  /* useEffect(() => {
    getData();
  });

  const getData = async () => {
    try {
      const value = await AsyncStorage.getItem("@storage_Key");
      if (value !== null) {
        setToken(value);
      }
    } catch (e) {
      console.log(e);
    }
  }; */

  /*   const curToken = getToken();
  console.log(curToken); */
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      {/* remove the black statusbar */}
      <StatusBar backgroundColor="#009387" barStyle="light-content" />
      {/* apply the color on the text depend on the theme */}
      {/* do not work cause navigation is not passed as params to component   */}
      <Button title="Open drawer" onPress={() => navigation.openDrawer()} />
      {/*  <Text style={{ color: colors.text }}> welcome {currentUser}</Text>
      <Text style={{ color: colors.text }}> welcome {email}</Text>
      <Text style={{ color: colors.text }}> welcome {password}</Text>
      <Text style={{ color: colors.text }}> welcome {name}</Text>
      <Text style={{ color: colors.text }}> welcome {patient}</Text> */}
      <Text style={{ color: colors.text }}> name : </Text>
      <Text style={{ color: colors.text }}> token:{route.params.token}</Text>

      <Text> this is HomeScreen</Text>
      <TouchableOpacity onPress={() => handelGetAll()}>
        <Text style={{ marginTop: 10 }}>get all</Text>
      </TouchableOpacity>
    </View>
  );
}
export default HomeScreen;
