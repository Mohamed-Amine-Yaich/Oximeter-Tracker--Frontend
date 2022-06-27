import React, { useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Device } from "react-native-ble-plx";
import { RootStackParamList } from "../navigation";
import PatientDataScreen from "../../screens/patientScreens/PatientDataScreen";
import { Base64 } from "../lib/base64";
import MatIcon from "react-native-vector-icons/MaterialIcons";
type DeviceCardProps = {
  device: Device;
};

const DeviceCard = ({ device }: DeviceCardProps) => {
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();

  const [isConnected, setIsConnected] = useState(false);

  useEffect(() => {
    // is the device connected?
    device.isConnected().then(setIsConnected);
    /* console.log("hi")
    console.log(device.serviceData) */
  }, [device]);

  return (
    <TouchableOpacity
      style={styles.container}
      // navigate to the Device Screen
      onPress={() => {
        navigation.navigate("Device", { device });
        /*   navigation.navigate("PatientDataScreen", { device }); */
      }}
    >
      {/*  <Text>{`Id : ${device.id}`}</Text> */}
      <View>
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
      </View>
      <MatIcon name="devices-other" color={"#009387"} size={26} />
      {/* Decode the ble device manufacturer which is encoded with the base64 algorythme */}
      {/*   <Text>{`Manufacturer : ${Base64.decode(
        device.manufacturerData?.replace(/[=]/g, ''),
      )}`}</Text>
      <Text>{`ServiceData : ${device.serviceData}`}</Text>
      <Text>{`UUIDS : ${device.serviceUUIDs}`}</Text> */}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
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

export { DeviceCard };
