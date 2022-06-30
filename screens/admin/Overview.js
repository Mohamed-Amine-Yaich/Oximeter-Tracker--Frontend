/* import React, { useState, useEffect } from "react";
import { View, Text, StatusBar } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
const PatientDataScreen = ({ route, navigation }) => { */
/* this screen is data screen of patient 
 - when user is a doctor he select the user from the list then user data is passed to  this screen 
 -when user is patient he must require for his data from backend 
 -test depend of the user make a condition or (or if there is an item on the route
   means that we navigate to this screen from the list /or we query for user data from backend  ) 
 */

/* 
  return (
    
    <View>
      <StatusBar backgroundColor="#009387" barStyle="light-content" />
      <Icon.Button
        name="ios-menu"
        size={25}
        color="#111"
        backgroundColor="#009387"
        onPress={() => navigation.openDrawer()}
      ></Icon.Button>
      <Text> hello from patient data screen</Text>
      <Text> {route.params.token}</Text>
      <Text>current user : {route.params.currentUser.name}</Text>
      <Text>current user : {route.params.currentUser.lastName}</Text>
      <Text>current user : {route.params.currentUser.role}</Text>
      


    </View>
  );
};
export default PatientDataScreen; */
import React, { Component } from "react";
import {
  Image,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
  StatusBar,
} from "react-native";
import rgba from "hex-to-rgba";
import * as Icon from "react-native-vector-icons";
import Feather from "react-native-vector-icons/Feather";
import MatIcon from "react-native-vector-icons/MaterialCommunityIcons";

import IconBtn from "react-native-vector-icons/Ionicons";

// check this lib for more options
import { CircularProgress } from "react-native-circular-progress";

import { Block, Badge, Card, Text, Progress } from "../components";
import { theme, mocks } from "../constants";
import { FontAwesome5 } from "@expo/vector-icons";
import DrawerButton from "../../DrawerButton";

const Overview = ({ navigation, route }) => {
  const Users = () => {
    return (
      <Card shadow style={{ paddingVertical: theme.sizes.base }}>
        <Block row>
          <Block center>
            <Text size={20} spacing={0.6} primary style={{ marginBottom: 6 }}>
              <FontAwesome5 name="user-injured" size={40} />
            </Text>
            <Text body spacing={0.7}>
              Patients
            </Text>
            <Text body spacing={0.7}>
              total patients:30
            </Text>
          </Block>

          <Block flex={false} color="gray3" style={styles.vLine} />

          <Block center>
            <Text size={20} spacing={0.6} primary style={{ marginBottom: 6 }}>
              <FontAwesome5 name="user-md" size={40} />
            </Text>
            <Text body spacing={0.7}>
              Doctors
            </Text>
            <Text body spacing={0.7}>
              Total doctors : 2
            </Text>
          </Block>
        </Block>
      </Card>
    );
  };

  const MaleFemale = () => {
    return (
      <Card shadow style={{ paddingVertical: theme.sizes.base }}>
        <Block row>
          <Block center>
            <Text size={20} spacing={0.6} primary style={{ marginBottom: 6 }}>
              <MatIcon name="gender-male" size={60} />
            </Text>
            <Text body spacing={0.7}>
              Male
            </Text>
            <Text body spacing={0.7}>
              60%
            </Text>
          </Block>

          <Block flex={false} color="gray3" style={styles.vLine} />

          <Block center>
            <Text size={20} spacing={0.6} primary style={{ marginBottom: 6 }}>
              <MatIcon name="gender-female" size={60} />
            </Text>
            <Text body spacing={0.7}>
              Female
            </Text>
            <Text body spacing={0.7}>
              40%
            </Text>
          </Block>
        </Block>
      </Card>
    );
  };

  const DoctorOfTheMonth = () => {
    return (
      <Card shadow style={{ paddingVertical: theme.sizes.base * 2 }}>
        <Block center>
          <Text title spacing={1} style={{ marginVertical: 8 }}>
            Doctor Of The Month
          </Text>

          {/* circular multiple slider react native compnent  */}

          <Image
            style={[styles.image, styles.imageContent]}
            source={{
              uri: "https://bootdey.com/img/Content/avatar/avatar1.png",
            }}
          />

          <Text>
            <Text title spacing={1}>
              {" "}
              med amine
            </Text>
          </Text>
        </Block>
      </Card>
    );
  };

  const age = () => {
    return (
      <Card shadow style={{ paddingVertical: theme.sizes.base }}>
        <Block row>
          <Block center>
            {/*  <Text size={20} spacing={0.6} primary style={{ marginBottom: 6 }}>
              <MatIcon name="human-male" size={40} />
            </Text> */}
            <Text title spacing={1} style={{ marginVertical: 8 }}>
              Average Age
            </Text>
            <Text body spacing={0.7}>
              50,5
            </Text>
          </Block>
        </Block>
      </Card>
    );
  };
  const NewUsers = () => {
    return (
      <Card shadow style={{ paddingVertical: theme.sizes.base }}>
        <Text title spacing={1} style={{ marginVertical: 8 }}>
          New patients
        </Text>
        <Block row center space="evenly">
          <Text size={20} spacing={1} primary>
            <Feather name="trending-down" size={30} />
          </Text>
          <View>
            <Text
              size={20}
              spacing={0.6}
              primary /* style={{ marginBottom: 6 }} */
            >
              75 bpm
            </Text>
            <Text>5% less than last month</Text>
          </View>
        </Block>

        <Block flex={false} color="gray3" style={styles.hLine} />

        <Block row>
          <Block center>
            <Text body size={15} spacing={0.7}>
              Daily
            </Text>
            <Text body spacing={0.7}></Text>
          </Block>
          <Block flex={false} color="gray3" style={styles.vLine} />

          <Block center>
            <Text body size={15} spacing={0.7}>
              Monthly
            </Text>
            <Text body spacing={0.7}>
              3%
            </Text>
          </Block>
          <Block flex={false} color="gray3" style={styles.vLine} />

          <Block center>
            <Text body size={15} spacing={0.7}>
              Overall
            </Text>
            <Text body spacing={0.7}>
              5%
            </Text>
          </Block>
        </Block>
      </Card>
    );
  };

  const margin = () => {
    return <View style={{ marginBottom: 100 }}></View>;
  };

  const renderButton = () => {
    return <DrawerButton />;
  };

  return (
    <View>
      <StatusBar backgroundColor="#009387" barStyle="light-content" />

      {renderButton()}
      <ScrollView style={styles.rewards} showsVerticalScrollIndicator={false}>
        {Users()}
        {MaleFemale()}
        {DoctorOfTheMonth()}
        {age()}
        {NewUsers()}
        {margin()}
      </ScrollView>
    </View>
  );
};
export default Overview;
const styles = StyleSheet.create({
  rewards: {
    padding: theme.sizes.padding,
    backgroundColor: theme.colors.gray4,
  },
  // horizontal line
  hLine: {
    marginVertical: theme.sizes.base * 1.5,
    height: 1,
  },
  // vertical line
  vLine: {
    marginVertical: theme.sizes.base / 2,
    width: 1,
  },
  cardContent: {
    /* flexDirection: "row", */
    marginLeft: 10,
  },
  imageContent: {
    marginTop: 20,
    marginBottom: 20,
  },
  tagsContent: {
    marginTop: 10,
    flexWrap: "wrap",
  },
  image: {
    width: 180,
    height: 180,
    borderRadius: 100,
  },
});
