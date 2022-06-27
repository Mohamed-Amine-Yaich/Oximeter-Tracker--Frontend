import { StackScreenProps } from "@react-navigation/stack";
import React, { useCallback, useEffect, useState } from "react";
import {
  Text,
  ScrollView,
  Button,
  View,
  StyleSheet,
  Image,
  Dimensions,
} from "react-native";
import * as Animatable from "react-native-animatable";

import { Service } from "react-native-ble-plx";
import { ServiceCard } from "../components/ServiceCard";
import { RootStackParamList } from "../navigation/index";

import Feather from "react-native-vector-icons/Feather";
import MatIcon from "react-native-vector-icons/MaterialCommunityIcons";

import { CircularProgress } from "react-native-circular-progress";

import { Block, Badge, Card, Progress } from "../../screens/components";
import { theme, mocks } from "../../screens/constants";

const DeviceScreen = ({
  route,
  navigation,
}: StackScreenProps<RootStackParamList, "Device">) => {
  // get the device object which was given through navigation params
  const { device, token, currentUser } = route.params;

  const [isConnected, setIsConnected] = useState(false);
  const [services, setServices] = useState<Service[]>([]);
  const [dataService, setDataServices] = useState({});
  const [DesplayImg, setDesplayImg] = useState(true);
  /*   const [char, setChar] = useState({}); */

  // handle the device disconnection
  const disconnectDevice = useCallback(async () => {
    /*    navigation.goBack(); */
    const isDeviceConnected = await device.isConnected();
    if (isDeviceConnected) {
      await device.cancelConnection();
    }
    navigation.navigate("Home");
  }, [device, navigation]);

  useEffect(() => {
    console.log("Devise screen for passing token  to save data");
    console.log(token);
    console.log(currentUser);

    const timer = setTimeout(() => {
      setDesplayImg(false);
    }, 3000);

    const getDeviceInformations = async () => {
      // connect to the device
      const connectedDevice = await device.connect();
      setIsConnected(true);

      // discover all device services and characteristics
      const allServicesAndCharacteristics =
        await connectedDevice.discoverAllServicesAndCharacteristics();
      // get the services only
      const discoveredServices = await allServicesAndCharacteristics.services();

      setServices(discoveredServices);

      //display the  service i need and from it get char value
      await discoveredServices.forEach(service => {
        console.log(service.uuid);
        if (service.uuid === "cdeacb80-5235-4c07-8846-93a37ee6b86d") {
          console.log("hi");
          setDataServices(service);
        } else {
          console.log("no service");
        }
      });

      //save the propriete value of the char that return data
    };

    getDeviceInformations();
    device.onDisconnected(() => {
      navigation.navigate("Home");
    });

    // give a callback to the useEffect to disconnect the device when we will leave the device screen
    return () => {
      disconnectDevice();
      clearTimeout(timer);
    };
  }, [device, disconnectDevice, navigation]);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View>
        {/* works */}

        {DesplayImg ? (
          /* we can  pass the user also  */
          <Card
            shadow
            style={{ paddingVertical: theme.sizes.base * 1, marginTop: 10 }}
          >
            <Block center>
              <CircularProgress
                size={300} // can use  with * .5 => 50%
                fill={0} // percentage
                lineCap="round" // line ending style
                rotation={220}
                arcSweepAngle={280}
                width={theme.sizes.base}
                tintColor={theme.colors.primary} // gradient is not supported :(
                backgroundColor={theme.colors.gray3}
                backgroundWidth={theme.sizes.base / 2}
              >
                {() => (
                  <Image
                    source={require("./../../img/oxymeter.png")}
                    //width and height do not affect
                    width={1}
                    height={1}
                    borderRadius={50}
                    style={{ width: 200, height: 200 }}
                  />
                )}
              </CircularProgress>
            </Block>

            <Block color="gray3" style={styles.hLine} />

            <Block row>
              <Block center>
                <Text
                  size={20}
                  spacing={0.6}
                  primary
                  style={{ marginBottom: 6, color: "#009387" }}
                >
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
                <Text
                  size={20}
                  spacing={0.6}
                  style={{ marginBottom: 6, color: "#009387" }}
                >
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
        ) : (
          <Animatable.View animation="bounceIn">
            <ServiceCard
              key={dataService.uuid}
              service={dataService}
              token={token}
            />
          </Animatable.View>
        )}
        <View style={styles.btnContainer}>
          <Button
            title="disconnect"
            color={"#009387"}
            onPress={disconnectDevice}
          />
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 12,
  },
  btnContainer: {
    padding: 10,
  },
  header: {
    marginBottom: 12,
    borderRadius: 16,
    shadowColor: "rgba(60,64,67,0.3)",
    shadowOpacity: 0.4,
    shadowRadius: 10,
    elevation: 4,
    padding: 12,
  },
  sectionContainer: {
    margin: 20,
  },
  sectionTitle: {
    textAlign: "left",
    fontSize: 24,
    fontWeight: "bold",
  },
  deviceContainer: {
    backgroundColor: "white",
    marginBottom: 12,
    borderRadius: 16,
    shadowColor: "rgba(60,64,67,0.3)",
    shadowOpacity: 0.4,
    shadowRadius: 10,
    elevation: 4,
    padding: 12,
  },
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

export { DeviceScreen };
