import React, { useEffect, useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View, Image } from "react-native";
import { Characteristic, Descriptor, Service } from "react-native-ble-plx";
import { CharacteristicCard } from "./CharacteristicCard";
import { DescriptorCard } from "./DescriptorCard";
import * as Animatable from "react-native-animatable";

import MatIcon from "react-native-vector-icons/MaterialCommunityIcons";

import { CircularProgress } from "react-native-circular-progress";

import {
  Block,
  Badge,
  Card,
  Progress,
  DrawerButton,
} from "../../screens/components";
import { theme, mocks } from "../../screens/constants";
type ServiceCardProps = {
  service: Service;
  token: undefined;
};

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const UART_SERVICE_UUID =
  "6E400001-B5A3-F393-­E0A9-­E50E24DCCA9E".toLowerCase();

const ServiceCard = ({ service, token }: ServiceCardProps) => {
  const [descriptors, setDescriptors] = useState<Descriptor[]>([]);
  const [characteristics, setCharacteristics] = useState<Characteristic[]>([]);
  const [areCharacteristicsVisible, setAreCharacteristicsVisible] =
    useState(false);

  const [dataChar, setDataCharacteristics] = useState({});
  const [charExist, setCharExist] = useState(false);
  useEffect(() => {
    console.log("service caed passing token");
    console.log(token);
    const getCharacteristics = async () => {
      const newCharacteristics = await service.characteristics();
      setCharacteristics(newCharacteristics);
      await newCharacteristics.forEach(async characteristic => {
        console.log(characteristic.uuid);
        //target a specific char
        if (characteristic.uuid === "cdeacb81-5235-4c07-8846-93a37ee6b86d") {
          setDataCharacteristics(characteristic);
          setCharExist(true);
          console.log(dataChar);
        }

        const newDescriptors = await characteristic.descriptors();
        setDescriptors(prev => [...new Set([...prev, ...newDescriptors])]);
      });
    };

    console.log(service.uuid);
    getCharacteristics();
  }, [service]);

  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={() => {
          setAreCharacteristicsVisible(prev => !prev);
        }}
      ></TouchableOpacity>
      {/* works */}

      {!charExist ? (
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
      ) : null}
      <Animatable.View animation="bounceIn">
        {characteristics &&
          characteristics.map(char =>
            char.uuid === "cdeacb81-5235-4c07-8846-93a37ee6b86d" ? (
              <CharacteristicCard key={char.uuid} char={char} token={token} />
            ) : null
          )}
      </Animatable.View>

      {/*   {descriptors &&
        descriptors.map(descriptor => (
          <DescriptorCard key={descriptor.id} descriptor={descriptor} />
        ))} */}

      {/*     {dataChar ? <CharacteristicCard char={dataChar} /> : null} */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
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

export { ServiceCard };
