import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Button,
  TouchableHighlight,
  Alert,
  Image,
  FlatList,
  TouchableOpacity,
} from "react-native";
import DrawerButton from "../../DrawerButton";
import { Block } from "../components";

import { getDataForDoctor } from "../../api/service";
const HistoriquePatientForDoctor = ({ navigation, route }) => {
  let token = route.params.token;
  let currentUser = route.params.currentUser; //doctor
  let patient = route.params.item;
  let item = route.params.item;

  const [data, setData] = React.useState([]);

  const getYear = date => {
    /* console.log(date.split("-")[0]); */
    return date.split("-")[0];
  };
  const getDay = date => {
    /*   console.log(date.split("-")[1]); */
    /* this give day */
    return date.split("-")[2][0] + date.split("-")[2][1];
  };
  const getMonth = date => {
    return date.split("-")[1];
  };
  const getTime = date => {
    return date.split("-")[2].slice(3, 11);
  };
  const eventClickListener = viewId => {
    Alert.alert("alert", "event clicked");
  };

  React.useEffect(async () => {
    // console.log("receiver :" + route.params.item.id);
    // id patient is the item passed  to this screen for getting the req
    let data = await getDataForDoctor(token, item.id);
    data
      ? console.log(" you have data from backend")
      : console.log("theres is no data from backend");

    setData(data);
  }, [data]);
  return (
    <View>
      <View style={styles.container}>
        <FlatList
          showsVerticalScrollIndicator={false}
          extraData={data}
          enableEmptySections={true}
          inverted={-1}
          style={styles.eventList}
          data={data}
          keyExtractor={item => {
            return item.id;
          }}
          renderItem={({ item }) => {
            return (
              //if data are not from the same day we desplay a hirzontal line

              <TouchableOpacity key={item.id} onPress={() => {}}>
                <Text style={styles.eventMonth}>{getYear(item.createdAt)}</Text>
                <View style={styles.eventBox}>
                  <View style={styles.eventDate}>
                    <Text style={styles.eventDay}>
                      {getDay(item.createdAt)}
                    </Text>
                    <Text style={styles.eventMonth}>
                      {getMonth(item.createdAt)}
                    </Text>
                  </View>
                  <View style={styles.eventContent}>
                    <View
                      style={{
                        flexDirection: "row",
                        alignItems: "center",
                      }}
                    >
                      <Text style={{ marginRight: 30 }}>measurement at :</Text>
                      <Text style={styles.eventTime}>
                        {getTime(item.createdAt)}
                      </Text>
                    </View>

                    <View
                      style={{
                        flexDirection: "row",
                        alignSelf: "center",
                        alignItems: "center",
                      }}
                    >
                      <View style={{ alignItems: "center" }}>
                        <Text style={styles.DataValues}>{item.spo2}</Text>
                        <Text style={styles.description}>Spo2(%)</Text>
                      </View>
                      <Block
                        flex={false}
                        color="#009387"
                        style={styles.vLine}
                      />
                      <View style={{ alignItems: "center" }}>
                        <Text style={styles.DataValues}>{item.heart}</Text>
                        <Text style={styles.description}>BPM</Text>
                      </View>
                      <Block
                        flex={false}
                        color="#009387"
                        style={styles.vLine}
                      />

                      <View style={{ alignItems: "center" }}>
                        <Text style={styles.DataValues}>{item.pi}</Text>
                        <Text style={styles.description}>Pi(%)</Text>
                      </View>
                    </View>
                  </View>
                </View>
              </TouchableOpacity>
            );
          }}
        />
      </View>
    </View>
  );
};

export default HistoriquePatientForDoctor;
const styles = StyleSheet.create({
  container: {
    backgroundColor: "#DCDCDC",
  },
  eventList: {
    marginTop: 20,
    padding: 20,
  },
  eventBox: {
    padding: 10,
    marginTop: 5,
    marginBottom: 5,
    flexDirection: "row",
  },
  eventDate: {
    flexDirection: "column",
  },
  eventDay: {
    fontSize: 40,
    color: "#0099FF",
    fontWeight: "600",
  },
  eventMonth: {
    fontSize: 12,
    color: "#0099FF",
    fontWeight: "600",
  },
  eventContent: {
    flex: 1,
    flexDirection: "column",
    alignItems: "flex-start",
    marginLeft: 10,
    backgroundColor: "#FFFFFF",
    padding: 10,
    borderRadius: 10,
  },
  description: {
    fontSize: 12,
    color: "#646464",
    alignSelf: "center",
  },
  eventTime: {
    fontSize: 15,
    color: "#151515",
    alignSelf: "center",
  },
  userName: {
    fontSize: 14,
    color: "#151515",
  },
  vLine: {
    width: 2,
    height: 40,
    borderRadius: 5,
    margin: 20,
  },
  DataValues: {
    fontSize: 30,
    color: "#0099FF",
    opacity: 0.5,
    fontWeight: "600",
  },
  topContainer: {
    padding: 10,
  },
});
