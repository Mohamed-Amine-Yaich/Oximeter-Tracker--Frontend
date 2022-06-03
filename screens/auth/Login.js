import React, { useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  Platform,
  StyleSheet,
  StatusBar,
  Alert,
} from "react-native";
import * as Animatable from "react-native-animatable";
import { LinearGradient } from "expo-linear-gradient";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import Feather from "react-native-vector-icons/Feather";
//using two icone form feather and font awsome

import AsyncStorage from "@react-native-async-storage/async-storage";

import { AuthContext } from "../../components/context";
/* import { useTheme } from "react-native-paper"



import Users from "../../model/users"; */

import { loginService } from "../../api/service";

//we can import useThem from these two library (useTheme from react native paper)
//import { useTheme } from "@react-navigation/native";
import { useTheme } from "react-native-paper";

const Login = ({ navigation }) => {
  //useTheme fo the dark theme
  const { colors } = useTheme();

  const [data, setData] = React.useState({
  /*    email: "doctor1@gmail.com",
    password: "wiss12345", */
     email: "amine@gmail.com",
    password: "wissamine0407", 
    passwordIsValid: true,
    emailIsvalid: true,
    check_textInputChange: false,
    secureTextEntry: true,
  });

  //data that will be send over the request
  const userData = { email: data.email, password: data.password };

  const [DataResponse, setDataResponse] = React.useState(null);

  const { signIn } = React.useContext(AuthContext);

  const textInputChange = val => {
    if (val.trim().length > 5) {
      setData({
        ...data,
        email: val,
        check_textInputChange: true,
        emailIsvalid: true,
      });
    } else {
      setData({
        ...data,
        email: val,
        check_textInputChange: false,
        emailIsvalid: false,
      });
    }
  };
  /* take the val from input and save in in the password state */
  const handelPasswordChange = val => {
    if (val.trim().length > 8) {
      setData({ ...data, password: val, passwordIsValid: true });
    } else {
      //if the password is invalid  the we must not assing the data to the password feild
      setData({ ...data, password: val, passwordIsValid: false });
    }
  };
  /* inverse the stae of the secureText variable and change the secureTextEntry prop in input field    */
  const updateSecureTextEntry = () => {
    setData({ ...data, secureTextEntry: !data.secureTextEntry });
  };

  /*    remove the text that appere for resetting the email and password
 /*    useEffect(() => {
    setTimeout(() => {
      setDataResponse(null);
    }, 5000);
  }, [DataResponse]);
 */

  //need user data to verify an put the alert message
  const handelLogin = async () => {
    //getting respnose from the service
    console.log("handel login");
    console.log(userData);

    /*  if (userData.email.length === 0 || userData.password.length === 0) {
      Alert.alert("Inputs ", "email and password cannot be empty");
    }
 */
    // console.log(await loginService(userData));
    //we hawe the hole response the the service
    const res = await loginService(userData);

    /*alerts decomment them 
    if (res === "Failed") {
      Alert.alert(
        "No user found ",
        "there is no user with this email and password"
      );
    } */
    /*   console.log(res.data);
    console.log(res); //for failed */

    await setDataResponse(res);
    /* console.log("login :" + res.data.status);
    console.log(res.headers["set-cookie"][0]);
    console.log(res.data.data.user); */

    const cookieToken = res.headers["set-cookie"][0]
      .split(";")[0]
      .split("=")[1];
    const Bearertoken = `Bearer ${cookieToken}`;

    try {
      await AsyncStorage.setItem("@storage_Key", Bearertoken);
    } catch (e) {
      console.log("asyncerr" + e);
    }

    ///>>>
    //<< send data to app.js throw signIn method in App AuthContext
    //we recieve data from backend and when we submit the form with cookie and statuts that we will use for auth
    //call singIn function in useMemo in app.js with the status and the data for passing it to other screens
    //pass the status and the cookies to the signIn function
    signIn(res.data.status, Bearertoken, res.data.data.user);
    //>>>
  };

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor="#009387" barStyle="light-content" />

      {/* header */}
      <View style={styles.header}>
        <Text style={styles.text_header}>Welcome !</Text>
      </View>

      {/* footer */}
      <Animatable.View
        style={[styles.footer, { backgroundColor: colors.background }]}
        animation="fadeInUpBig"
      >
        {/* email */}
        <Text style={(styles.text_footer, { color: colors.text })}>Email</Text>
        {/* action */}

        <View style={styles.action}>
          <Feather name="mail" color={colors.text} size={20} />
          <TextInput
            placeholder="Your Email "
            placeholderTextColor="#666666"
            style={[styles.textInput, { color: colors.text }]}
            autoCapitalize="none"
            onChangeText={val => textInputChange(val)}
          />
          {data.check_textInputChange ? (
            <Animatable.View animation="bounceIn">
              <Feather name="check-circle" color="green" size={20} />
            </Animatable.View>
          ) : null}
        </View>

        {/* email error message */}
        {data.emailIsvalid ? null : (
          <Animatable.View animation="fadeInLeft" duration={500}>
            <Text style={styles.errorMsg}> Email is in the wrong format</Text>
          </Animatable.View>
        )}

        {/* password*/}
        <Text
          style={[
            styles.text_footer,
            { marginTop: 35 },
            { color: colors.text },
          ]}
        >
          Password
        </Text>
        {/* action */}
        <View style={styles.action}>
          <Feather name="lock" color={colors.text} size={20} />
          <TextInput
            placeholder="Your Password "
            placeholderTextColor="#666666"
            secureTextEntry={data.secureTextEntry}
            style={[styles.textInput, { color: colors.text }]}
            autoCapitalize="none"
            onChangeText={val => handelPasswordChange(val)}
          />
          <TouchableOpacity onPress={updateSecureTextEntry}>
            {data.secureTextEntry ? (
              <Feather name="eye-off" color="grey" size={20} />
            ) : (
              <Feather name="eye" color="grey" size={20} />
            )}
          </TouchableOpacity>
        </View>
        {/* password error message */}

        {data.passwordIsValid ? null : (
          <Animatable.View animation="fadeInLeft" duration={500}>
            <Text style={styles.errorMsg}>
              {" "}
              Password must be 8 characters long.
            </Text>
          </Animatable.View>
        )}
        {/*forget password  */}
        <TouchableOpacity onPress={() => navigation.navigate("ForgetPassword")}>
          <Text style={{ color: "#009387", marginTop: 15 }}>
            Forgot password?
          </Text>
        </TouchableOpacity>

        {/* try for err message   
      {DataResponse === "Failed" ? (
          <Text style={{ color: "#009387", marginTop: 15 }}>
            email or password are not true please relogin
          </Text>
        ) : null} */}

        {/* costume button signin */}
        <View style={styles.button}>
          {/* signin button */}
          <TouchableOpacity
            onPress={() => {
              handelLogin();

              /*  signIn(res); */
            }}
            style={styles.signIn}
          >
            <LinearGradient
              colors={["#08d4c4", "#01ab9d"]}
              style={styles.signIn}
            >
              <Text style={[styles.textSign, { color: colors.text }]}>
                sgin In
              </Text>
            </LinearGradient>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => navigation.navigate("Signup")}
            style={[
              styles.signIn,
              { borderColor: "#009387", borderWidth: 1, marginTop: 15 },
            ]}
          >
            <Text
              style={[
                styles.textSign,
                {
                  color: "#009387",
                },
              ]}
            >
              {" "}
              sign up{" "}
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => navigation.navigate("ResetPassword")}
            style={[
              styles.signIn,
              { borderColor: "#009387", borderWidth: 1, marginTop: 15 },
            ]}
          >
            <Text
              style={[
                styles.textSign,
                {
                  color: "#009387",
                },
              ]}
            >
              {" "}
              Reset Password{" "}
            </Text>
          </TouchableOpacity>
        </View>

        {/* footer */}
      </Animatable.View>

      {/* container */}
    </View>
  );
};
export default Login;

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
    marginTop: 50,
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
});
