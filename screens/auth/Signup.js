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
const Signup = ({ navigation }) => {
  const { colors } = useTheme();

  const [SignupResponse, setSignupResponse] = React.useState(null);
  const [data, setData] = React.useState({
    name: "mohamed amine",
    email: "amine@gmail.com",
    password: "wissamine0407",
    confirmPassword: "wissamine0407",
    check_textInputChange_email: false,
    check_textInputChange_name: false,

    secureTextEntry: true,
  });

  //the defautl user that will sign up (register)
  const currentUserData = {
    name: data.name,
    email: data.email,
    password: data.password,
    confirmPassword: data.confirmPassword,
    lastName: "yaich",
    role: "patient",
    device: "honorplay",
    doctor: "624a2e334caf002214915395",
  };

  const { signUp } = React.useContext(AuthContext);

  const textInputChangeEmail = val => {
    if (val.length !== 0) {
      setData({ ...data, email: val, check_textInputChange_email: true });
    } else {
      setData({ ...data, email: val, check_textInputChange_email: false });
    }
  };

  const textInputChangeName = val => {
    if (val.length !== 0) {
      setData({ ...data, name: val, check_textInputChange_name: true });
    } else {
      setData({ ...data, name: val, check_textInputChange_name: false });
    }
  };
  /* take the val from input and save in in the password state */
  const handelPasswordChange = val => {
    setData({ ...data, password: val });
  };
  const handelConfirmPasswordChange = val => {
    setData({ ...data, ConfirmPassword: val });
  };
  /* inverse the stae of the secureText variable and change the secureTextEntry prop in input field    */
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

  const handelSignup = () => {
    //=>const res = signUpService(currentUserData);
    //call the AuthContext methode with user data
    signUp(currentUserData);
    console.log(" bay handel sing up ");
  };

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor="#009387" barStyle="light-content" />

      {/* top bar */}
      {/*     <StatusBar backgroundColor="#009387" barStyle="light-content" /> */}

      {/* header */}
      <View style={styles.header}>
        <Text style={styles.text_header}>Register Now !</Text>
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
            Username
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
          {/* password*/}
          <Text
            style={[
              styles.text_footer,
              { marginTop: 15 },
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
              secureTextEntry={data.updateSecureTextEntry_password}
              style={styles.textInput}
              autoCapitalize="none"
              onChangeText={val => handelPasswordChange(val)}
            />
            <TouchableOpacity onPress={updateSecureTextEntry_password}>
              {data.updateSecureTextEntry_password ? (
                <Feather name="eye-off" color="grey" size={20} />
              ) : (
                <Feather name="eye" color="grey" size={20} />
              )}
            </TouchableOpacity>
          </View>
          {/* confirm password*/}
          <Text
            style={[
              styles.text_footer,
              { marginTop: 15 },
              { color: colors.text },
            ]}
          >
            Confirm Password
          </Text>
          {/* action */}
          <View style={styles.action}>
            <Feather name="lock" color={colors.text} size={20} />
            <TextInput
              placeholder="Confirm Your Password "
              placeholderTextColor="#666666"
              secureTextEntry={data.updateSecureTextEntry_confirm}
              style={styles.textInput}
              autoCapitalize="none"
              onChangeText={val => handelConfirmPasswordChange(val)}
            />
            <TouchableOpacity onPress={updateSecureTextEntry_confirm}>
              {data.updateSecureTextEntry_confirm ? (
                <Feather name="eye-off" color="grey" size={20} />
              ) : (
                <Feather name="eye" color="grey" size={20} />
              )}
            </TouchableOpacity>
          </View>


          
          {/* privacy text  */}
          <View style={styles.textPrivate}>
            <Text style={styles.color_textPrivate}>
              By signing up you agree to our
            </Text>
            <Text style={[styles.color_textPrivate, { fontWeight: "bold" }]}>
              {" "}
              Terms of service
            </Text>
            <Text style={styles.color_textPrivate}> and</Text>
            <Text style={[styles.color_textPrivate, { fontWeight: "bold" }]}>
              {" "}
              Privacy policy
            </Text>
          </View>

          {/* signup response from server test */}

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
                /* signUp(); */
                handelSignup();
              }}
              style={styles.signIn}
            >
              <LinearGradient
                colors={["#08d4c4", "#01ab9d"]}
                style={styles.signIn}
              >
                <Text style={styles.textSign}>sgin Up</Text>
              </LinearGradient>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => navigation.navigate("Login")}
              style={[
                styles.signIn,
                { borderColor: "#009387", borderWidth: 1, marginTop: 15 },
              ]}
            >
              <Text style={[styles.textSign, { color: colors.text }]}>
                {" "}
                sign In{" "}
              </Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
        {/* footer */}
      </Animatable.View>

      {/* container */}
    </View>
  );
};

export default Signup;

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
    flex: 4,
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

