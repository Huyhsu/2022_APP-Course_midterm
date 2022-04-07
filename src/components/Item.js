import React, { useState, useEffect } from "react";
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

import { LogBox } from "react-native";

LogBox.ignoreLogs(["NativeBase:"]);

const Item = (props) => {
  const [clicked, setClick] = useState(false);
  const handleClick = () => {
    setClick(!clicked);
  };

  return (
    <Box
      bgColor={"#F8FEFF"}
      h={88}
      w={328}
      py={6}
      pl={6}
      pr={4}
      mt={3}
      borderRadius={5}
      // borderWidth={1}
      // borderColor={"#888888"}
    >
      <Center>
        <HStack
          w={"100%"}
          alignItems={"center"}
          justifyContent={"space-between"}
        >
          <HStack alignItems={"center"}>
            <CircleIcon w={12} h={12} color={"#D27373"}></CircleIcon>
            <VStack ml={6}>
              <Text fontSize={"lg"} color={"#024D61"}>
                行動程式期中作業
              </Text>
              <Text fontSize={"sm"} color={"#888888"}>
                04/14 (四) 12:30
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
