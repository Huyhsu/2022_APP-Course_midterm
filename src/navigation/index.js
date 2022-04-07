import React, { useState, useCallback, useMemo } from "react";
import { useWindowDimensions } from "react-native";
import {
  HStack,
  VStack,
  Text,
  Box,
  Image,
  LayoutProps,
  Pressable,
  Button,
  Center,
} from "native-base";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";

import HomeScreen from "../screens/HomeScreen";
import CalendarScreen from "../screens/CalendarScreen";
import SettingsScreen from "../screens/SettingsScreen";
import NoteScreen from "../screens/NoteScreen";

import TodayInfoCard from "../components/TodayInfoCard";
import MyHeader from "../components/Header";
import {
  SafeAreaProvider,
  SafeAreaView,
  useSafeAreaInsets,
} from "react-native-safe-area-context";
import Animated, { set } from "react-native-reanimated";

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();
const TopTab = createMaterialTopTabNavigator();

const INFO_HEADER_HEIGHT = 128;
const MIN_HEIGHT = 0;
let AnimatedHeaderValue = new Animated.Value(0);
const ainmateHeaderHeight = AnimatedHeaderValue.interpolate({
  inputRange: [0, INFO_HEADER_HEIGHT - MIN_HEIGHT],
  outputRange: [INFO_HEADER_HEIGHT, MIN_HEIGHT],
  extrapolate: "clamp",
});

const Navigation = () => {
  return (
    <NavigationContainer>
      <MyTab />
    </NavigationContainer>
  );
};

// Tab - MyTab (HomeTabs + CalendarStack + SettingsStack)
const MyTab = ({ navigation }) => {
  return (
    <Tab.Navigator
      initialRouteName="HomeTabs"
      screenOptions={{
        safeAreaInsets: {
          top: 0,
          bottom: 0,
          left: 0,
          right: 0,
        },
        headerShown: false,
        tabBarStyle: {
          height: 56,
          backgroundColor: "#E8F3FF",
        },
        tabBarItemStyle: {
          paddingTop: 8,
        },
        // tabBarIconStyle: {
        //   width: 24,
        //   height: 24,
        // },
        tabBarInactiveTintColor: "#888888",
        tabBarActiveTintColor: "#024D61",
        tabBarLabelStyle: {
          fontSize: 12,
          marginBottom: 4,
        },
      }}
    >
      <Tab.Screen
        name="HomeTabs"
        component={HomeTabs}
        options={{
          title: "清單",
          headerShown: true,
          header: (props) => <MyHeader />,
          tabBarIcon: ({ focused }) => (
            <Box>
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
            </Box>
          ),
        }}
      />
      <Tab.Screen
        name="CalendarStack"
        component={CalendarStack}
        options={{
          title: "日曆",
          tabBarIcon: ({ focused }) => (
            <Box>
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
            </Box>
          ),
        }}
      />
      <Tab.Screen
        name="SettingsStack"
        component={SettingsStack}
        options={{
          title: "設定",
          tabBarIcon: ({ focused }) => (
            <Box>
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
            </Box>
          ),
        }}
      />
      <Tab.Screen
        name="NoteAddStack"
        component={NoteAddStack}
        options={{
          tabBarButton: () => null,
          tabBarIcon: () => null,
          title: "",
          tabBarStyle: {
            display: "none",
          },
          // headerShown: true,
          // title: "新增",
          // headerLeft: () => (
          //   <Pressable onPress={() => navigation.navigate("HomeTabs")}>
          //     <Image
          //       source={require("../icon/icon_add.png")}
          //       alt={"add_icon"}
          //     />
          //   </Pressable>
          // ),
        }}
      />
    </Tab.Navigator>
  );
};

