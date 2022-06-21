import React, { useEffect, useState } from 'react';
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
  const data = Base64.decode(value); /* hex  */
  /* put the hex code in this form hex = ll-ll-ll-ll
  hex [1] : spo2
  hex[3]: heart rate
  */
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
  /*   console.log('char value : ');
  console.log(Base64.decode(value)[0]);
  console.log(Base64.decode(value).charCodeAt(1));
  console.log(Base64.decode(value).charCodeAt(2)); */

  /*   return Base64.decode(value).charCodeAt(0); */
  return heartRate;
};

const CharacteristicCard = ({ char }: CharacteristicCardProps) => {
  const [measure1, setMeasure1] = useState('');
  const [measure, setMeasure] = useState('');
  const [descriptor, setDescriptor] = useState<string | null>('');

  useEffect(() => {
    // discover characteristic descriptors
    char.descriptors().then((desc) => {
      /* console.log('desc : ' + desc); */
      desc[0]?.read().then((val) => {
        if (val) {
          setDescriptor(Base64.decode(val.value));
        }
      });
    });
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
    // read on the characteristic 👏
    char.monitor((err, cha) => {
      /*  console.log('hi');
      console.log(cha?.value); */
      if (err) {
        console.warn('ERROR');
        console.log('err in char.monitor');
        return;
      }
      // each received value has to be decoded with a Base64 algorythm you can find on the Internet (or in my repository 😉)
      console.log(cha?.value); /* base64 */
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
