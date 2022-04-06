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
      bgColor={"darkBlue.100"}
      h={88}
      w={328}
      borderColor={"black"}
      borderWidth={1}
      py={6}
    >
      <Center>
        <HStack w={80} bgColor={"red.400"}>
          <CircleIcon w={12} h={12} color={"blue.100"}></CircleIcon>
          <VStack>
            <Text fontSize={"lg"}>標題</Text>
            <Text fontSize={"sm"}>時間</Text>
          </VStack>
        </HStack>
      </Center>
    </Box>
  );
};

export default Item;
