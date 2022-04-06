import React from "react";
import {
  Box,
  Center,
  Input,
  Image,
  HStack,
  VStack,
  Text,
  CircleIcon,
} from "native-base";
import { LogBox } from "react-native";

LogBox.ignoreLogs(["NativeBase:"]);

const Item = (props) => {
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
                時間
              </Text>
            </VStack>
          </HStack>

          <Image
            source={require("../icon/icon_checkbox_blank.png")}
            alt={"blank_checkbox"}
          />
        </HStack>
      </Center>
    </Box>
  );
};

export default Item;
