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
  useColorMode,
  StatusBar,
} from "native-base";
import { NavigationContainer, useTheme } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";

import { useDispatch, useSelector } from "react-redux";

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
import { addCategory } from "../redux/actions";

import { lightTheme, darkTheme } from "../Theme";
import DisplaySettingScreen from "../screens/DisplaySettingScreen";

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
  const { colorMode } = useColorMode();
  const MyTheme = colorMode == "light" ? lightTheme : darkTheme;
  const colors = MyTheme.colors;

  return (
    <NavigationContainer theme={MyTheme}>
      <StatusBar
        barStyle={colorMode == "light" ? "dark-content" : "light-content"}
        backgroundColor={colorMode == "light" ? colors.secondary700 : "black"}
      />
      <MyTab />
    </NavigationContainer>
  );
};

// Tab - MyTab (HomeTabs + CalendarStack + SettingsStack)
const MyTab = () => {
  const { colors } = useTheme();
  return (
    <Tab.Navigator
      initialRouteName="HomeTabs"
      screenOptions={{
        // safeAreaInsets: {
        //   top: 0,
        //   bottom: 0,
        //   left: 0,
        //   right: 0,
        // },
        headerShown: false,
        tabBarStyle: {
          height: 56,
          backgroundColor: colors.secondary700,
        },
        tabBarItemStyle: {
          paddingTop: 8,
        },
        tabBarIconStyle: {
          width: 24,
          height: 24,
        },
        tabBarInactiveTintColor: colors.light700,
        tabBarActiveTintColor: colors.primary700,
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
        }}
      />
    </Tab.Navigator>
  );
};

// Top Tab - HomeTabs (Many Stacks)
const HomeTabs = ({ navigation }) => {
  const { itemList, categoryList } = useSelector((state) => state.item);
  const dispatch = useDispatch();

  const { colors } = useTheme();
  return (
    <>
      {/* <Animated.View style={{ height: ainmateHeaderHeight }}> */}
      <Pressable
        onPress={() => {
          // createNewTab();
          // dispatch(addCategory());
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
            backgroundColor: colors.secondary700,
          },
          tabBarScrollEnabled: true,
          tabBarActiveTintColor: colors.primary700,
          tabBarInactiveTintColor: colors.light700,
          tabBarContentContainerStyle: {
            height: 56,
          },
          tabBarItemStyle: {
            width: "auto",
            paddingHorizontal: 12,
          },
          tabBarPressColor: colors.secondary700,
          tabBarIndicatorStyle: {
            backgroundColor: colors.primary700,
          },
          tabBarLabelStyle: {
            fontSize: 16,
          },
        }}
      >
        <TopTab.Screen
          name="所有"
          children={(props) => <HomeStack currentList={itemList.items} />}
        />
        {categoryList.categorys.map((category, index) => {
          let currentCategoryItemList = [
            ...itemList.items.filter((item) => item.category == category),
          ];
          return (
            <TopTab.Screen
              key={category + index}
              name={category}
              children={(props) => (
                <HomeStack currentList={currentCategoryItemList} />
              )}
            />
          );
        })}
      </TopTab.Navigator>
      <Pressable
        position={"absolute"}
        w={58}
        h={58}
        p={4}
        bgColor={colors.green700}
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

// Stack - Settings (SettingsScreen + DisplaySettingScreem)
const SettingsStack = ({ navigation }) => {
  const { colors } = useTheme();
  return (
    <Stack.Navigator
      screenOptions={{
        safeAreaInsets: {
          top: 0,
          bottom: 0,
          left: 0,
          right: 0,
        },
        // headerShown: false,
        headerShadowVisible: false,
        headerTintColor: colors.primary700,
        headerStyle: {
          backgroundColor: colors.secondary700,
        },
        headerTitleStyle: {
          color: colors.primary700,
        },
        headerTitleAlign: "center",
        title: null,
      }}
    >
      <Stack.Screen
        options={{ title: "設定" }}
        name="Settings"
        component={SettingsScreen}
      />
      <Stack.Screen
        options={{ title: "主題設定" }}
        name="DisplaySetting"
        component={DisplaySettingScreen}
      />
    </Stack.Navigator>
  );
};

// Stack - NoteAdd (NoteAddScreen)
const NoteAddStack = ({ navigation }) => {
  const { colors } = useTheme();

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
            backgroundColor: colors.secondary700,
          },
          headerTitleStyle: {
            color: colors.primary700,
            fontSize: 18,
          },
          headerTitleAlign: "center",
        }}
      />
    </Stack.Navigator>
  );
};

export default Navigation;
