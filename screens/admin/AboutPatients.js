import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  ScrollView,
} from "react-native";
//import { AuthContext } from "../../components/context";

//import { updateDoctor } from "./../../api/service";

const AboutPatients = ({ navigation, route }) => {
  //const { updateUserData } = React.useContext(AuthContext);

  /*  React.useEffect(() => {
    console.log(route.params.currentUser.role);
  }); */

  /* const handelDeletePatientaccounet = async () => {
    const res = await updateDoctor(
      { doctor: route.params.item.id },
      route.params.token
    );
    console.log("handelUpdatedoctor");
  };
 */
  return (
    <ScrollView>
      <View style={styles.container}>
        <View style={styles.postContent}>
          <Text style={styles.postTitle}>
            Lorem ipsum dolor sit amet, consectetuer adipiscing elit.
          </Text>
          <Text style={styles.postDescription}>
            Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean
            commodo ligula eget dolor. Aenean massa. Cum sociis natoque
            penatibus et magnis dis parturient montes, nascetur ridiculus mus.
            Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem.
            Nulla consequat massa quis enim.
          </Text>
          <Text style={styles.tags}>
            Lorem, ipsum, dolor, sit, amet, consectetuer, adipiscing, elit.
          </Text>
          <Text style={styles.date}>2017-11-27 13:03:01</Text>
          <View style={styles.profile}>
            <Image
              style={styles.avatar}
              source={{
                uri: "https://bootdey.com/img/Content/avatar/avatar2.png",
              }}
            />
            <View>
              <Text style={styles.name}>{route.params.item.lastName}</Text>
              <Text style={styles.name}>{route.params.item.name}</Text>
            </View>
          </View>

          <TouchableOpacity
            style={styles.shareButton}
            onPress={() => {}} /* handelDeletePatientaccounet */
          >
            <Text style={styles.shareButtonText}>delete account</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
};

export default AboutPatients;
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    padding: 30,
    alignItems: "center",
    backgroundColor: /* "#00BFFF" */ "#009387",
  },
  headerTitle: {
    fontSize: 30,
    color: "#FFFFFF",
    marginTop: 10,
  },
  name: {
    fontSize: 22,
    color: "#FFFFFF",
    fontWeight: "600",
  },
  postContent: {
    flex: 1,
    padding: 30,
  },
  postTitle: {
    fontSize: 26,
    fontWeight: "600",
  },
  postDescription: {
    fontSize: 16,
    marginTop: 10,
  },
  tags: {
    color: /* ' #00BFFF ' */ "#009387",
    marginTop: 10,
  },
  date: {
    color: "black",
    marginTop: 10,
  },
  avatar: {
    width: 70,
    height: 70,
    borderRadius: 35,
    borderWidth: 4,
    borderColor: "#009387",
  },
  profile: {
    flexDirection: "row",
    marginTop: 20,
  },
  name: {
    fontSize: 18,
    color: "#009387",
    fontWeight: "600",
    alignSelf: "center",
    marginLeft: 10,
  },
  shareButton: {
    marginTop: 10,
    height: 45,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 30,
    backgroundColor: "#009387",
  },
  shareButtonText: {
    color: "#FFFFFF",
    fontSize: 20,
  },
});
