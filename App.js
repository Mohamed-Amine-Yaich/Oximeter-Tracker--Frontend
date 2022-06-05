import React, { useEffect, useState } from "react";
import { Text, View, ActivityIndicator } from "react-native";
//import { createDrawerNavigator } from "@react-navigation/drawer";
import {
  NavigationContainer,
  DarkTheme as NavigationDarkTheme,
  DefaultTheme as NavigationDefaultTheme,
} from "@react-navigation/native";
import {
  Provider as PaperProvider,
  DarkTheme as PaperDarkTheme,
  DefaultTheme as PaperDefaultTheme,
} from "react-native-paper";

import RootStackScreen from "./screens/auth/RootStackScreen";

import bookmark from "./screens/drawerNavigationScreens/BookmarkScreen";
import PatientStackScreen from "./screens/doctorScreens/PatientsStack";

import AsyncStorage from "@react-native-async-storage/async-storage";

/* aad the user screen to the drawer navigation  for passing from patientsscreen to userscreen  */
//import User from "./screens/doctorScreens/User.js";

// import the authorization context from context
//use authContext provider and assign value prop
import { AuthContext } from "./components/context";
import { signUpService } from "./api/service";

//for the creaction of the drawer navigation we call the createDrawernavigtor function that re
//assign the function to the Drawer constant to get access to the (Navigator and Screen objects)
import { createDrawerNavigator } from "@react-navigation/drawer";
const Drawer = createDrawerNavigator();
//the DraweContent component or Screen that construct the Drawer(where we built the drawer)
import { DrawerContent } from "./screens/DrawerContent";
/* I use one Drawer content depend on the role of the user */
import { PatientDrawerContent } from "./screens/PatientDrawerContent";
import ProfileStackScreens from "./screens/profileStack/ProfileStack";
import PatientTabNav from "./screens/patientScreens/PatientTabNav";
import { set } from "react-native-reanimated";

