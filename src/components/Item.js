import React, { useState } from "react";
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
import { useTheme } from "@react-navigation/native";

import { LogBox } from "react-native";
LogBox.ignoreLogs(["NativeBase:"]);

const Item = (props) => {
  // Check
  const [clicked, setClick] = useState(false);
  const handleClick = () => {
    setClick(!clicked);
  };
  const { title, time, divide } = props.item;
  const { colors } = useTheme();
  const { colorMode } = useColorMode();
  let tempTitle = title;
  return (
    <Box
      _light={{ bgColor: colors.light100 }}
      _dark={{ bgColor: colors.light100 }}
      h={88}
      w={328}
      py={6}
      pl={6}
      pr={4}
      mt={3}
      borderRadius={5}
    >
      <Center>
        <HStack
          w={"100%"}
          alignItems={"center"}
          justifyContent={"space-between"}
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
                {tempTitle.length >= 10
                  ? tempTitle.substring(0, 9) + "..."
                  : tempTitle}
              </Text>
              <Text color={colors.light700} fontSize={"sm"}>
                {time}
              </Text>
            </VStack>
          </HStack>
          <Pressable
            onPress={() => {
              handleClick();
            }}
          >
            {clicked ? (
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