// Top Tab - HomeTabs (Many Stacks)
const HomeTabs = ({ navigation }) => {
  const [tabs, setTabs] = useState([]);
  const [tabIndex, setTabIndex] = useState(1);
  const createNewTab = () => {
    const newTab = {
      name: `${tabIndex}`,
    };
    setTabs([...tabs, newTab]);
    setTabIndex(tabIndex + 1);
  };
  return (
    <>
      {/* <Animated.View style={{ height: ainmateHeaderHeight }}> */}
      <Pressable
        onPress={() => {
          createNewTab();
        }}
      >
        <TodayInfoCard />
      </Pressable>

      {/* </Animated.View> */}
      <TopTab.Navigator
        screenOptions={{
          safeAreaInsets: {
            top: 0,
            bottom: 0,
            left: 0,
            right: 0,
          },
          tabBarStyle: {
            elevation: 0,
            backgroundColor: "#E8F3FF",
          },
          tabBarScrollEnabled: true,
          tabBarActiveTintColor: "#024D61",
          tabBarInactiveTintColor: "#888888",
          tabBarContentContainerStyle: {
            height: 56,
          },
          tabBarItemStyle: {
            width: "auto",
            paddingHorizontal: 12,
          },
          tabBarPressColor: "#E8F3FF",
          tabBarIndicatorStyle: {
            backgroundColor: "#024D61",
          },
          tabBarLabelStyle: {
            fontSize: 16,
          },
        }}
      >
        <TopTab.Screen
          name="每日"
          children={(props) => <HomeStack number={"000"} {...props} />}
        />
        <TopTab.Screen
          name="所有"
          children={(props) => <HomeStack number={"0012"} {...props} />}
        />

        {tabs.map((tab, index) => {
          return (
            <TopTab.Screen
              key={index.toString()}
              name={tab.name}
              children={(props) => <HomeStack number={tab.name} {...props} />}
            />
          );
        })}

        {/* <TopTab.Screen name="測試1" component={HomeStack} />
        <TopTab.Screen name="測試2" component={HomeStack} />
        <TopTab.Screen name="測試3" component={HomeStack} />
        <TopTab.Screen name="測試4" component={HomeStack} />
        <TopTab.Screen name="測試5" component={HomeStack} />
        <TopTab.Screen name="測試6" component={HomeStack} />
        <TopTab.Screen name="12345679abcdefghijk" component={HomeStack} /> */}
      </TopTab.Navigator>
      <Pressable
        position={"absolute"}
        w={58}
        h={58}
        p={4}
        bgColor={"#D3F9E7"}
        rounded={16}
        bottom={4}
        right={4}
        shadow={3}
        onPress={() => {
          navigation.navigate("NoteAddStack");
        }}
      >
        <Image source={require("../icon/icon_add.png")} alt={"add_icon"} />
      </Pressable>
    </>
  );
};

// Stack - Home (HomeScreen)
const HomeStack = (parentProps, { navigation }) => {
  return (
    <Stack.Navigator
      screenOptions={{
        safeAreaInsets: {
          top: 0,
          bottom: 0,
          left: 0,
          right: 0,
        },
        initialRouteName: "Home",
        headerShown: false,
        headerShadowVisible: false,
        // header: (props) => <MyHeader />,
        // headerStyle: {
        //   height: 24,
        //   backgroundColor: "#E8F3FF",
        // },
        title: null,
      }}
    >
      {/* <Stack.Screen name="Home" component={HomeScreen} /> */}
      <Stack.Screen
        name="Home"
        children={(props) => <HomeScreen {...parentProps} />}
      />
      {/* <Stack.Screen
        name="Note"
        children={(props) => <NoteScreen {...parentProps} />}
      /> */}
    </Stack.Navigator>
  );
};

// Stack - Calendar (CalendarScreen)
const CalendarStack = ({ navigation }) => {
  return (
    <Stack.Navigator
      screenOptions={{
        safeAreaInsets: {
          top: 0,
          bottom: 0,
          left: 0,
          right: 0,
        },
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
        safeAreaInsets: {
          top: 0,
          bottom: 0,
          left: 0,
          right: 0,
        },
        headerShown: false,
        title: null,
      }}
    >
      <Stack.Screen name="Settings" component={SettingsScreen} />
    </Stack.Navigator>
  );
};

// Stack - NoteAdd (NoteAddScreen)
const NoteAddStack = ({ navigation }) => {
  return (
    <Stack.Navigator
      screenOptions={{
        safeAreaInsets: {
          top: 0,
          bottom: 0,
          left: 0,
          right: 0,
        },
        headerShown: false,
        title: null,
      }}
    >
      <Stack.Screen
        name="NoteAdd"
        component={NoteScreen}
        options={{
          headerShown: true,
          title: "新增",
          headerLeft: () => (
            <Pressable onPress={() => navigation.navigate("HomeTabs")}>
              <Center h={16}>
                <Image
                  source={require("../icon/icon_back.png")}
                  alt={"add_icon"}
                />
              </Center>
            </Pressable>
          ),
          headerShadowVisible: false,
          headerStyle: {
            backgroundColor: "#E8F3FF",
          },
          headerTitleStyle: {
            color: "#024D61",
            fontSize: 18,
          },
          headerTitleAlign: "center",
        }}
      />
    </Stack.Navigator>
  );
};

export default Navigation;
