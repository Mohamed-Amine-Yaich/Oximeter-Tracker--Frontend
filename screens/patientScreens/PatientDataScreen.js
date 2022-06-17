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

const PatientDataScreen = ({ navigation, route }) => {
  const renderMonthly = () => {
    return (
      <Card shadow style={{ paddingVertical: theme.sizes.base }}>
        <Block>
          <Block center>
            <Text h1 primary spacing={1.7}>
              Health Stats
            </Text>
            <Text spacing={0.7}>The greatest wealth is heath </Text>
          </Block>
        </Block>
      </Card>
    );
  };

  const renderRewards = () => {
    return (
      <Card shadow style={{ paddingVertical: theme.sizes.base * 1 }}>
        <Block center>
          <CircularProgress
            size={214} // can use  with * .5 => 50%
            fill={85} // percentage
            lineCap="round" // line ending style
            rotation={220}
            arcSweepAngle={280}
            width={theme.sizes.base}
            tintColor={theme.colors.primary} // gradient is not supported :(
            backgroundColor={theme.colors.gray3}
            backgroundWidth={theme.sizes.base / 2}
          >
            {() => (
              <Block center middle>
                <Text h2 medium>
                  84
                </Text>
                <Text h3 transform="uppercase">
                  good
                </Text>
              </Block>
            )}
          </CircularProgress>
        </Block>

        <Block center>
          <Text title spacing={1} style={{ marginVertical: 8 }}>
            Heart Rate
          </Text>
          <Text>
            <Text primary>84 </Text>
            <Text gray /* transform="uppercase" */>bpm</Text>
          </Text>
        </Block>

        <Block color="gray3" style={styles.hLine} />

        <Block row>
          <Block center>
            <Text size={20} spacing={0.6} primary style={{ marginBottom: 6 }}>
              <MatIcon name="human-male" size={40} />
            </Text>
            <Text body spacing={0.7}>
              MINIMUM
            </Text>
            <Text body spacing={0.7}>
              60 bpm
            </Text>
          </Block>

          <Block flex={false} color="gray3" style={styles.vLine} />

          <Block center>
            <Text size={20} spacing={0.6} primary style={{ marginBottom: 6 }}>
              <MatIcon name="run-fast" size={40} />
            </Text>
            <Text body spacing={0.7}>
              MAXIMUM
            </Text>
            <Text body spacing={0.7}>
              144 bpm
            </Text>
          </Block>
        </Block>
      </Card>
    );
  };

  const renderChallenges = () => {
    return (
      <Block>
        <Block
          style={{
            marginTop: theme.sizes.base,
            marginBottom: theme.sizes.base,
            paddingHorizontal: theme.sizes.base / 3,
          }}
        >
          <Text spacing={0.7} /* transform="uppercase" */>
            Performance History
          </Text>
        </Block>
        <Card
          shadow
          style={{ paddingVertical: theme.sizes.base * 1, marginBottom: 20 }}
        >
          <Block row center space="between">
            <Text size={20} spacing={1} primary>
              <Feather name="trending-down" size={20} />
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
            <Text size={20} spacing={1} primary>
              :
            </Text>
          </Block>
        </Card>
        <Card
          shadow
          style={{ paddingVertical: theme.sizes.base * 1, marginBottom: 100 }}
        >
          <Block row center space="between">
            <Text size={20} spacing={1} primary>
              <Feather name="trending-up" size={20} />
            </Text>
            <View>
              <Text size={20} spacing={0.6} primary>
                95 bpm
              </Text>
              <Text>20% Higher Than Last onth</Text>
            </View>
            <Text size={20} spacing={1} primary>
              :
            </Text>
          </Block>
        </Card>
      </Block>
    );
  };

  const renderButton = () => {
    return (
      <Text>
        <IconBtn.Button
          borderRadius={0}
          name="ios-menu"
          size={25}
          color="#111"
          style={{ width: 365 }}
          backgroundColor="#009387"
          onPress={() => navigation.openDrawer()}
        ></IconBtn.Button>
      </Text>
    );
  };

  return (
    <View>
      <StatusBar backgroundColor="#009387" barStyle="light-content" />

      <Text>{renderButton()}</Text>
      <ScrollView style={styles.rewards} showsVerticalScrollIndicator={false}>
        {renderMonthly()}
        {renderRewards()}
        {renderChallenges()}
      </ScrollView>
    </View>
  );
};
export default PatientDataScreen;
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
});
