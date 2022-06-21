import { StackScreenProps } from "@react-navigation/stack";
import React, { useCallback, useEffect, useState } from "react";
import { Text, ScrollView, Button, View, StyleSheet } from "react-native";
import { Service } from "react-native-ble-plx";
import { ServiceCard } from "../components/ServiceCard";
import { RootStackParamList } from "../navigation/index";

const DeviceScreen = ({
  route,
  navigation,
}: StackScreenProps<RootStackParamList, "Device">) => {
  // get the device object which was given through navigation params
  const { device } = route.params;

  const [isConnected, setIsConnected] = useState(false);
  const [services, setServices] = useState<Service[]>([]);

  // handle the device disconnection
  const disconnectDevice = useCallback(async () => {
    navigation.goBack();
    const isDeviceConnected = await device.isConnected();
    if (isDeviceConnected) {
      await device.cancelConnection();
    }
  }, [device, navigation]);

  useEffect(() => {
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
    };

    getDeviceInformations();

    device.onDisconnected(() => {
      navigation.navigate("Home");
    });

    // give a callback to the useEffect to disconnect the device when we will leave the device screen
    return () => {
      disconnectDevice();
    };
  }, [device, disconnectDevice, navigation]);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View>
        <View style={styles.sectionContainer}>
          <Text style={styles.sectionTitle}>
            {" "}
            device {` ${isConnected ? "connected" : ""}`}{" "}
          </Text>
        </View>
        <View style={styles.deviceContainer}>
          {/*  <Text>{`Id : ${device.id}`}</Text> */}

          <Text>
            <Text style={{ fontWeight: "bold" }}>Name :</Text>
            <Text style={{ color: "#009387" }}>
              {` ${device.name ? device.name : "unknown"}`}
            </Text>
          </Text>
          <Text>
            <Text style={{ fontWeight: "bold" }}> Is connected :</Text>
            <Text style={{ color: "#009387" }}>{` ${isConnected}`}</Text>
          </Text>
          <Text>
            <Text style={{ fontWeight: "bold" }}>RSSI :</Text>
            <Text style={{ color: "#009387" }}>{` ${device.rssi}`}</Text>
          </Text>

          {/* <Text>{`Manufacturer : ${device.manufacturerData}`}</Text>
          <Text>{`ServiceData : ${device.serviceData}`}</Text>
          <Text>{`UUIDS : ${device.serviceUUIDs}`}</Text> */}
        </View>
        <View style={styles.btnContainer}>
          <Button
            title="disconnect"
            color={"#009387"}
            onPress={disconnectDevice}
          />
        </View>
        {/* Display a list of all services */}
        {/*   {services &&
          services.map((service, id) => (
            <ServiceCard key={id} service={service} />
          ))} */}
        {/* navigatinng to patientdata and desplaying data */}
        <View style={styles.btnContainer}>
          <Button
            title="navigate to details"
            color={"#009387"}
            onPress={()=>navigation.navigate("Details")}
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
    /* backgroundColor: 'teal', */
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
});

export { DeviceScreen };
