//creating a custum drawer for the app
import React from "react";
import { View, StyleSheet } from "react-native";

//same package that we use the methode to create the drawer
import { DrawerContentScrollView, DrawerItem } from "@react-navigation/drawer";

//need some api from react native paper for design the layout of the drawer
import {
  useTheme,
  Avatar,
  Title,
  Caption,
  Paragraph,
  Drawer,
  Text,
  TouchableRipple,
  Switch,
} from "react-native-paper";
//for the icons
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

//for logout
//for the getting the user data
import { AuthContext } from "./../components/context";

export function DrawerContent(props) {
  const { signOut } = React.useContext(AuthContext);
  const { toggelAppTheme } = React.useContext(AuthContext);

  //usetheme hooks one of his properties dark that return a boolean true if dark theme is active
  //useTheme()from the react-navigation/native or react-native-papaer
  const paperTheme = useTheme();

  /* 
 to set the dark theme  and set the value of the switch
  const [isDarkThem, setDarkThem] = React.useState(false);

  
  const toggelTheme = () => {
    setDarkThem(!isDarkThem);
    toggelAppTheme(isDarkThem)
  }; */

  return (
    <View style={{ flex: 1 }}>
      <DrawerContentScrollView {...props}>
        {props.role === "doctor" ? (
          <View
            style={styles.drawerContent /* , { backgroundColor: "#000" } */}
          >
            <View
              style={styles.userInfoSection /* , { backgroundColor: "red" } */}
            >
              {/* img, name , id */}
              <View style={{ flexDirection: "row", marginTop: 15 }}>
                <Avatar.Image
                  source={{
                    uri: "https://bootdey.com/img/Content/avatar/avatar6.png",
                  }}
                  size={50}
                />
                <View style={{ marginLeft: 15, flexDirection: "column" }}>
                  <Title style={styles.title}>
                    {" "}
                    {props.name} {props.lastName}
                  </Title>
                  <Caption style={styles.caption}>
                    Doctor Matricule:{props.matricule}
                  </Caption>
                  <Caption style={styles.caption}>Email:{props.email}</Caption>
                </View>
              </View>
              {/* /img ,name ,id  */}
              {/* information about the user */}
              <View style={styles.row}>
                <View style={styles.section}>
                  <Paragraph style={[styles.paragraph, styles.caption]}>
                    {props.patientList.length}
                  </Paragraph>
                  <Caption>Patient</Caption>
                </View>
                <View style={styles.section}>
                  <Paragraph style={[styles.paragraph, styles.caption]}>
                    {" "}
                    4.8
                  </Paragraph>
                  <Caption>Rating</Caption>
                </View>
              </View>
              {/*/ information about the user */}
            </View>

            <Drawer.Section>
              <DrawerItem
                icon={({ color, size }) => (
                  <Icon name="account-cog-outline" color={color} size={size} />
                )}
                label="Profile"
                /* to navgate we use the props that we pass into the DrawerContent  */
                onPress={() => props.navigation.navigate("Profile")}
              />
            </Drawer.Section>

            <Drawer.Section>
              <DrawerItem
                icon={({ color, size }) => (
                  <Icon name="bookmark-outline" color={color} size={size} />
                )}
                label="Bookmarks"
                onPress={() => {
                  props.navigation.navigate("Bookmarks");
                }}
              />
            </Drawer.Section>

            <Drawer.Section>
              <DrawerItem
                icon={({ color, size }) => (
                  <Icon name="account-group" color={color} size={size} />
                )}
                label="Patients"
                onPress={() => props.navigation.navigate("Patients")}
              />
            </Drawer.Section>
            {/* !!!!!!!!!!add support drawer section or other section */}

            {/* toggle theme Switch button */}
            {/* we use the state and we toggel the state every time we press on the touchable Ripple */}
            <Drawer.Section title="Preferences">
              <TouchableRipple
                onPress={() => {
                  toggelAppTheme();
                }}
              >
                <View style={styles.preference}>
                  <Text>Dark Theme</Text>
                  <View pointerEvents="none">
                    {/* using useTheme hook from the react native library  */}
                    <Switch value={paperTheme.dark} />
                  </View>
                </View>
              </TouchableRipple>
            </Drawer.Section>
          </View>
        ) : props.role === "patient" ? (
          <View
            style={styles.drawerContent /* , { backgroundColor: "#000" } */}
          >
            <View
              style={styles.userInfoSection /* , { backgroundColor: "red" } */}
            >
              {/* img, name , id */}
              <View style={{ flexDirection: "row", marginTop: 15 }}>
                <Avatar.Image
                  source={{
                    uri: "https://bootdey.com/img/Content/avatar/avatar6.png",
                  }}
                  size={50}
                />
                <View style={{ marginLeft: 15, flexDirection: "column" }}>
                  <Title style={styles.title}>
                    {" "}
                    {props.name} {props.lastName}{" "}
                  </Title>
                  <Caption style={styles.caption}>Email:{props.email}</Caption>
                </View>
              </View>
              {/* /img ,name ,id  */}
              {/* information about the user */}
              <View style={styles.row}>
                <View style={styles.section}>
                  <Paragraph style={[styles.paragraph, styles.caption]}>
                    UserDevice
                  </Paragraph>
                  <Caption>{props.device}</Caption>
                </View>
              </View>
              {/*/ information about the user */}
            </View>

            <Drawer.Section>
              <DrawerItem
                icon={({ color, size }) => (
                  <Icon name="account-cog-outline" color={color} size={size} />
                )}
                label="Profile"
                /* to navgate we use the props that we pass into the DrawerContent  */
                onPress={() => props.navigation.navigate("Profile")}
              />
            </Drawer.Section>

            <Drawer.Section>
              <DrawerItem
                icon={({ color, size }) => (
                  <Icon name="bookmark-outline" color={color} size={size} />
                )}
                label="Bookmarks"
                onPress={() => {
                  props.navigation.navigate("Bookmarks");
                }}
              />
            </Drawer.Section>

            <Drawer.Section>
              <DrawerItem
                icon={({ color, size }) => (
                  <Icon name="account-details" color={color} size={size} />
                )}
                label="Details"
                onPress={() => props.navigation.navigate("Details")}
              />
            </Drawer.Section>
            {/* !!!!!!!!!!add support drawer section or other section */}

            {/* toggle theme Switch button */}
            {/* we use the state and we toggel the state every time we press on the touchable Ripple */}
            <Drawer.Section title="Preferences">
              <TouchableRipple
                onPress={() => {
                  toggelAppTheme();
                }}
              >
                <View style={styles.preference}>
                  <Text>Dark Theme</Text>
                  <View pointerEvents="none">
                    {/* using useTheme hook from the react native library  */}
                    <Switch value={paperTheme.dark} />
                  </View>
                </View>
              </TouchableRipple>
            </Drawer.Section>
          </View>
        ) : null}
      </DrawerContentScrollView>

      {/* log out button */}
      <Drawer.Section style={styles.bottomDrawerSection}>
        <DrawerItem
          icon={({ color, size }) => (
            <Icon name="exit-to-app" color={color} size={size} />
          )}
          label="Sign Out"
          onPress={() => signOut()}
        />
      </Drawer.Section>
    </View>
  );
}

const styles = StyleSheet.create({
  drawerContent: {
    flex: 1,
  },
  userInfoSection: {
    paddingLeft: 20,
  },
  title: {
    fontSize: 16,
    marginTop: 3,
    fontWeight: "bold",
  },
  caption: {
    fontSize: 14,
    lineHeight: 14,
  },
  row: {
    marginTop: 20,
    flexDirection: "row",
    alignItems: "center",
  },
  section: {
    flexDirection: "row",
    alignItems: "center",
    marginRight: 15,
  },
  paragraph: {
    fontWeight: "bold",
    marginRight: 3,
  },
  drawerSection: {
    marginTop: 15,
  },
  bottomDrawerSection: {
    marginBottom: 15,
    borderTopColor: "#f4f4f4",
    borderTopWidth: 1,
  },
  preference: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 12,
    paddingHorizontal: 16,
  },
});
