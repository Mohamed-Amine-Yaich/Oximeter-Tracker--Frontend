/* import React, { Component, useEffect, useState } from "react";
import { View, Text, Button, TouchableOpacity, StatusBar } from "react-native";
import { useTheme } from "@react-navigation/native";
import { getAllService } from "./../api/service";
import { AuthContext } from "../components/context";

function HomeScreen({ navigation, route }) {
  const { getUserData, getToken } = React.useContext(AuthContext);
  const [token, setToken] = useState(null);
  const [userData, setUserData] = useState(null);

  const { colors } = useTheme();

  const theme = useTheme();

  const handelGetAll = async () => {
    const data = await getAllService(token);

    console.log(data);
  };

  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <StatusBar backgroundColor="#009387" barStyle="light-content" />

      <Button title="Open drawer" onPress={() => navigation.openDrawer()} />

      <Text style={{ color: colors.text }}> name : </Text>
      <Text style={{ color: colors.text }}> token:{route.params.token}</Text>

      <Text> this is HomeScreen</Text>
      <TouchableOpacity onPress={() => handelGetAll()}>
        <Text style={{ marginTop: 10 }}>get all</Text>
      </TouchableOpacity>
    </View>
  );
}
export default HomeScreen; */
