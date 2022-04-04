import React from "react";
import { Box, HStack, VStack, Text, Image } from "native-base";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { SafeAreaProvider } from "react-native-safe-area-context";

import HomeScreen from "../screens/HomeScreen";
import CalendarScreen from "../screens/CalendarScreen";
import SettingsScreen from "../screens/SettingsScreen";

import MyHeader from "../components/Header";

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const Navigation = () => {
  return (
    <NavigationContainer>
      <HomeTab />
    </NavigationContainer>
  );
};

// Tab - Home (HomeStack + CalendarStack + SettingsStack)
const HomeTab = () => {
  return (
    <Tab.Navigator
      initialRouteName="HomeStack"
      screenOptions={{
        headerShown: false,
        tabBarInactiveTintColor: "#888",
        tabBarActiveTintColor: "#024D61",
        tabBarStyle: {
          height: 56,
        },
        tabBarIconStyle: {
          width: 24,
          height: 24,
        },
        tabBarLabelStyle: {
          fontSize: 12,
        },
      }}
    >
      <Tab.Screen
        name="HomeStack"
        component={HomeStack}
        options={{
          title: "清單",
          tabBarIcon: ({ focused }) => (
            <>
              {focused ? (
                <Image
                  source={require("../icon/icon_noteadd_actived.png")}
                  alt={"HomeIcon_actived"}
                />
              ) : (
                <Image
                  source={require("../icon/icon_noteadd.png")}
                  alt={"HomeIcon_default"}
                />
              )}
            </>
          ),
        }}
      />
      <Tab.Screen
        name="CalendarStack"
        component={CalendarStack}
        options={{
          title: "日曆",
          tabBarIcon: ({ focused }) => (
            <>
              {focused ? (
                <Image
                  source={require("../icon/icon_calendar_actived.png")}
                  alt={"CalendarIcon_actived"}
                />
              ) : (
                <Image
                  source={require("../icon/icon_calendar.png")}
                  alt={"CalendarIcon_default"}
                />
              )}
            </>
          ),
        }}
      />
      <Tab.Screen
        name="SettingsStack"
        component={SettingsStack}
        options={{
          title: "設定",
          tabBarIcon: ({ focused }) => (
            <>
              {focused ? (
                <Image
                  source={require("../icon/icon_settings_actived.png")}
                  alt={"SettingsIcon_actived"}
                />
              ) : (
                <Image
                  source={require("../icon/icon_settings.png")}
                  alt={"SettingsIcon_default"}
                />
              )}
            </>
          ),
        }}
      />
    </Tab.Navigator>
  );
};

// Stack - Home (HomeScreen)
const HomeStack = ({ navigation }) => {
  return (
    <Stack.Navigator
      screenOptions={{
        // headerShown: false,
        headerShadowVisible: false,
        header: (props) => <MyHeader />,
        // headerStyle: {
        //   height: 24,
        //   backgroundColor: "#E8F3FF",
        // },
        title: null,
      }}
    >
      <Stack.Screen name="Home" component={HomeScreen} />
    </Stack.Navigator>
  );
};

// Stack - Calendar (CalendarScreen)
const CalendarStack = ({ navigation }) => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        title: null,
      }}
    >
      <Stack.Screen name="Calendar" component={CalendarScreen} />
    </Stack.Navigator>
  );
};

// Stack - Settings (SettingsScreen)
const SettingsStack = ({ navigation }) => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        title: null,
      }}
    >
      <Stack.Screen name="Settings" component={SettingsScreen} />
    </Stack.Navigator>
  );
};

export default Navigation;
