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
import { Caption, Paragraph } from "react-native-paper";

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
    const unsubscribe = navigation.addListener("focus", async () => {
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
      <View style={styles.container}>
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
          </View>
        </View>

        {/* footer */}
        <Animatable.View
          style={[styles.footer, { backgroundColor: colors.background }]}
          animation="fadeInUpBig"
        >
          <View style={{ marginBottom: 70,alignItems:'center' }}>
            
            
            <View style={[styles.section]}>
              <View style={{ marginRight: 70,marginBottom:50 }}>
                <Text style={[styles.text_footer,{ fontWeight: 'bold' }]}>Name</Text>
                <Text style={styles.text_footer}>{userData.name}</Text>
              </View>
              <View>
                <Text style={[styles.text_footer,{ fontWeight: 'bold' }]}>LastName</Text>
                <Text style={styles.text_footer}>{userData.lastName}</Text>
              </View>
            </View>

            <View style={[styles.section,styles.text_footer]}>
              <View style={{ marginRight: 70 }}>
                <Text style={[styles.text_footer,{ fontWeight: 'bold' }]}>Email</Text>
                <Text style={styles.text_footer}>{userData.email}</Text>
              </View>
             
              {userData.role === "patient" ? (
              <View >
                <Text style={[styles.text_footer,{ fontWeight: 'bold' }]}> Device</Text>
                <Text  style={styles.text_footer} >
                {userData.device}
                </Text>
              
              </View>
               ) : null}
            </View>


            
            
            
            
            
            
          </View>

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
    marginTop: 0,
  },
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
    flex: 1,
    justifyContent: "flex-end",
    paddingHorizontal: 20,
    paddingBottom: 7,
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
  section: {
    flexDirection: "row",
    
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
