import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  TouchableOpacity,
} from "react-native";

import MenuItem from "./MenuItem";

const menus = [
  {
    title: "Name",
  },
  {
    title: "Mobile Number",
  },
  {
    title: "E-mail",
  },
  {
    title: "Change Password",
  },
  {
    title: "Address",
  },
  {
    title: "About",
  },
];

export default Account = props => {
  return (
    <View>
      <View style={styles.profileImageContainer}>
        <Image
          source={{uri:"https://bootdey.com/img/Content/avatar/avatar6.png"}}
          style={styles.profileImage}
        />
        <TouchableOpacity>
          <View style={styles.smallIconContainer}>
            <Image
              source={{uri : "https://github.com/zestgeek/react-native-auth-ui/blob/master/app/assets/images/edit_small/edit_small%402x.png"}}
              style={styles.smallIcon}
            />
          </View>
        </TouchableOpacity>
      </View>
      <View style={{ marginTop: 65 }}>
        <Text style={styles.name}>Billy McCoy</Text>
        <Text style={styles.description}>Ui & Ux Designer</Text>
        <ScrollView style={styles.menuContainer}>
          {menus.map((menu, key) => (
            <MenuItem
              title={menu.title}
              key={key}
              firstItem={key === 0 ? true : false}
            />
          ))}
        </ScrollView>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  profileImageContainer: {
    position: "absolute",
    top: -65,
    alignSelf: "center",
  },
  profileImage: {
    height: 130,
    width: 130,
    borderRadius: 65,
    borderColor: "#fff",
    borderWidth: 6,
  },
  smallIconContainer: {
    position: "absolute",
    backgroundColor: "#fff",
    borderWidth: 2,
    borderColor: "#8CC33F",
    width: 24,
    height: 24,
    borderRadius: 12,
    right: 5,
    bottom: 15,
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  name: {
    fontFamily: "Poppins-Semibold",
    fontSize: 20,
    letterSpacing: 0,
    color: "#262626",
    alignSelf: "center",
  },
  description: {
    fontFamily: "Poppins-Medium",
    fontSize: 12,
    letterSpacing: 0,
    color: "#808080",
    alignSelf: "center",
  },
  menuContainer: {
    marginTop: 25,
  },
});
