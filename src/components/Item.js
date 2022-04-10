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
  const { title, time } = props.item;
  const { colors } = useTheme();
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
            <CircleIcon w={12} h={12} color={colors.medium700} />
            <VStack ml={6}>
              <Text _light={{ color: colors.primary700 }} fontSize={"lg"}>
                {title}
              </Text>
              <Text _light={{ color: colors.light700 }} fontSize={"sm"}>
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
              <Box>
                <Image
                  source={require("../icon/icon_checkbox.png")}
                  alt={"checked_checkbox"}
                />
              </Box>
            ) : (
              <>
                <Image
                  source={require("../icon/icon_checkbox_blank.png")}
                  alt={"blank_checkbox"}
                />
              </>
            )}
          </Pressable>
        </HStack>
      </Center>
    </Box>
  );
};

export default Item;
