import React, { useState } from "react";
import { useTheme } from "@react-navigation/native";
import {
  Box,
  Center,
  Image,
  HStack,
  VStack,
  Text,
  CircleIcon,
  Pressable,
  useColorMode,
} from "native-base";
import { useDispatch, useSelector } from "react-redux";

import { LogBox } from "react-native";
import { setEditItem, updateItem } from "../redux/actions";
// import {  } from "react-native-gesture-handler";
LogBox.ignoreLogs(["NativeBase:"]);

const Item = ({ item, item: { title, time, divide, done }, navigation }) => {
  // State
  const { itemList } = useSelector((state) => state.item);
  const dispatch = useDispatch();
  // 處理點擊
  const handleClick = () => {
    checkItemValue();
  };
  // 暴力找出相同物件之 index, 並呼叫 updateItem
  const checkItemValue = () => {
    const itemIndex = itemList.items.findIndex(
      (value) =>
        value.title == item.title &&
        value.time == item.time &&
        value.category == item.category &&
        value.divide == item.divide &&
        value.note == item.note
    );
    if (itemIndex == -1) {
      console.log("Error!! Can't find the item to update!!");
    }
    const updatedItem = { ...item, done: !item.done };
    dispatch(updateItem(updatedItem, itemIndex));
  };
  const { colors } = useTheme();
  const { colorMode } = useColorMode();
  // 處理過長標題
  let tempTitle = title;
  let tempTime = time.slice(5);
  return (
    <Box
      flex={1}
      _light={{ bgColor: colors.light100 }}
      _dark={{ bgColor: colors.light100 }}
      h={88}
      py={6}
      pl={6}
      pr={4}
      mt={3}
      borderRadius={5}
      bgColor={"amber.100"}
    >
      <Center w={"100%"}>
        <HStack
          w={"100%"}
          alignItems={"center"}
          justifyContent={"space-between"}
        >
          <Pressable
            onPress={() => {
              dispatch(setEditItem(item));
              navigation.navigate("EditStack", {
                screen: "Edit",
                params: item,
              });
            }}
            onLongPress={() => console.log("TAKOLONGGGGGGG")}
          >
            <HStack alignItems={"center"}>
              <CircleIcon
                w={12}
                h={12}
                color={
                  divide == "high"
                    ? colors.high700
                    : divide == "medium"
                    ? colors.medium700
                    : colors.low700
                }
              />
              <VStack ml={6}>
                <Text _light={{ color: colors.primary700 }} fontSize={"lg"}>
                  {tempTitle.length > 10
                    ? tempTitle.substring(0, 10) + "..."
                    : tempTitle}
                </Text>
                <Text color={colors.light700} fontSize={"sm"}>
                  {tempTime}
                </Text>
              </VStack>
            </HStack>
          </Pressable>

          <Pressable
            onPress={() => {
              handleClick();
            }}
          >
            {done ? (
              colorMode == "light" ? (
                <Box>
                  <Image
                    source={require("../icon/icon_checkbox.png")}
                    alt={"checked_checkbox"}
                  />
                </Box>
              ) : (
                <>
                  <Image
                    source={require("../icon/icon_dark_checkbox.png")}
                    alt={"checked_checkbox"}
                  />
                </>
              )
            ) : colorMode == "light" ? (
              <>
                <Image
                  source={require("../icon/icon_checkbox_blank.png")}
                  alt={"blank_checkbox"}
                />
              </>
            ) : (
              <Box>
                <Image
                  source={require("../icon/icon_dark_checkbox_blank.png")}
                  alt={"blank_checkbox"}
                />
              </Box>
            )}
          </Pressable>
        </HStack>
      </Center>
    </Box>
  );
};

export default Item;
