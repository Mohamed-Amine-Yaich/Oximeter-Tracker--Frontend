import React from "react";
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

import { useTheme } from "react-native-paper";

/*  import { AuthContext } from "../../components/context";
    
    import Users from "../../model/users"; */

const ForgetPassword = ({ navigation }) => {
  const { colors } = useTheme();

  const [data, setData] = React.useState({
    email: "",
    password: "",
    check_textInputChange: false,
    secureTextEntry: true,
  });

  const textInputChange = val => {
    if (val.length !== 0) {
      setData({ ...data, email: val, check_textInputChange: true });
    } else {
      setData({ ...data, email: val, check_textInputChange: false });
    }
  };
  /* take the val from input and save in in the password state */
  const handelPasswordChange = val => {
    setData({ ...data, password: val });
  };
  /* inverse the stae of the secureText variable and change the secureTextEntry prop in input field    */
  const updateSecureTextEntry = () => {
    setData({ ...data, secureTextEntry: !data.secureTextEntry });
  };

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor="#009387" barStyle="light-content" />
      {/* header */}
      <View style={styles.header}>
        <Text style={styles.text_header}>Forget Your Password !</Text>
      </View>

      {/* footer */}
      <Animatable.View
        style={[styles.footer, { backgroundColor: colors.background }]}
        animation="fadeInUpBig"
      >
        {/* email */}
        <Text style={[styles.text_foote, { color: colors.text }]}>Email</Text>
        {/* action */}

        <View style={styles.action}>
          <Feather name="mail" color={colors.text} size={20} />
          <TextInput
            placeholder="Your Email "
            placeholderTextColor="#666666"
            style={styles.textInput}
            autoCapitalize="none"
            onChangeText={val => textInputChange(val)}
          />
          {data.check_textInputChange ? (
            <Animatable.View animation="bounceIn">
              <Feather name="check-circle" color="green" size={20} />
            </Animatable.View>
          ) : null}
        </View>

        {/* costume button signin */}
        <View style={styles.button}>
          <LinearGradient colors={["#08d4c4", "#01ab9d"]} style={styles.signIn}>
            <Text style={styles.textSign}>submit </Text>
          </LinearGradient>
          <TouchableOpacity
            onPress={() => navigation.navigate("Login")}
            style={[
              styles.signIn,
              { borderColor: "#009387", borderWidth: 1, marginTop: 15 },
            ]}
          >
            <Text style={[styles.textSign,{color:colors.text}]}> sign In </Text>
          </TouchableOpacity>
        </View>

        {/* footer */}
      </Animatable.View>

      {/* container */}
    </View>
  );
};
export default ForgetPassword;

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
