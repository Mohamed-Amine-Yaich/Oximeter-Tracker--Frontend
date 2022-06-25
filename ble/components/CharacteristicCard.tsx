/* import React, { useEffect, useState } from 'react';
import { StyleSheet, Text } from 'react-native';
import { Characteristic } from 'react-native-ble-plx';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Base64 } from '../lib/base64';

type CharacteristicCardProps = {
  char: Characteristic;
};

const decodeBleString = (value: string | undefined | null): string => {
  if (!value) {
    return '';
  }
  const data = Base64.decode(value); 

  let heartRate = -1;
  const firstBitValue = data[0] & 0x01;

  if (firstBitValue === 0) {
    heartRate = data[1].charCodeAt(0);
  } else {
    heartRate =
      Number(data[1].charCodeAt(0) << 8) + Number(data[2].charCodeAt(2));
  }
  console.log('heartrate : ', heartRate);

  const data1 = Base64.decode(value);
  let spo2 = -1;
  const firstBitValue1 = data[1] & 0x01;

  if (firstBitValue1 === 0) {
    spo2 = data[1].charCodeAt(0);
  } else {
    spo2 = Number(data[1].charCodeAt(0) << 8) + Number(data[2].charCodeAt(2));
  }
  console.log('spo2 : ', spo2);

  return heartRate;
};

const CharacteristicCard = ({ char }: CharacteristicCardProps) => {
  const [measure1, setMeasure1] = useState('');
  const [measure, setMeasure] = useState('');
  const [descriptor, setDescriptor] = useState<string | null>('');

  useEffect(() => {
    // discover characteristic descriptors
    char.descriptors().then((desc) => {
     
      desc[0]?.read().then((val) => {
        if (val) {
          setDescriptor(Base64.decode(val.value));
        }
      });
    });
  
    char.monitor((err, cha) => {
   
      if (err) {
        console.warn('ERROR');
        console.log('err in char.monitor');
        return;
      }
      // each received value has to be decoded with a Base64 algorythm you can find on the Internet (or in my repository 😉)
      console.log(cha?.value); 
      setMeasure1(cha?.value);
      setMeasure(decodeBleString(cha?.value));
    });
  }, [char]);

  // write on a charactestic the number 6 (e.g.)
  const writeCharacteristic = () => {
    // encode the string with the Base64 algorythm
    char
      .writeWithResponse(Base64.encode('6'))
      .then(() => {
        console.warn('Success');
      })
      .catch((e) => console.log('Error', e));
  };

  return (
    <TouchableOpacity
      key={char.uuid}
      style={styles.container}
      onPress={writeCharacteristic}>
      <Text style={{ color: '#000' }}>charactaristics</Text>

      <Text style={styles.measure}>mesure1:{measure1}</Text>
      <Text style={styles.measure}>mesure:{measure}</Text>
      <Text style={styles.descriptor}>disciptor:{descriptor}</Text>
      <Text>{`isIndicatable : ${char.isIndicatable}`}</Text>
      <Text>{`isNotifiable : ${char.isNotifiable}`}</Text>
      <Text>{`isNotifying : ${char.isNotifying}`}</Text>
      <Text>{`isReadable : ${char.isReadable}`}</Text>
      <TouchableOpacity>
        <Text>{`isWritableWithResponse : ${char.isWritableWithResponse}`}</Text>
      </TouchableOpacity>
      <Text>{`isWritableWithoutResponse : ${char.isWritableWithoutResponse}`}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    marginVertical: 12,
    borderRadius: 16,
    shadowColor: 'rgba(60,64,67,0.3)',
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 5,
    padding: 12,
  },
  measure: { color: 'red', fontSize: 24 },
  descriptor: { color: 'blue', fontSize: 24 },
});

export { CharacteristicCard };
 */

import React, { useEffect, useState } from "react";
import { StyleSheet, Text, Button, View } from "react-native";
import { Characteristic } from "react-native-ble-plx";
import { TouchableOpacity } from "react-native-gesture-handler";
import { Base64 } from "../lib/base64";
import { useNavigation } from "@react-navigation/native";

