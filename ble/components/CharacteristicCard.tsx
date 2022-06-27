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
import {
  StyleSheet,
  Image,
  ScrollView,
  TouchableOpacity,
  View,
  StatusBar,
  Dimensions,
} from "react-native";
import { Characteristic } from "react-native-ble-plx";
/* import { TouchableOpacity } from "react-native-gesture-handler"; */
import { Base64 } from "../lib/base64";
import { useNavigation } from "@react-navigation/native";

import Feather from "react-native-vector-icons/Feather";
import MatIcon from "react-native-vector-icons/MaterialCommunityIcons";

import IconBtn from "react-native-vector-icons/Ionicons";

// check this lib for more options
import { CircularProgress } from "react-native-circular-progress";

import { Block, Badge, Card, Text, Progress } from "../../screens/components";
import { theme, mocks } from "../../screens/constants";
/* for saving the data */
import { saveDataService } from "../../api/service";
type CharacteristicCardProps = {
  char: Characteristic;
  token: undefined;
};

const CharacteristicCard = ({ char, token }: CharacteristicCardProps) => {
  const navigation = useNavigation();
  const [measure1, setMeasure1] = useState("");
  const [saver, setSaver] = useState(false);

  const [measure, setMeasure] = useState({
    heart: "70",
    spo2: "99",
    pi: "3.5",
  });

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

    data = { heart: intHartRate, spo2: intSpo2, pi: floatPI };
    return data;
  };

  useEffect(() => {
    console.log("passing token to char card");
    console.log(token);
    char.monitor((err, cha) => {
      if (err) {
        console.warn("ERROR");
        console.log("err in char.monitor");
        /*   setMeasure({ heart: "70", spo2: "99", pi: "3.5" }); */
        return;
      }
      // each received value has to be decoded with a Base64 algorythm you can find on the Internet (or in my repository 😉)
      /*  console.log(cha?.value?.length); */ /* base64 */
      setMeasure1(cha?.value);
      if (cha?.value?.length === 8) {
        setMeasure(decodeBleString(cha?.value));
      }
    });

    const timer = setTimeout(async () => {
      ///send data to the the service
      if (measure) {
        setSaver(!saver);

        let response = await saveDataService(token, {
          ...measure,
          createdAt: Date.now(),
        });
        response
          ? console.log("data is saved correctly")
          : console.log("data is not saved");
      }
    }, 3000);
    /* fix your own period to saved data  */
    return () => clearTimeout(timer);
  }, [char, saver]);

  return (
    <>
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
            {measure
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
                        {measure.spo2}
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
                          {measure.heart}
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
                          {measure.pi}
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
                    source={require("./../../img/oxymeter.png")}
                    //width and height do not affect
                    width={1}
                    height={1}
                    borderRadius={50}
                    //style applied
                    style={{ width: 200, height: 200 }}
                  />
                )}
          </CircularProgress>
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

export { CharacteristicCard };
{
  /*    <TouchableOpacity
        key={char.uuid}
        style={styles.container}
      
      >
       
        <Text style={styles.measure}>HeartRate : {measure.heart}</Text>
        <Text style={styles.measure}>Pi : {measure.pi}</Text>
        <Text style={styles.measure}>Spo2 : {measure.spo2}</Text>
      </TouchableOpacity>
      <View style={styles.btnContainer}>
        <Button
          title="more details"
          color={"#009387"}
          onPress={() => {
            navigation.navigate("Details", { measure: measure.pi });
          }}
        />
      </View> */
}
