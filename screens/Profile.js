import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
  StatusBar,
  Platform,
  RefreshControl,
} from "react-native";

import * as Animatable from "react-native-animatable";
import { LinearGradient } from "expo-linear-gradient";
import { AuthContext } from "../components/context";
import { useTheme } from "react-native-paper";

import Feather from "react-native-vector-icons/Feather";

import { getMe } from "../api/service";

function Profile({ navigation, route }) {
  const { colors } = useTheme();
  const [userData, setUserData] = React.useState(null);


  
/* refrech the page */
  React.useEffect(() => {
    const unsubscribe = navigation.addListener('focus',async () => {
      const userData = await getMe(route.params.token);
      console.log("userData" + userData);
     
      if (userData) {
        setUserData(userData);
      }

    });
    return unsubscribe;
  }, [navigation]);



/* the request is not useless cause when data change we need to request again
pass the currentUser to the profile stack in intialparams 
maybe user data will not be refreshed when we change it  */
  React.useEffect(async () => {
    /* wait for the data user from api */
    const userData = await getMe(route.params.token);
    console.log("userData" + userData);
    /* when userData update the state of the userdata */
    if (userData) {
      setUserData(userData);
    }
  }, []);
  if (userData) {
    return (
      
      <View
        style={styles.container}
        
      >
        <StatusBar backgroundColor="#009387" barStyle="light-content" />

        {/* header */}
        <View style={styles.header}>
          <View style={styles.header}>
            <Image
              style={styles.avatar}
              source={{
                uri: "https://bootdey.com/img/Content/avatar/avatar6.png",
              }}
            />

            <Text style={styles.text_header}>Name : {userData.name} </Text>
            <Text style={styles.text_header}>
              Last Name : {userData.lastName}
            </Text>
            <Text style={styles.text_header}>Email :{userData.email}</Text>
            {userData.role === "patient" ? (
              <Text style={styles.text_header}>Device :{userData.device}</Text>
            ) : null}
          </View>
        </View>

        {/* footer */}
        <Animatable.View
          style={[styles.footer, { backgroundColor: colors.background }]}
          animation="fadeInUpBig"
        >
          {/* costume button  */}
          <View style={styles.button}>
            {/* udateme button */}
            <TouchableOpacity
              onPress={() => navigation.navigate("UpdateMe")}
              style={styles.signIn}
            >
              <LinearGradient
                colors={["#08d4c4", "#01ab9d"]}
                style={styles.signIn}
              >
                <Text style={[styles.textSign, { color: colors.text }]}>
                  Update Me
                </Text>
              </LinearGradient>
            </TouchableOpacity>
            {userData.role === "patient" ? (
              <TouchableOpacity
                onPress={() => navigation.navigate("UpdateDoctor")}
                style={styles.signIn}
              >
                <LinearGradient
                  colors={["#08d4c4", "#01ab9d"]}
                  style={styles.signIn}
                >
                  <Text style={[styles.textSign, { color: colors.text }]}>
                    Update doctor
                  </Text>
                </LinearGradient>
              </TouchableOpacity>
            ) : null}

            <TouchableOpacity
              onPress={() => navigation.navigate("UpdatePassword")}
              style={styles.signIn}
            >
              <LinearGradient
                colors={["#08d4c4", "#01ab9d"]}
                style={styles.signIn}
              >
                <Text style={[styles.textSign, { color: colors.text }]}>
                  Update Password
                </Text>
              </LinearGradient>
            </TouchableOpacity>
          </View>

          {/* footer */}
        </Animatable.View>

        {/* container */}
      </View>
    );
  } else {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" color="green" />
      </View>
    );
  }
}
export default Profile;
const styles = StyleSheet.create({
  avatar: {
    width: 130,
    height: 130,
    borderRadius: 63,
    borderWidth: 4,
    borderColor: "white",
    marginBottom: 10,
  },
  /*  name: {
    fontSize: 16,
    color: "#000000",
    fontWeight: "600",
  },
  userInfo: {
    fontSize: 16,
    color: "#778899",
    fontWeight: "600",
  },
  body: {
    backgroundColor: "#009387",
    height: 500,
    alignItems: "center",
  },
  item: {
    flexDirection: "row",
  },
  infoContent: {
    flex: 1,
    alignItems: "flex-start",
    paddingLeft: 5,
  },
  iconContent: {
    flex: 1,
    alignItems: "flex-end",
    paddingRight: 5,
  }, */
  /*  icon: {
    width: 30,
    height: 30,
    marginTop: 20,
  },
  buttonContainer: {
    marginTop: 10,
    height: 45,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
    width: 250,
    borderRadius: 30,
    backgroundColor: "#00BFFF",
  }, */
  info: {
    fontSize: 18,
    marginTop: 20,
    color: "#FFFFFF",
  },

  container: {
    flex: 1,
    backgroundColor: "#009387",
  },
  header: {
    flex: 4,
    justifyContent: "flex-end",
    paddingHorizontal: 20,
    paddingBottom: 20,
    alignItems: "center",
  },
  footer: {
    flex: 3,
    backgroundColor: "#fff",
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingHorizontal: 20,
    paddingVertical: 30,
  },
  text_header: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 15,
  },
  text_footer: {
    color: "#05375a",
    fontSize: 18,
  },
  action: {
    flexDirection: "row",
    marginTop: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#f2f2f2",
    paddingBottom: 5,
  },

  button: {
    alignItems: "center",
    marginTop: 20,
    marginBottom: 20,
  },
  signIn: {
    width: "100%",
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
    marginTop: 20,
  },
  textSign: {
    fontSize: 18,
    fontWeight: "bold",
  },
});