export default function App() {
  const [isLoding, setIsLoading] = useState(true);
  const [userToken, setUserToken] = useState(null);
  const [status, setStatus] = useState("Failed");
  const [userData, setUserData] = useState(null);
  const [userRole, setUserRole] = useState(null);
  const [isDarkTheme, setIsDarkTheme] = useState(false);

  //spred throw the default theme of react-navigattion and the react-native-paper
  //the default colors will be the default color of the two library
  const CustumDefaultTheme = {
    ...NavigationDefaultTheme,
    ...PaperDefaultTheme,
    colors: {
      ...NavigationDefaultTheme.colors,
      ...PaperDefaultTheme.colors,
    },
  };

  const CustomDarkTheme = {
    ...NavigationDarkTheme,
    ...PaperDarkTheme,
    colors: {
      ...NavigationDarkTheme.colors,
      ...PaperDarkTheme.colors,
    },
  };

  //authContext setting function inside the use Memo and pass them
  //value that are wrapped in an AuthContext.provider and set a value of that AtuthContext provider

  const authContext = React.useMemo(
    () => ({
      /* the signIn function called in logIn take only (status,cookie)we can add the user data */
      signIn: async (status, cookieString, userData) => {
        /* const cookieToken = cookieString.split(";")[0].split("=")[1];
        const Bearertoken = `Bearer ${cookieToken}`; */

        setUserToken(cookieString);
        setIsLoading(false);
        setStatus(status);
        setUserData(userData);
        setUserRole(userData.role);

        console.log("user role from signin in use memo :" + userData.role);
        console.log("userData from signin func in use memo " + userData);

        console.log("data from signin func in use memo " + status);
        /*         console.log("bearer token from signin func in use memo " + Bearertoken);
         */ console.log("you are signed in");
      },
      signOut: async () => {
        setUserToken(null);
        setIsLoading(false);
      },

      signUp: async currentUserData => {
        //call the service
        //currnet User Date data from the sign up form send by
        //calling the sign up function from the sign up screen

        console.log(currentUserData.name);
        const res = await signUpService(currentUserData);
        //recieve response
        console.log("the response from sign up:");
        /*  console.log(res); */
        console.log(res.data.status);
        const status = res.data.status;
        console.log("current signed up user");

        console.log(res.data.data.user);
        const userData = res.data.data.user;
        console.log("cookie string");
        console.log(res.headers["set-cookie"][0]);
        const cookieToken = res.headers["set-cookie"][0]
          .split(";")[0]
          .split("=")[1];
        const Bearertoken = `Bearer ${cookieToken}`;

        setUserToken(Bearertoken);
        setIsLoading(false);
        setStatus(status);
        setUserData(userData);
        console.log("you are signed in");
      },
      /* */

      getUserData: () => {
        console.log("form get user data : " + userData.name);
        return userData;
      },

      /* get all patient or get all doctor
       */
      getAllUser: () => {
        console.log("form get All user" + userData);
        return userData.patientList;
      },
      updateUserData : (updatedData)=>{
        setUserData(updatedData)
      },
      getToken: async () => {
        console.log("form get Token usememo : " + asyncToken);
        /*    console.log(await userToken); */

        return asyncToken;
      },
      updateMeContext: data => {
        setUserData(data);
      },

      toggelAppTheme: () => {
        /* must pass the last value isDarktheme for reverse it  */
        setIsDarkTheme(isDarkTheme => !isDarkTheme);
      },
    }),
    []
  );




  /* delay before removing the render effect  */
  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  }, []);

  /* for the render effect when user submit  */
  if (isLoding) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" color="green" />
      </View>
    );
  }
  return (
    <PaperProvider theme={isDarkTheme ? CustomDarkTheme : CustumDefaultTheme}>
      <AuthContext.Provider value={authContext}>
        <NavigationContainer
          theme={isDarkTheme ? CustomDarkTheme : CustumDefaultTheme}
        >
          {userToken !== null && status === "success" ? (
            (() => {
              switch (userRole) {
                case "doctor":
                  return (
                    <Drawer.Navigator
                      //this is a propr in the drawer navigator to pass props the DrawerContent
                      //=>to pass data to the drawer use drawerContent and pass the props to a DrawerContent Component
                      drawerContent={props => (
                        <DrawerContent {...props} {...userData} />
                      )}
                    >
                      {/* passing props (token to the main tab screen and then to the home then use service to get user data  */}

                      <Drawer.Screen
                        name="Patients"
                        component={PatientStackScreen}
                        initialParams={{ token: userToken, currentUser :userData   }}
                      />

                      {/*   <Drawer.Screen
                      name="MainTabScreen"
                      component={MainTabScreen}
                      initialParams={{ token: userToken }}
                    /> */}
                      {/*  <Drawer.Screen name="Sort" component={SupportScreen} /> */}
                      {/* */}
                      <Drawer.Screen
                        name="Bookmarks"
                        component={bookmark}
                        initialParams={{ token: userToken }}
                      />

                      {/* this will be changed to profileStack  */}
                      <Drawer.Screen
                        name="Profile"
                        component={ProfileStackScreens}
                        initialParams={{ token: userToken }}
                      />
                    </Drawer.Navigator>
                  );

                case "patient":
                  return (
                    <Drawer.Navigator
                      drawerContent={props => (
                        <DrawerContent {...props} {...userData} />
                      )}
                    >
                      {/* user with patient role must have his own tabnav (the doctor tab nave depend of the list of patient for desplaying the selected patient) */}
                      <Drawer.Screen
                        name="Details"
                        component={PatientTabNav}
                        initialParams={{ token: userToken , currentUser :userData   }}
                      />

                      <Drawer.Screen
                        name="Bookmarks"
                        component={bookmark}
                        initialParams={{ token: userToken }}
                        options={{
                          headerStyle: {
                            backgroundColor: "#009387",
                          },
                          headerLeft: () => (
                            <Icon.Button
                              name="ios-menu"
                              size={25}
                              color="#111"
                              backgroundColor="#009387"
                              onPress={() => navigation.openDrawer()}
                            ></Icon.Button>
                          ),
                        }}
                      />

                      {/* this will be changed to profileStack  */}
                      <Drawer.Screen
                        name="Profile"
                        component={ProfileStackScreens}
                        initialParams={{ token: userToken }}
                      />
                    </Drawer.Navigator>
                  );
                case "admin":
                  return <Text>hello  admin</Text>;
                default:
                  return null;
              }
            })()
          ) : (
            <RootStackScreen />
          )}
        </NavigationContainer>
      </AuthContext.Provider>
    </PaperProvider>
  );
}
