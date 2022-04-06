import React, { useState, useEffect } from "react";
import {
  Box,
  Center,
  Text,
  View,
  HStack,
  Pressable,
  VStack,
} from "native-base";
import { SafeAreaView } from "react-native-safe-area-context";

import { getCurrentTime } from "../utils";

const TodayInfoCard = () => {
  const [time, setTime] = useState({});
  let updateTime = {};

  useEffect(() => {
    updateTime = getCurrentTime();
    setTime((time) => ({
      ...time,
      ...updateTime,
    }));
  }, []);

  return (
    <Box h={32} bgColor={"#F8FEFF"} px={"10%"} py={2}>
      <HStack alignItems={"flex-end"} pt={2} w={"80%"}>
        <VStack alignItems={"center"}>
          <Text fontSize={"md"} color={"#024D61"}>
            {time.year} {time.month}
          </Text>
          <Text fontSize={"5xl"} color={"#024D61"}>
            {time.date}
          </Text>
        </VStack>
        <HStack justifyContent={"space-between"} w={"80%"} pl={4} pb={2}>
          <Text fontSize={"md"} color={"#024D61"}>
            {time.day}
          </Text>
          <Text fontSize={"md"} color={"#024D61"}>
            今日待辦: {"無"}
          </Text>
        </HStack>
      </HStack>
      {/* <Text>Hello </Text> */}
    </Box>
  );
};

export default TodayInfoCard;