import PatientTabNav from "../../screens/patientScreens/PatientTabNav";
import PatientDataScreen from "../../screens/patientScreens/PatientDataScreen";
type CharacteristicCardProps = {
  char: Characteristic;
};

const CharacteristicCard = ({ char }: CharacteristicCardProps) => {
  const navigation = useNavigation();
  const [measure1, setMeasure1] = useState("");
  const [measure, setMeasure] = useState({ hr: "70", spo2: "99", pi: "3.5" });

  const [descriptor, setDescriptor] = useState<string | null>("");

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

  useEffect(() => {
    // discover characteristic descriptors
    /*     char.descriptors().then(desc => {
     
      desc[0]?.read().then(val => {
        if (val) {
          setDescriptor(Base64.decode(val.value));
        }
      });
    }); */
    /* testing  */
    /* check bluetoothManater in BLEReactNative
     await this.device?.discoverAllServicesAndCharacteristics();
    this.device?.monitorCharacteristicForService(
      HEART_RATE_UUID,
      HEART_RATE_CHARACTERISTIC,
      (error, characteristic) =>
        this.onHeartRateUpdate(error, characteristic, emitter), */
    /*  console.log('char');
    console.log(char); */
    /*  console.log(char.read()); */
    // read on the characteristic

    char.monitor((err, cha) => {
      if (err) {
        console.warn("ERROR");
        console.log("err in char.monitor");
        setMeasure({ hr: "70", spo2: "99", pi: "3.5" });
        return;
      }
      // each received value has to be decoded with a Base64 algorythm you can find on the Internet (or in my repository 😉)
      console.log(cha?.value?.length); /* base64 */
      setMeasure1(cha?.value);
      if (cha?.value?.length === 8) {
        setMeasure(decodeBleString(cha?.value));
      }
    });
  }, [char]);

  // write on a charactestic the number 6 (e.g.)
  /*   const writeCharacteristic = () => {
    // encode the string with the Base64 algorythm
    char
      .writeWithResponse(Base64.encode("6"))
      .then(() => {
        console.warn("Success");
      })
      .catch(e => console.log("Error", e));
  }; */

  /*   const toDetails = () => {
    if (measure) {
      //pass to the detail screen
    }
  }; */
  return (
    <>
      <TouchableOpacity
        key={char.uuid}
        style={styles.container}
        /* onPress={() => navigation.navigate("Details", { measure })} */
      >
        {/*       <Text style={{ color: "#000" }}>charactaristics{char.uuid}</Text> */}
        <Text style={styles.measure}>HeartRate : {measure.hr}</Text>
        <Text style={styles.measure}>Pi : {measure.pi}</Text>
        <Text style={styles.measure}>Spo2 : {measure.spo2}</Text>
        {/*    <Text style={styles.descriptor}>disciptor:{descriptor}</Text> */}
        {/*       <Text>{`isIndicatable : ${char.isIndicatable}`}</Text>
      <Text>{`isNotifiable : ${char.isNotifiable}`}</Text>
      <Text>{`isNotifying : ${char.isNotifying}`}</Text>
      <Text>{`isReadable : ${char.isReadable}`}</Text>
      <TouchableOpacity>
        <Text>{`isWritableWithResponse : ${char.isWritableWithResponse}`}</Text>
      </TouchableOpacity>
      <Text>{`isWritableWithoutResponse : ${char.isWritableWithoutResponse}`}</Text> */}
      </TouchableOpacity>
      <View style={styles.btnContainer}>
        <Button
          title="more details"
          color={"#009387"}
          onPress={() => {
            navigation.navigate("Details", { values: measure });
          }}
        />
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    marginVertical: 12,
    borderRadius: 16,
    shadowColor: "rgba(60,64,67,0.3)",
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 5,
    padding: 12,
  },
  btnContainer: {
    padding: 10,
  },
  measure: { color: "red", fontSize: 24 },
  descriptor: { color: "blue", fontSize: 24 },
});

export { CharacteristicCard };
