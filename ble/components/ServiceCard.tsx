import React, { useEffect, useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Characteristic, Descriptor, Service } from "react-native-ble-plx";
import { CharacteristicCard } from "./CharacteristicCard";
import { DescriptorCard } from "./DescriptorCard";

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
      {characteristics &&
        characteristics.map(char =>
          char.uuid === "cdeacb81-5235-4c07-8846-93a37ee6b86d" ? (
            <CharacteristicCard key={char.uuid} char={char} token={token} />
          ) : null
        )}

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
});

export { ServiceCard };
