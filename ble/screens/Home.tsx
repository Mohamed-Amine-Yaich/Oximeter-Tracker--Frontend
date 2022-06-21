import React, { useEffect, useReducer, useState } from 'react';
import {
  ActivityIndicator,
  Button,
  FlatList,
  StyleSheet,
  Text,
  View,
  StatusBar,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Colors } from 'react-native/Libraries/NewAppScreen';
import { DeviceCard } from '../components/DeviceCard';
import { BleManager, Device } from 'react-native-ble-plx';
import { theme } from '../theme';

const manager = new BleManager();

// Reducer to add only the devices which have not been added yet
// When the bleManager search for devices, each time it detect a ble device, it returns the ble device even if this one has already been returned
const reducer = (
  state: Device[],
  action: { type: 'ADD_DEVICE'; payload: Device } | { type: 'CLEAR' },
): Device[] => {
  switch (action.type) {
    case 'ADD_DEVICE':
      const { payload: device } = action;

      // check if the detected device is not already added to the list
      if (device && !state.find((dev) => dev.id === device.id)) {
        return [...state, device];
      }
      return state;
    case 'CLEAR':
      return [];
    default:
      return state;
  }
};

/* const requestPermission = async () => {
  const granted = await PermissionsAndroid.request(
    PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
    {
      title: 'Request for Location Permission',
      message: 'Bluetooth Scanner requires access to Fine Location Permission',
      buttonNeutral: 'Ask Me Later',
      buttonNegative: 'Cancel',
      buttonPositive: 'OK',
    },
  );
  return granted === PermissionsAndroid.RESULTS.GRANTED;
}; */
const HomeScreen = () => {
  // reducer to store and display detected ble devices
  const [scannedDevices, dispatch] = useReducer(reducer, []);

  // state to give the user a feedback about the manager scanning devices
  const [isLoading, setIsLoading] = useState(false);

  const scanDevices = () => {
    // display the Activityindicator
    setIsLoading(true);

    // scan devices
    manager.startDeviceScan(null, null, (error, scannedDevice) => {
      if (error) {
        console.warn(error);
      }

      // if a device is detected add the device to the list by dispatching the action into the reducer
      if (scannedDevice) {
        dispatch({ type: 'ADD_DEVICE', payload: scannedDevice });
      }
    });

    // stop scanning devices after 5 seconds
    setTimeout(() => {
      manager.stopDeviceScan();
      setIsLoading(false);
    }, 5000);
  };

  const ListHeaderComponent = () => (
    <View style={styles.body}>
      <View style={styles.sectionContainer}>
        <Text style={styles.sectionTitle}>scan and select your device :</Text>
      </View>
      <View style={styles.sectionContainer}>
        <Button
          color={'#009387'}
          title="Clear "
          onPress={() => dispatch({ type: 'CLEAR' })}
        />
        {isLoading ? (
          <View style={styles.activityIndicatorContainer}>
            <ActivityIndicator color={'#009387'} size={25} />
          </View>
        ) : (
          <Button
            color={'#009387'}
            title="Scan "
            onPress={async () => {
              const btState = await manager.state();
              // test if bluetooth is powered on

              if (btState !== 'PoweredOn') {
                await manager.enable();
              }
              // explicitly ask for user's permission

              if (btState === 'PoweredOn') {
                scanDevices();
              }
            }}
          />
        )}
      </View>
    </View>
  );

  useEffect(() => {
    return () => {
      manager.destroy();
    };
  }, []);
  return (
    <SafeAreaView style={styles.body}>
      <StatusBar backgroundColor="#009387" barStyle="light-content" />
      <FlatList
        keyExtractor={(item) => item.id}
        data={scannedDevices}
        renderItem={({ item }) => <DeviceCard key={item.id} device={item} />}
        ListHeaderComponent={ListHeaderComponent}
        contentContainerStyle={styles.content}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  body: {
    backgroundColor: Colors.red,
    marginBottom: 20,
  },
  sectionContainer: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    textAlign: 'left',
    fontSize: 24,
    fontWeight: 'bold',
    color: Colors.black,
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
    color: Colors.dark,
  },
  content: {
    backgroundColor: theme.colors.secondary,
    paddingHorizontal: theme.spacing * 2,
  },
  activityIndicatorContainer: { marginVertical: 6 },
});

export { HomeScreen };
