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






/* 
!!!!!!!!!!!!!!!!!!!!!!!
use commanList instade of list of doctor and list of user of the specific doctor
 
!!!!!!!!!!!!!!!!!
*/




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
  StatusBar
} from "react-native";
import { backgroundColor } from "react-native/Libraries/Components/View/ReactNativeStyleAttributes";

import AsyncStorage from "@react-native-async-storage/async-storage";

import { getAllService } from "../../api/service";
//import { AuthContext } from "../../components/context";

/* passing the token as prop in tab navigation */
const UpdateDoctor = ({ navigation,route }) => {
  //const { getToken } = React.useContext(AuthContext);
  const [doctors, setDoctors] = useState(null);
 /*  const [value, setValue] = useState(null); */
  
 
  useEffect(async () => {
    const data = await getAllService(route.params.token);
    setDoctors(data);
    console.log("doctor list :" + data);
  }, []);

  /* const [data, setData] = useState([
    {
      id: 1,
      color: "#FF4500",
      icon: "https://bootdey.com/img/Content/avatar/avatar1.png",
      name: "khayri kharmech",
      tags: ["tag 1", "tag 2", "tag 3", "Mobile dev", "RN", "Bootdey"],
    },
    {
      id: 2,
      color: "#87CEEB",
      icon: "https://bootdey.com/img/Content/avatar/avatar2.png",
      name: "jeddi hamza",
      tags: ["tag 1", "tag 2", "tag 3", "Dey-Dey", "Developer"],
    },
    {
      id: 3,
      color: "#4682B4",
      icon: "https://bootdey.com/img/Content/avatar/avatar3.png",
      name: "wissal dabbebi",
      tags: ["tag 1", "tag 2", "tag 3"],
    },
    {
      id: 4,
      color: "#6A5ACD",
      icon: "https://bootdey.com/img/Content/avatar/avatar4.png",
      name: "User 4",
      tags: ["tag 1", "tag 2", "tag 3"],
    },
    {
      id: 5,
      color: "#FF69B4",
      icon: "https://bootdey.com/img/Content/avatar/avatar5.png",
      name: "User 5",
      tags: ["tag 1", "tag 2", "tag 3"],
    },
    {
      id: 6,
      color: "#00BFFF",
      icon: "https://bootdey.com/img/Content/avatar/avatar6.png",
      name: "User 6",
      tags: ["tag 1", "tag 2", "tag 3"],
    },
    {
      id: 7,
      color: "#00FFFF",
      icon: "https://bootdey.com/img/Content/avatar/avatar1.png",
      name: "User 7",
      tags: ["tag 1", "tag 2", "tag 3"],
    },
    {
      id: 8,
      color: "#20B2AA",
      icon: "https://bootdey.com/img/Content/avatar/avatar2.png",
      name: "User 8",
      tags: ["tag 1", "tag 2", "tag 3"],
    },
    {
      id: 9,
      color: "#191970",
      icon: "https://bootdey.com/img/Content/avatar/avatar3.png",
      name: "User 9",
      tags: ["tag 1", "tag 2", "tag 3"],
    },
  ]); */

  const navigateToUser = patient => {
    console.log(patient);
  };
/* 
tags are in tab we iterate the tab for diplay tags
  const renderTags = item => {
    return item.tags.map((tag, key) => {
      return (
        <TouchableOpacity
          key={key}
          style={styles.btnColor}
          onPress={() => {
            /*  this.tagClickEventListener(tag); 
          }}
        >
          <Text>{tag}</Text>
        </TouchableOpacity>
      );
    });
  }; */


  const renderTags = item => {
    return (
        <TouchableOpacity
          
          style={styles.btnColor}>
        <Text>{item.email}</Text>
        </TouchableOpacity>
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
        data={doctors}
        renderItem={({ item }) => {
          return (
            <TouchableOpacity
              style={[styles.card, { borderColor: "#009387" }]}
              onPress={() => {
   /* when we press on a doctor we navigate to doctor about screen  that describe the specific doctor */

             /*    navigation.navigate("PatientTabNav", {item}); */
                navigateToUser(item);
               
              }}
            >
              <View style={styles.cardContent}>
                {item.role==="doctor"?<Image
                  style={[styles.image, styles.imageContent]}
                   source={{ uri:"https://bootdey.com/img/Content/avatar/avatar1.png"}} 
                />:item.role==="patient"?<Image
                style={[styles.image, styles.imageContent]}
                 source={{ uri:"https://bootdey.com/img/Content/avatar/avatar2.png"}} 
              />:null}
                <Text style={styles.name}>{item.role}:{item.lastName} </Text>

              </View>
              <View style={[styles.cardContent, styles.tagsContent]}>
                {/* diplay tages in the card (default tmeplate ) with that function  
                we can add some info about doctor (rating,email )  */}
              {   renderTags(item) }
              </View>
            </TouchableOpacity>
          );
        }}
      />
    </View>
  );
};
export default UpdateDoctor;
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
    fontSize: 20,
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


