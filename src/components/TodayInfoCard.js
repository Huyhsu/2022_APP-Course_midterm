import React, { useState, useEffect } from "react";
import { Box, Text, HStack, VStack } from "native-base";
import { useTheme } from "@react-navigation/native";

import { getCurrentTime } from "../utils";

const TodayInfoCard = () => {
  // Time
  const [time, setTime] = useState({});
  let updateTime = {};
  // 更新時間
  useEffect(() => {
    updateTime = getCurrentTime();
    setTime((time) => ({
      ...time,
      ...updateTime,
    }));
  }, []);
  const { colors } = useTheme();
  return (
    <Box
      _light={{ bgColor: colors.light100 }}
      _dark={{ bgColor: colors.light100 }}
      h={32}
      px={"10%"}
      py={2}
    >
      <HStack alignItems={"flex-end"} pt={2} w={"80%"}>
        <VStack alignItems={"center"}>
          <Text _light={{ color: colors.primary700 }} fontSize={"md"}>
            {time.year} {time.month}
          </Text>
          <Text _light={{ color: colors.primary700 }} fontSize={"5xl"}>
            {time.date}
          </Text>
        </VStack>
        <HStack justifyContent={"space-between"} w={"80%"} pl={4} pb={2}>
          <Text _light={{ color: colors.primary700 }} fontSize={"md"}>
            {time.day}
          </Text>
          <Text _light={{ color: colors.primary700 }} fontSize={"md"}>
            今日待辦: {"無"}
          </Text>
        </HStack>
      </HStack>
    </Box>
  );
};

export default TodayInfoCard;
