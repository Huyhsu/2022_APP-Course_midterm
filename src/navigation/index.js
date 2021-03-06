import React from "react";
import { NavigationContainer, useTheme } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import {
  Box,
  Image,
  Pressable,
  Center,
  useColorMode,
  StatusBar,
} from "native-base";
import { useDispatch, useSelector } from "react-redux";
import Animated from "react-native-reanimated";
// Screens
import HomeScreen from "../screens/HomeScreen";
import CalendarScreen from "../screens/CalendarScreen";
import SettingsScreen from "../screens/SettingsScreen";
import DisplaySettingScreen from "../screens/DisplaySettingScreen";
import NoteScreen from "../screens/NoteScreen";
import EditScreen from "../screens/EditScreen";
// Components
import TodayInfoCard from "../components/TodayInfoCard";
import MyHeader from "../components/Header";
// Theme
import { lightTheme, darkTheme } from "../Theme";

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();
const TopTab = createMaterialTopTabNavigator();

// const INFO_HEADER_HEIGHT = 128;
// const MIN_HEIGHT = 0;
// let AnimatedHeaderValue = new Animated.Value(0);
// const ainmateHeaderHeight = AnimatedHeaderValue.interpolate({
//   inputRange: [0, INFO_HEADER_HEIGHT - MIN_HEIGHT],
//   outputRange: [INFO_HEADER_HEIGHT, MIN_HEIGHT],
//   extrapolate: "clamp",
// });

const Navigation = () => {
  const { colorMode } = useColorMode();
  const MyTheme = colorMode == "light" ? lightTheme : darkTheme;
  const colors = MyTheme.colors;
  return (
    <NavigationContainer theme={MyTheme}>
      <StatusBar
        barStyle={colorMode == "light" ? "dark-content" : "light-content"}
        backgroundColor={
          colorMode == "light" ? colors.secondary700 : colors.secondary700
        }
      />
      <MyTab />
    </NavigationContainer>
  );
};

// Tab - MyTab (HomeTabs + CalendarStack + SettingsStack)
const MyTab = () => {
  const { colors } = useTheme();
  const { colorMode } = useColorMode();
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
          title: "??????",
          headerShown: true,
          header: (props) => <MyHeader />,
          tabBarIcon: ({ focused }) => (
            <Box>
              {focused ? (
                colorMode == "light" ? (
                  <Image
                    source={require("../icon/icon_noteadd_actived.png")}
                    alt={"HomeIcon_actived"}
                  />
                ) : (
                  <>
                    <Image
                      source={require("../icon/icon_dark_noteadd_actived.png")}
                      alt={"HomeIcon_actived"}
                    />
                  </>
                )
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
          title: "??????",
          headerShown: true,
          header: (props) => <MyHeader />,
          tabBarIcon: ({ focused }) => (
            <Box>
              {focused ? (
                colorMode == "light" ? (
                  <Image
                    source={require("../icon/icon_calendar_actived.png")}
                    alt={"CalendarIcon_actived"}
                  />
                ) : (
                  <>
                    <Image
                      source={require("../icon/icon_dark_calendar_actived.png")}
                      alt={"CalendarIcon_actived"}
                    />
                  </>
                )
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
          title: "??????",
          tabBarIcon: ({ focused }) => (
            <Box>
              {focused ? (
                colorMode == "light" ? (
                  <Image
                    source={require("../icon/icon_settings_actived.png")}
                    alt={"SettingsIcon_actived"}
                  />
                ) : (
                  <>
                    <Image
                      source={require("../icon/icon_dark_settings_actived.png")}
                      alt={"SettingsIcon_actived"}
                    />
                  </>
                )
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
      <Tab.Screen
        name="EditStack"
        component={EditStack}
        options={({ route }) => ({
          tabBarButton: () => null,
          tabBarIcon: () => null,
          title: "",
          tabBarStyle: {
            display: "none",
          },
        })}
      />
    </Tab.Navigator>
  );
};

// Top Tab - HomeTabs (Many Stacks) with FAB
const HomeTabs = ({ navigation }) => {
  const { itemList, categoryList } = useSelector((state) => state.item);
  const dispatch = useDispatch();

  const { colors } = useTheme();
  const { colorMode } = useColorMode();
  return (
    <>
      {/* <Animated.View style={{ height: ainmateHeaderHeight }}> */}

      <TodayInfoCard />

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
            paddingHorizontal: 16,
          },
          tabBarPressColor: colors.secondary700,
          tabBarIndicatorStyle: {
            backgroundColor: colors.primary700,
          },
          tabBarLabelStyle: {
            textTransform: "none",
            fontSize: 16,
          },
        }}
      >
        <TopTab.Screen
          name="??????"
          children={(props) => (
            <HomeStack currentList={itemList.items} {...props} />
          )}
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
                <HomeStack currentList={currentCategoryItemList} {...props} />
              )}
            />
          );
        })}
      </TopTab.Navigator>
      <Pressable
        position={"absolute"}
        rounded={16}
        bottom={4}
        right={4}
        shadow={3}
        w={58}
        h={58}
        justifyContent={"center"}
        bgColor={colors.green700}
        onPress={() => {
          navigation.navigate("NoteAddStack");
        }}
      >
        {({ isHovered, isFocused, isPressed }) => (
          <Center
            bgColor={
              isPressed
                ? colors.light700
                : isHovered
                ? colors.light700
                : colors.green700
            }
            w={"100%"}
            h={"100%"}
            rounded={16}
          >
            {colorMode == "light" ? (
              <Image
                source={require("../icon/icon_add.png")}
                alt={"add_icon"}
              />
            ) : (
              <>
                <Image
                  source={require("../icon/icon_dark_add.png")}
                  alt={"add_icon"}
                />
              </>
            )}
          </Center>
        )}
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
        title: null,
      }}
    >
      <Stack.Screen
        name="Home"
        children={() => <HomeScreen {...parentProps} />}
      />
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
        options={{ title: "??????" }}
        name="Settings"
        component={SettingsScreen}
      />
      <Stack.Screen
        options={{ title: "????????????" }}
        name="DisplaySetting"
        component={DisplaySettingScreen}
      />
    </Stack.Navigator>
  );
};

// Stack - NoteAdd (NoteAddScreen)
const NoteAddStack = ({ navigation }) => {
  const { colors } = useTheme();
  const { colorMode } = useColorMode();
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
          title: "??????",
          headerLeft: () => (
            <Pressable onPress={() => navigation.navigate("HomeTabs")}>
              <Center h={16}>
                {colorMode == "light" ? (
                  <Image
                    source={require("../icon/icon_back.png")}
                    alt={"add_icon"}
                  />
                ) : (
                  <>
                    <Image
                      source={require("../icon/icon_dark_back.png")}
                      alt={"add_icon"}
                    />
                  </>
                )}
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
// Stack - Edit (EditScreen)
const EditStack = ({ navigation }) => {
  const { colors } = useTheme();
  const { colorMode } = useColorMode();
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
        name="Edit"
        component={EditScreen}
        options={{
          headerShown: true,
          title: "??????",
          headerLeft: () => (
            <Pressable onPress={() => navigation.navigate("HomeTabs")}>
              <Center h={16}>
                {colorMode == "light" ? (
                  <Image
                    source={require("../icon/icon_back.png")}
                    alt={"add_icon"}
                  />
                ) : (
                  <>
                    <Image
                      source={require("../icon/icon_dark_back.png")}
                      alt={"add_icon"}
                    />
                  </>
                )}
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
