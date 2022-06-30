/* import React, { Component, useEffect, useState } from "react";
import { View, Text, Button, TouchableOpacity, StatusBar } from "react-native";
import { useTheme } from "@react-navigation/native";
import Icon from "react-native-vector-icons/Ionicons";
import Settings from './Settings';

function Patients({ navigation, route }) {
 

  //change the color of the home screen depend on the app
  const { colors } = useTheme();

  //check the dark propr return true if dark
  //use for change the color of the status bar
  const theme = useTheme();

 
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <StatusBar backgroundColor="#009387" barStyle="light-content" />
      <Icon.Button
        name="ios-menu"
        borderRadius={0}
        size={25}
        color="#111"
        backgroundColor="#009387"
        onPress={() => navigation.openDrawer()}
      ></Icon.Button>
      <Text> this is Patients Screen</Text>
    
    </View>
  );
}
export default Patients; */
import React, { Component, useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  Alert,
  ScrollView,
  TextInput,
  FlatList,
  StatusBar,
} from "react-native";
import { useTheme } from "@react-navigation/native";

import { getAllPatientsAdmin } from "../../api/service";

import Icon from "react-native-vector-icons/Ionicons";
import DrawerButton from "../../DrawerButton";
function Patients({ navigation, route }) {
  //change the color of the home screen depend on the app

  const { colors } = useTheme();

  //check the dark propr return true if dark
  //use for change the color of the status bar
  const theme = useTheme();
  const [list, setList] = useState(null);

  useEffect(async () => {
    const data = await getAllPatientsAdmin(route.params.token);
    setList(data);
    console.log(" list of users :" + data);
  }, []);

  const renderTags = item => {
    return (
      <>
        <TouchableOpacity style={styles.btnColor}>
          <Text>{item.email}</Text>
        </TouchableOpacity>
      </>
    );
  };

  return (
    <View style={{ flex: 1 }}>
      <StatusBar backgroundColor="#009387" barStyle="light-content" />
      {/*  <Icon.Button
        name="ios-menu"
        borderRadius={0}
        size={25}
        color="#111"
        backgroundColor="#009387"
        onPress={() => navigation.openDrawer()}
        style={{alignSelf:"flex-end"}}
      ></Icon.Button> */}
      <DrawerButton />

      <FlatList
        style={styles.notificationList}
        data={list}
        renderItem={({ item }) => {
          return (
            <TouchableOpacity
              style={[styles.card, { borderColor: "#009387" }]}
              onPress={() => {
                /* when we press on a doctor we navigate to doctor about screen  that describe the specific doctor */

                navigation.navigate("AboutPatients", { item });
              }}
            >
              <View style={styles.cardContent}>
                <Image
                  style={[styles.image, styles.imageContent]}
                  source={{
                    uri: "https://bootdey.com/img/Content/avatar/avatar2.png",
                  }}
                />

                <Text style={styles.name}>
                  <Text style={{ fontWeight: "normal" }}>{item.name} </Text>
                </Text>
              </View>
              <View style={[styles.cardContent, styles.tagsContent]}>
                {/* diplay tages in the card (default tmeplate ) with that function  
                we can add some info about doctor (rating,email )  */}
                {renderTags(item)}
              </View>
            </TouchableOpacity>
          );
        }}
      />
    </View>
  );
}
export default Patients;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#EBEBEB",
  },
  formContent: {
    flexDirection: "row",
    marginTop: 30,
  },
  inputContainer: {
    borderBottomColor: "#F5FCFF",
    backgroundColor: "#FFFFFF",
    borderRadius: 30,
    borderBottomWidth: 1,
    height: 45,
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
    margin: 10,
  },
  icon: {
    width: 30,
    height: 30,
  },
  iconBtnSearch: {
    alignSelf: "center",
  },
  inputs: {
    height: 45,
    marginLeft: 16,
    borderBottomColor: "#FFFFFF",
    flex: 1,
  },
  inputIcon: {
    marginLeft: 15,
    justifyContent: "center",
  },
  notificationList: {
    marginTop: 20,
    padding: 10,
  },
  card: {
    height: null,
    paddingTop: 10,
    paddingBottom: 10,
    marginTop: 5,
    backgroundColor: "#FFFFFF",
    flexDirection: "column",
    borderTopWidth: 40,
    marginBottom: 20,
  },
  cardContent: {
    flexDirection: "row",
    marginLeft: 10,
  },
  imageContent: {
    marginTop: -40,
  },
  tagsContent: {
    marginTop: 10,
    flexWrap: "wrap",
  },
  image: {
    width: 60,
    height: 60,
    borderRadius: 30,
  },
  name: {
    fontSize: 15,
    fontWeight: "bold",
    marginLeft: 10,
    alignSelf: "center",
  },
  btnColor: {
    padding: 10,
    borderRadius: 40,
    marginHorizontal: 3,
    backgroundColor: "#eee",
    marginTop: 5,
  },
});
