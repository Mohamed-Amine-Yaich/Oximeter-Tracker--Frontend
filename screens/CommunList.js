/* import React, { Component } from "react";
import { View, Text, Button, TouchableOpacity, StatusBar } from "react-native";

function UpdateDoctor({ navigation }) {
  useEffect(async () => {
    const data = await getAllService(route.params.token);
    setDoctors(data);
    console.log("doctor list :" + data);
  }, []);

  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <StatusBar backgroundColor="#009387" barStyle="light-content" />

      <Text> this is update doctor screen</Text>
    </View>
  );
}
export default UpdateDoctor; */

import React, { Component, useState, useEffect } from "react";
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

import AsyncStorage from "@react-native-async-storage/async-storage";

import { getAllService } from "../api/service";
//import { AuthContext } from "../../components/context";

/* passing the token as prop in tab navigation */
const CommunList = ({ navigation, route }) => {
  //const { getToken } = React.useContext(AuthContext);
  const [list, setList] = useState(null);
  /*  const [value, setValue] = useState(null); */

  useEffect(async () => {
    const data = await getAllService(route.params.token);
    setList(data);
    console.log("doctor list :" + data);
  }, []);

  const renderTags = item => {
    return (
      <>
        <TouchableOpacity style={styles.btnColor}>
          <Text>{item.email}</Text>
        </TouchableOpacity>
        {item.role === "patient" ? (
          <TouchableOpacity
            style={styles.btnColor}
            onPress={() => {
              /* about device another screen descripbe the device !!! */
            }}
          >
            <Text>device: {item.device}</Text>
          </TouchableOpacity>
        ) : null}
      </>
    );
  };

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor="#009387" barStyle="light-content" />
      <View style={styles.formContent}>
        <View style={styles.inputContainer}>
          <Image
            style={[styles.icon, styles.inputIcon]}
            source={{
              uri: "https://png.icons8.com/search/androidL/100/000000",
            }}
          />
          <TextInput
            style={styles.inputs}
            /*      ref={"txtSearch"} */
            placeholder="Search"
            underlineColorAndroid="transparent"
            /*   onChangeText={name_address => this.setState({ name_address })} */
          />
        </View>
      </View>

      <FlatList
        style={styles.notificationList}
        data={list}
        renderItem={({ item }) => {
          return (
            <TouchableOpacity
              style={[styles.card, { borderColor: "#009387" }]}
              onPress={() => {
                /* when we press on a doctor we navigate to doctor about screen  that describe the specific doctor */

                {
                  /* role of the usercard not the user of the app */
                  item.role === "patient"
                    ? navigation.navigate("PatientTabNav", { item })
                    : item.role === "doctor"
                    ? navigation.navigate("AboutDoctor", { item })
                    : null;
                }
              }}
            >
              <View style={styles.cardContent}>
                {item.role === "doctor" ? (
                  <Image
                    style={[styles.image, styles.imageContent]}
                    source={{
                      uri: "https://bootdey.com/img/Content/avatar/avatar1.png",
                    }}
                  />
                ) : item.role === "patient" ? (
                  <Image
                    style={[styles.image, styles.imageContent]}
                    source={{
                      uri: "https://bootdey.com/img/Content/avatar/avatar2.png",
                    }}
                  />
                ) : null}
                <Text style={styles.name}>
                  <Text style={{ fontWeight: "normal" }}>{item.name} </Text>
                </Text>
              </View>
              <View style={[styles.cardContent, styles.tagsContent]}>
                {renderTags(item)}
              </View>
            </TouchableOpacity>
          );
        }}
      />
    </View>
  );
};
export default CommunList;
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