//////login js code
/* 
const [data, setData] = React.useState({
    username: "",
    password: "",
    check_textInputChange: false,
    secureTextEntry: true,
    isValidUser: true,
    isValidPassword: true,
  });

  const { colors } = useTheme();

  const { signIn } = React.useContext(AuthContext);

  const textInputChange = val => {
    if (val.trim().length >= 4) {
      setData({
        ...data,
        username: val,
        check_textInputChange: true,
        isValidUser: true,
      });
    } else {
      setData({
        ...data,
        username: val,
        check_textInputChange: false,
        isValidUser: false,
      });
    }
  };

  const handlePasswordChange = val => {
    if (val.trim().length >= 8) {
      setData({
        ...data,
        password: val,
        isValidPassword: true,
      });
    } else {
      setData({
        ...data,
        password: val,
        isValidPassword: false,
      });
    }
  };

  const updateSecureTextEntry = () => {
    setData({
      ...data,
      secureTextEntry: !data.secureTextEntry,
    });
  };

  const handleValidUser = val => {
    if (val.trim().length >= 4) {
      setData({
        ...data,
        isValidUser: true,
      });
    } else {
      setData({
        ...data,
        isValidUser: false,
      });
    }
  };

  const loginHandle = (userName, password) => {
    const foundUser = Users.filter(item => {
      return userName == item.username && password == item.password;
    });

    if (data.username.length == 0 || data.password.length == 0) {
      Alert.alert(
        "Wrong Input!",
        "Username or password field cannot be empty.",
        [{ text: "Okay" }]
      );
      return;
    }

    if (foundUser.length == 0) {
      Alert.alert("Invalid User!", "Username or password is incorrect.", [
        { text: "Okay" },
      ]);
      return;
    }
    signIn(foundUser);
  };
  return (
    /*   <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <StatusBar style="auto" />
      <Text>hello form login</Text>
      <Button
        title="Go to signup"
        onPress={() => {
          navigation.navigate("Signup");
        }}
      />
      <Button
        title="Go to forgetpass"
        onPress={() => {
          navigation.navigate("ForgetPassword");
        }}
      /> 
    
    </View>
    <View style={styles.container}>
      <StatusBar backgroundColor="#009387" barStyle="light-content" />
      <View style={styles.header}>
        <Text style={styles.text_header}>Welcome!</Text>
      </View>
      <Animatable.View
        animation="fadeInUpBig"
        style={[
          styles.footer,
          {
            backgroundColor: colors.background,
          },
        ]}
      >
        <Text
          style={[
            styles.text_footer,
            {
              color: colors.text,
            },
          ]}
        >
          Username
        </Text>
        <View style={styles.action}>
          <FontAwesome name="user-o" color={colors.text} size={20} />
          <TextInput
            placeholder="Your Username"
            placeholderTextColor="#666666"
            style={[
              styles.textInput,
              {
                color: colors.text,
              },
            ]}
            autoCapitalize="none"
            onChangeText={val => textInputChange(val)}
            onEndEditing={e => handleValidUser(e.nativeEvent.text)}
          />
          {data.check_textInputChange ? (
            <Animatable.View animation="bounceIn">
              <Feather name="check-circle" color="green" size={20} />
            </Animatable.View>
          ) : null}
        </View>
        {data.isValidUser ? null : (
          <Animatable.View animation="fadeInLeft" duration={500}>
            <Text style={styles.errorMsg}>
              Username must be 4 characters long.
            </Text>
          </Animatable.View>
        )}

        <Text
          style={[
            styles.text_footer,
            {
              color: colors.text,
              marginTop: 35,
            },
          ]}
        >
          Password
        </Text>
        <View style={styles.action}>
          <Feather name="lock" color={colors.text} size={20} />
          <TextInput
            placeholder="Your Password"
            placeholderTextColor="#666666"
            secureTextEntry={data.secureTextEntry ? true : false}
            style={[
              styles.textInput,
              {
                color: colors.text,
              },
            ]}
            autoCapitalize="none"
            onChangeText={val => handlePasswordChange(val)}
          />
          <TouchableOpacity onPress={updateSecureTextEntry}>
            {data.secureTextEntry ? (
              <Feather name="eye-off" color="grey" size={20} />
            ) : (
              <Feather name="eye" color="grey" size={20} />
            )}
          </TouchableOpacity>
        </View>
        {data.isValidPassword ? null : (
          <Animatable.View animation="fadeInLeft" duration={500}>
            <Text style={styles.errorMsg}>
              Password must be 8 characters long.
            </Text>
          </Animatable.View>
        )}

        <TouchableOpacity>
          <Text style={{ color: "#009387", marginTop: 15 }}>
            Forgot password?
          </Text>
        </TouchableOpacity>
        <View style={styles.button}>
          <TouchableOpacity
            style={styles.signIn}
            onPress={() => {
              loginHandle(data.username, data.password);
            }}
          >
            <LinearGradient
              colors={["#08d4c4", "#01ab9d"]}
              style={styles.signIn}
            >
              <Text
                style={[
                  styles.textSign,
                  {
                    color: "#fff",
                  },
                ]}
              >
                Sign In
              </Text>
            </LinearGradient>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => navigation.navigate("Signup")}
            style={[
              styles.signIn,
              {
                borderColor: "#009387",
                borderWidth: 1,
                marginTop: 15,
              },
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
              Sign Up
            </Text>
          </TouchableOpacity>
        </View>
      </Animatable.View>
    </View>
  );
*/
