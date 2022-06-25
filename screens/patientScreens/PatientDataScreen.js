import React, { Component } from "react";
import {
  Image,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
  StatusBar,
  Dimensions,
} from "react-native";
import rgba from "hex-to-rgba";
import * as Icon from "react-native-vector-icons";
import Feather from "react-native-vector-icons/Feather";
import MatIcon from "react-native-vector-icons/MaterialCommunityIcons";

import IconBtn from "react-native-vector-icons/Ionicons";

import { Base64 } from "../../ble/lib/base64";

// check this lib for more options
import { CircularProgress } from "react-native-circular-progress";

import { Block, Badge, Card, Text, Progress } from "../components";
import { theme, mocks } from "../constants";
import { block } from "react-native-reanimated";

const PatientDataScreen = ({ navigation, route }) => {
  let values = route.params.values;
  const deviceWidth = Dimensions.get("window").width;
  /* ble */
  /* 
  const [measure, setMeasure] = React.useState({});

  const decodeBleString = (value: string | undefined | null): string => {
    if (!value) {
      return "";
    }

    const raw = Base64.atob(value);
    let result = "";
    for (let i = 0; i < raw.length; i++) {
      const hex = raw.charCodeAt(i).toString(16);
      result += hex.length === 2 ? hex : "0" + hex;
    }
    result.toUpperCase();

    let heartRate = result[2] + result[3];
    let spo2 = result[4] + result[5];
    let pi = result[6] + result[7];
    let intSpo2 = parseInt(spo2, 16);
    let intHartRate = parseInt(heartRate, 16);
    let intPi = parseInt(pi, 16);
    let floatPI = intPi / 10;

    data = { hr: intHartRate, spo2: intSpo2, pi: floatPI };
    return data;
  };
 */
  React.useEffect(() => {
    /*  if (char) {
      char.monitor((err, cha) => {
        if (err) {
          console.warn("ERROR");
          console.log("err in char.monitor");
          return;
        }
        // each received value has to be decoded with a Base64 algorythm you can find on the Internet (or in my repository 😉)

        if (cha?.value?.length === 8) {
          setMeasure(decodeBleString(cha?.value));
        }
      });
    } */
  });

  /* ble */

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
      <Card
        shadow
        style={{ paddingVertical: theme.sizes.base * 1, marginTop: 10 }}
      >
        <Block center>
          <CircularProgress
            size={300} // can use  with * .5 => 50%
            fill={100} // percentage
            lineCap="round" // line ending style
            rotation={220}
            arcSweepAngle={280}
            width={theme.sizes.base}
            tintColor={theme.colors.primary} // gradient is not supported :(
            backgroundColor={theme.colors.gray3}
            backgroundWidth={theme.sizes.base / 2}
          >
            {!char
              ? () => (
                  <>
                    <Block center middle>
                      <Text
                        h2
                        medium
                        primary
                        style={{ marginBottom: 0, fontWeight: "bold" }}
                      >
                        {/*   {mesure ? mesure : 85} */}
                        {values ? values.spo2 : 99}
                      </Text>
                      <Text h3 transform="uppercase">
                        Spo2(%)
                      </Text>
                    </Block>

                    <Block row>
                      <Block center>
                        <Text
                          size={20}
                          spacing={0.6}
                          primary
                          style={{ marginBottom: 0, fontWeight: "bold" }}
                        >
                          {/*   <MatIcon name="human-male" size={40} /> */}
                          {values ? values.hr : 70}
                        </Text>
                        <Text body spacing={0.7}></Text>
                        <Text body spacing={0.7}>
                          BPM
                        </Text>
                      </Block>

                      <Block flex={false} color="gray3" style={styles.vLine} />

                      <Block center>
                        <Text
                          size={20}
                          spacing={0.6}
                          primary
                          style={{ marginBottom: 6, fontWeight: "bold" }}
                        >
                          {/* <MatIcon name="run-fast" size={40} /> */}
                          {values ? values.pi : 3.5}
                        </Text>
                        <Text body spacing={0.7}>
                          {/*   MAXIMUM */}
                        </Text>
                        <Text body spacing={0.7}>
                          PI(%)
                        </Text>
                      </Block>
                    </Block>
                  </>
                )
              : () => (
                  <Image
                    source={require("./../../img/unnamed.png")}
                    //width and height do not affect
                    width={1}
                    height={1}
                    borderRadius={50}
                    //style applied
                    style={{ width: 180, height: 180 }}
                  />
                )}
          </CircularProgress>
        </Block>

        {/*  <Block center>
          <Text title spacing={1} style={{ marginVertical: 8 }}>
            Heart Rate
          </Text>
          <Text>
            <Text primary>84 </Text>
            <Text gray>bpm</Text>
          </Text>
        </Block> */}

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
