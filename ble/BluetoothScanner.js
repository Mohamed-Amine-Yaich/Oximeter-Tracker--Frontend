import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  FlatList,
  Button,
  PermissionsAndroid,
  StatusBar,
} from "react-native";
import { BleManager, Service } from "react-native-ble-plx";
import { Buffer } from "buffer";
var aesjs = require("aes-js");
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

const manager = new BleManager();

const requestPermission = async () => {
  const granted = await PermissionsAndroid.request(
    PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
    {
      title: "Request for Location Permission",
      message: "Bluetooth Scanner requires access to Fine Location Permission",
      buttonNeutral: "Ask Me Later",
      buttonNegative: "Cancel",
      buttonPositive: "OK",
    }
  );
  return granted === PermissionsAndroid.RESULTS.GRANTED;
};

// BlueetoothScanner does:
// - access/enable bluetooth module
// - scan bluetooth devices in the area
// - list the scanned devices
const BluetoothScanner = () => {
  const [logData, setLogData] = useState([]);
  const [logCount, setLogCount] = useState(0);
  const [scannedDevices, setScannedDevices] = useState({});
  const [deviceCount, setDeviceCount] = useState(0);
  /*   store the device that we want to connect to it */
  const [deviceId, setDeviceId] = useState("CB:B3:3D:76:4D:0F");
  /* 38:FB:14:B7:6F:E3 
  CB:B3:3D:76:4D:0F
  */

  useEffect(() => {
    manager.onStateChange(state => {
      const subscription = manager.onStateChange(async state => {
        console.log(state);
        const newLogData = logData;
        newLogData.push(state);
        await setLogCount(newLogData.length);
        await setLogData(newLogData);
        subscription.remove();
      }, true);
      return () => subscription.remove();
    });
  }, [manager]);

  function btoa(data) {
    return new Buffer(data, "binary").toString("base64");
  }
  function atob(data) {
    return new Buffer(data, "base64").toString("binary");
  }

  function base64ToArrayBuffer(base64) {
    var binary_string = atob(base64);
    var len = binary_string.length;
    var bytes = new Uint8Array(len);
    for (var i = 0; i < len; i++) {
      bytes[i] = binary_string.charCodeAt(i);
    }
    return bytes;
  }

  function arrayToBase64(array) {
    return btoa(String.fromCharCode.apply(null, array));
  }

  const concatArrayAndCommand = (command, array) => {
    var newArray = new Uint8Array(18);
    newArray[0] = command[0];
    newArray[1] = command[1];
    for (var i = 2; i < 18; i++) {
      newArray[i] = array[i - 2];
    }
    return newArray;
  };

  const concatArrays = (command, array) => {
    var commandLength = command.length;
    var arrayLength = array.length;
    var newLength = commandLength + arrayLength;
    var newArray = new Uint8Array(newLength);
    for (var i = 0; i < commandLength; i++) {
      newArray[i] = command[i];
    }
    for (var j = commandLength; j < newLength; j++) {
      newArray[j] = array[j - commandLength];
    }
    return newArray;
  };

  const stringToASCII = string => {
    asciiKeys = [];
    for (var i = 0; i < string.length; i++)
      asciiKeys.push(string[i].charCodeAt(0));
    return asciiKeys;
  };
  /* request key and send encrypted key  */

  const requestKey = device => {
    //STEP 3 ------ Requesting band's key, will be watched by our monitor

    device
      .writeCharacteristicWithoutResponseForService(
        "0000fee1-0000-1000-8000-00805f9b34fb",
        "00000009-0000-3512-2118-0009af100700",
        btoa("\x02\x00")
      )
      .then(data => {
        console.log("dataaaa from step 3 Requesting band s key ");
        console.log(data);
        console.log("end dataaaa step 3");
      })
      .catch(e => {
        console.log(e);
      });
  };

  const sendEncryptedKey = async (characteristic, bluetoothKey, device) => {
    // STEP 5 ------ One of the most difficult ones, encrypting the band's key, using our key
    console.log("step 5 encrypting band's key using our key  ");
    let receivedKey = characteristic.value.substring(4); // First we remove the first 4 digits, other result code from the band

    var receivedKeyInBytes = base64ToArrayBuffer(receivedKey);
    var bluetoothKeyInBytes = base64ToArrayBuffer(bluetoothKey);

    let encryptor = new aesjs.ModeOfOperation.ecb(bluetoothKeyInBytes);
    let encryptedKeyInBytes = encryptor.encrypt(receivedKeyInBytes);
    let finalValue = concatArrayAndCommand([3, 0], encryptedKeyInBytes);

    // After encrypting, we send \x03\x00 + the encoded key

    device
      .writeCharacteristicWithoutResponseForService(
        "0000fee1-0000-1000-8000-00805f9b34fb",
        "00000009-0000-3512-2118-0009af100700",
        arrayToBase64(finalValue)
      )
      .then(data => {
        console.log("response when we send  the encoded key after step 5");
        console.log(data);
        console.log("end of after encrypting ");
      })
      .catch(e => {
        console.log(e);
      });
  };

  /*  */

  return (
    <View style={{ flex: 1, padding: 10 }}>
     
      <View style={{ flex: 1, padding: 10 }}>
        <Text style={{ fontWeight: "bold" }}>Bluetooth Log ({logCount})</Text>
        <FlatList
          data={logData}
          renderItem={({ item }) => {
            return <Text>{item}</Text>;
          }}
        />
        <Button
          title="Turn On Bluetooth"
          onPress={async () => {
            const btState = await manager.state();
            // test is bluetooth is supported
            if (btState === "Unsupported") {
              alert("Bluetooth is not supported");
              return false;
            }
            // enable if it is not powered on
            if (btState !== "PoweredOn") {
              await manager.enable();
            } else {
              await manager.disable();
            }
            return true;
          }}
        />
      </View>

      <View style={{ flex: 2, padding: 10 }}>
        <Text style={{ fontWeight: "bold" }}>
          Scanned Devices ({deviceCount})
        </Text>
        <FlatList
          data={Object.values(scannedDevices)}
          renderItem={({ item }) => {
            return (
              <Text
                style={{ color: "#red" }}
              >{`${item.name} (${item.id})`}</Text>
            );
          }}
        />
        <Button
          title="Scan Devices"
          onPress={async () => {
            const btState = await manager.state();
            // test if bluetooth is powered on
            if (btState !== "PoweredOn") {
              alert("Bluetooth is not powered on");
              return false;
            }
            // explicitly ask for user's permission
            const permission = await requestPermission();
            if (permission) {
              manager.startDeviceScan(null, null, async (error, device) => {
                // error handling
                if (error) {
                  console.log("start scan err :" + error);
                  return;
                }
                //found the specific  bluetooth device and set

                if (device) {
                  console.log(`${device.name} (${device.id})`);
                  const newScannedDevices = scannedDevices;
                  newScannedDevices[device.id] = device;
                  await setDeviceCount(Object.keys(newScannedDevices).length);
                  await setScannedDevices(scannedDevices);
                }
                /* object that containe all scanned devices ... */
                /*   console.log(scannedDevices); */
                // connect to the specific device
                if (device.id === deviceId) {
                  console.log("scan will stop ...");

                  manager.stopDeviceScan();
                  console.log("scan stop  ...");
                  console.log("connecting  to smart watch ...");
                  /* connect to Device return the device object */
                  const { id } = await manager.connectToDevice(deviceId);
                  /*we must await for this promise then if there is a device we need to retreive all his services and caractaristic
                   */
                  if (!id) {
                    console.log("divise is not connnected");
                  }
                  /* 1 stop scan 
                  2nd connect that return promise resolve the promise(stackProject) */
                  console.log("id :" + id);

                  console.log("discoverAllserviecesandcharc for device ...");

                  /* propmise to return the device object(current object ) if all service and caracteristics have been discovered  */
                  const currentDevice =
                    await manager.discoverAllServicesAndCharacteristicsForDevice(
                      deviceId
                    );

                  console.log("bluetoothkey");

                  let bluetoothKey = "4dbb91785aadf725f004b25ece5b262c";

                  console.log(bluetoothKey);

                  /* Promise which emits first Characteristic object matching specified UUID paths. Latest value of characteristic may not be stored inside returned object. */
                  device
                    .writeCharacteristicWithoutResponseForService(
                      "0000fee1-0000-1000-8000-00805f9b34fb",
                      "00000009-0000-3512-2118-0009af100700",
                      btoa("\x01\x00")
                    ) // STEP 1 ------ we send \x01\x00, converted to base64
                    .then(data => {
                      console.log("dataaaa from step one");
                      console.log(data);
                      console.log("end dataaaa step one");
                    })
                    .catch(e => {
                      console.log(e);
                    });

                  //Now, we monitor this characteristic, waiting for responses and dealing with them, but Step 2 is below this, because we need to be watching his response
                  device.monitorCharacteristicForService(
                    "0000fee1-0000-1000-8000-00805f9b34fb",
                    "00000009-0000-3512-2118-0009af100700",
                    (error, characteristic) => {
                      if (error) {
                        console.log(error);
                      }
                      if (characteristic != null) {
                        console.log(characteristic);
                        if (characteristic.value == "EAEB") {
                          // EAEB means that the band received the key, so we move to the next step and request the band's key
                          requestKey(device);
                        } else if (characteristic.value == "EAEC") {
                          // EAEC means the user didn't confirmed the pairing on the band
                          /*   resultFunction(false); */ console.log(
                            "characteristic .value = EAEC user do not confirm pairing with band"
                          );
                          console.log("device :");
                          console.log(device);

                          console.log("device :");
                        } else if (characteristic.value == "EAMB") {
                          // EAMB means the pairing ocurred with success
                          /*  resultFunction(device) */ // SUCCESS ------ We store the device object for further use
                          console.log(
                            "characteristic .value = EAEC  pairing with band occured"
                          );
                          console.log("device :");
                          console.log(device);

                          console.log("device :");
                        } else if (characteristic.value == "EAME") {
                          // Some error ocurred
                          console.log(
                            "vlue of char eame some error occured cancel connection ..."
                          );
                          device.cancelConnection();
                        } else {
                          // STEP 4 ------ Happens when the band sends the key we requested
                          console.log(
                            "the band is sendeng the key we request for"
                          );
                          console.log("setp 4 char value :");
                          console.log(characteristic.value);
                          console.log("end setp 4 char value :");

                          sendEncryptedKey(
                            characteristic,
                            bluetoothKey,
                            device
                          );
                        }
                      }
                    }
                  );

                  let connectionKey = concatArrayAndCommand(
                    [1, 8],
                    base64ToArrayBuffer(bluetoothKey)
                  );
                  device
                    .writeCharacteristicWithoutResponseForService(
                      "0000fee1-0000-1000-8000-00805f9b34fb",
                      "00000009-0000-3512-2118-0009af100700",
                      arrayToBase64(connectionKey)
                    ) // STEP 2 ------ We send \x01\x00 + our key on base64
                    .then(data => {
                      console.log("dataaaa from step 2");
                      console.log(data);
                      console.log("end dataaaa step 2");
                    })
                    .catch(e => {
                      console.log(e);
                    });

                  /* services() Promise which emits array of Service objects which are discovered by this device. */
                  /* const services = await currentDevice.services();
                  console.log('services ...');
                  console.log(services);
                  console.log('services over!!!!!!!!!!');
                  console.log('charcPromis !!!!');

                  const charPromises = services.map(
                    service => service.characteristics(),

                  ); */

                  /* characteristics() chPromise which emits array of Characteristic objects which are discovered for this service. */
                  /*  const characteristics = await Promise.all(charPromises);
                  console.log('charctaristic');
                  console.log(characteristics);
                  console.log('charctaristic  over!!!'); */
                  /* table containe table of services caracteristics   */
                  /*   characteristics.forEach(serv => {
                    console.log('!!!!!!!!!!!!!!!!!!!!!!!!!!!');

                    console.log('char in same service ');

                    serv.forEach(char => {
                      console.log(' service uuid');

                      console.log(char.serviceUUID);
                      console.log(' serviceId');
                      console.log(char.serviceID);
                      console.log('char Id');
                      console.log(char.id);

                      console.log('char uuid');
                      console.log(char.uuid);

                      console.log('char isReadable : ');
                      console.log(char.isReadable);
                      console.log('char value : ');
                      console.log(char.value);
                      console.log('char discriptors : ');

                      console.log(char.descriptors[0]);
                    });
                  }); */
                }

                /* if (
                  device.name === 'HONOR Band 5i-FE3'  ||
                  device.id === '38:FB:14:B7:6F:E3' 
                ) {
                  manager.stopDeviceScan();
                  device
                    .connect()
                    .then(device => {
                      console.log('device caracteristic');
                      console.log(
                        device,
                      );*/
                /* return device.discoverAllServicesAndCharacteristics(); */
                /* })
                    .then(device => {
                      // Do work on device with services and characteristics
                    })
                    .catch(error => {
                      // Handle errors
                      console.log('connect error :' + error);
                    });
                } */
              });
            }
            return true;
          }}
        />
      </View>
    </View>
  );
};

export default BluetoothScanner;
