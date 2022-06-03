/* import React, { Component } from "react";
import { View, Text, Button, TouchableOpacity, StatusBar } from "react-native";

function UpdateMe({ navigation }) {
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      {/* remove the black statusbar }
      <StatusBar backgroundColor="#009387" barStyle="light-content" />

      <Text> this is update Me screen</Text>
      {/*  <TouchableOpacity>
        <Text> get all </Text>
      </TouchableOpacity> 
    </View>
  );
}
export default UpdateMe; */
import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  Platform,
  StyleSheet,
  StatusBar,
  ScrollView,
  Alert,
} from "react-native";
import * as Animatable from "react-native-animatable";
import { LinearGradient } from "expo-linear-gradient";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import Feather from "react-native-vector-icons/Feather";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { updateMe } from "./../../api/service";

//=>useTheme from react-native-paper
import { useTheme } from "@react-navigation/native";

import { AuthContext } from "../../components/context";
//sign up service
import { signUpService } from "./../../api/service";
//using two icone form feather and font awsome

/* import { useTheme } from "react-native-paper";


import Users from "../../model/users"; */

/*   email: "",
    password: "",
    name: "",
    confirmPassword: "", */
const UpdateMe = ({ navigation, route }) => {
  const { colors } = useTheme();

  const [SignupResponse, setSignupResponse] = React.useState(null);
  const [data, setData] = React.useState({
    name: "mohamed amine",
    email: "amine@gmail.com",
    /*   password: "wissamine0407",
    confirmPassword: "wissamine0407", */
    lastName: "yaich",
    device: "honor play",
    check_textInputChange_email: false,
    check_textInputChange_name: false,
    check_textInputChange_lastname: false,
    check_textInputChange_device: false,
    secureTextEntry: true,
  });

  //the defautl user that will sign up (register)
  const currentUserData = {
    name: data.name,
    email: data.email,
    /*    password: data.password,
    confirmPassword: data.confirmPassword, */
    lastName: data.lastName,
    device: data.device,
  };

  const { updateMeContext } = React.useContext(AuthContext);

  const textInputChangeEmail = val => {
    if (val.length !== 0) {
      setData({ ...data, email: val, check_textInputChange_email: true });
    } else {
      setData({ ...data, email: val, check_textInputChange_email: false });
    }
  };

  const textInputChangeLastName = val => {
    if (val.length !== 0) {
      setData({ ...data, lastName: val, check_textInputChange_lastname: true });
    } else {
      setData({
        ...data,
        lastName: val,
        check_textInputChange_lastname: false,
      });
    }
  };
  const textInputChangeDevice = val => {
    if (val.length !== 0) {
      setData({ ...data, device: val, check_textInputChange_device: true });
    } else {
      setData({ ...data, device: val, check_textInputChange_device: false });
    }
  };

  const textInputChangeName = val => {
    if (val.length !== 0) {
      setData({ ...data, name: val, check_textInputChange_name: true });
    } else {
      setData({ ...data, name: val, check_textInputChange_name: false });
    }
  };

  /* /* take the val from input and save in in the password state 
  const handelPasswordChange = val => {
    setData({ ...data, password: val });
  };
  const handelConfirmPasswordChange = val => {
    setData({ ...data, ConfirmPassword: val });
  };
  /* inverse the stae of the secureText variable and change the secureTextEntry prop in input field    
  const updateSecureTextEntry_password = () => {
    setData({
      ...data,
      updateSecureTextEntry_password: !data.updateSecureTextEntry_password,
    });
  };
  const updateSecureTextEntry_confirm = () => {
    setData({
      ...data,
      updateSecureTextEntry_confirm: !data.updateSecureTextEntry_confirm,
    });
  };
 */

  const [isUpdated, setIsUpdated] = React.useState(false);

  const handelUpdateMe = async () => {
    //call the service
    //send data to update and the token
    const data = await updateMe(currentUserData, route.params.token);
    console.log("data form handel update me :" + data);
    if (data) {
      updateMeContext(data);
      setIsUpdated(true);
    }
    console.log(" handel update me finished !!!!");
  };

  {
    isUpdated
      ? setTimeout(() => {
          setIsUpdated(null);
        }, 3000)
      : null;
  }

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor="#009387" barStyle="light-content" />

      {/* top bar */}
      {/*     <StatusBar backgroundColor="#009387" barStyle="light-content" /> */}

      {/* header */}
      <View style={styles.header}>
        <Text style={styles.text_header}>Update account!</Text>
      </View>

      {/* footer */}
      <Animatable.View
        style={[styles.footer, { backgroundColor: colors.background }]}
        animation="fadeInUpBig"
      >
        <ScrollView>
          {/* for scrolling the page incase of many inpu field */}
          {/* name */}
          <Text style={[styles.text_footer, { color: colors.text }]}>
            User name
          </Text>
          {/* action name input  */}
          <View style={styles.action}>
            <FontAwesome name="user-o" color={colors.text} size={20} />
            <TextInput
              placeholder="Your Email "
              placeholderTextColor="#666666"
              style={styles.textInput}
              autoCapitalize="none"
              onChangeText={val => textInputChangeName(val)}
            />
            {data.check_textInputChange_name ? (
              <Animatable.View animation="bounceIn">
                <Feather name="check-circle" color="green" size={20} />
              </Animatable.View>
            ) : null}
          </View>
          {/* lastName */}
          <Text style={[styles.text_footer, { color: colors.text }]}>
            Last name
          </Text>
          {/* action name input  */}
          <View style={styles.action}>
            <FontAwesome name="user-o" color={colors.text} size={20} />
            <TextInput
              placeholder="Your Last Name "
              placeholderTextColor="#666666"
              style={styles.textInput}
              autoCapitalize="none"
              onChangeText={val => textInputChangeLastName(val)}
            />
            {data.check_textInputChange_lastname ? (
              <Animatable.View animation="bounceIn">
                <Feather name="check-circle" color="green" size={20} />
              </Animatable.View>
            ) : null}
          </View>
          {/* email */}
          <Text
            style={[
              styles.text_footer,
              { marginTop: 15 },
              { color: colors.text },
            ]}
          >
            Email
          </Text>
          {/* action */}
          <View style={styles.action}>
            <Feather name="mail" color={colors.text} size={20} />
            <TextInput
              placeholder="Your Email "
              placeholderTextColor="#666666"
              style={styles.textInput}
              autoCapitalize="none"
              onChangeText={val => textInputChangeEmail(val)}
            />
            {data.check_textInputChange_email ? (
              <Animatable.View animation="bounceIn">
                <Feather name="check-circle" color="green" size={20} />
              </Animatable.View>
            ) : null}
          </View>

          {/* email */}
          <Text
            style={[
              styles.text_footer,
              { marginTop: 15 },
              { color: colors.text },
            ]}
          >
            Device
          </Text>
          {/* action */}
          <View style={styles.action}>
            <MaterialCommunityIcons name="devices" color={colors.text} size={20} />
            <TextInput
              placeholder="Your Device "
              placeholderTextColor="#666666"
              style={styles.textInput}
              autoCapitalize="none"
              onChangeText={val => textInputChangeDevice(val)}
            />
            {data.check_textInputChange_device ? (
              <Animatable.View animation="bounceIn">
                <Feather name="check-circle" color="green" size={20} />
              </Animatable.View>
            ) : null}
          </View>

          {isUpdated ? (
            <View style={styles.textPrivate}>
              <Text style={styles.color_textPrivate}>
                Your data is updated{" "}
              </Text>
              <Text style={[styles.color_textPrivate, { fontWeight: "bold" }]}>
                {" "}
                successfully
              </Text>
            </View>
          ) : (
            <View style={styles.textPrivate}>
              <Text></Text>
            </View>
          )}

          {/* submit update*/}

          <View>
            {SignupResponse ? (
              <Text style={[styles.text_footer, { marginTop: 15 }]}>
                {SignupResponse}
              </Text>
            ) : null}
          </View>
          {/* costume button signin */}
          <View style={styles.button}>
            <TouchableOpacity
              onPress={() => {
                handelUpdateMe();
              }}
              style={styles.signIn}
            >
              <LinearGradient
                colors={["#08d4c4", "#01ab9d"]}
                style={styles.signIn}
              >
                <Text style={styles.textSign}>Update </Text>
              </LinearGradient>
            </TouchableOpacity>
          </View>
        </ScrollView>
        {/* footer */}
      </Animatable.View>

      {/* container */}
    </View>
  );
};

export default UpdateMe;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#009387",
  },
  header: {
    flex: 1,
    justifyContent: "flex-end",
    paddingHorizontal: 20,
    paddingBottom: 50,
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
    fontSize: 30,
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
  actionError: {
    flexDirection: "row",
    marginTop: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#FF0000",
    paddingBottom: 5,
  },
  textInput: {
    flex: 1,
    marginTop: Platform.OS === "ios" ? 0 : -12,
    paddingLeft: 10,
    color: "#05375a",
  },
  errorMsg: {
    color: "#FF0000",
    fontSize: 14,
  },
  button: {
    alignItems: "center",
    marginTop: 20,
  },
  signIn: {
    width: "100%",
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
  },
  textSign: {
    fontSize: 18,
    fontWeight: "bold",
  },
  textPrivate: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginTop: 20,
  },
  color_textPrivate: {
    color: "grey",
  },
});
