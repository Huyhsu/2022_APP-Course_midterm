import React, { useState, useEffect } from "react";
import { useTheme } from "@react-navigation/native";
import { Box, Text, HStack, VStack } from "native-base";
import { useSelector } from "react-redux";

import { getCurrentTime } from "../utils";

const TodayInfoCard = () => {
  // State
  const { itemList } = useSelector((state) => state.item);

  // Time
  const [time, setTime] = useState({});
  let updateTime = {};
  // Check Today Todo
  const [todayTodo, setTodayTodo] = useState(0);
  // 時間跟今天一樣 且 尚未完成
  const checkTodayTodo = () => {
    let todayItems = itemList.items.filter(
      (value) =>
        value.compareTime == time.year + time.month + time.date && !value.done
    );
    setTodayTodo(todayItems.length);
  };
  // 更新時間
  useEffect(() => {
    updateTime = getCurrentTime();
    setTime((time) => ({
      ...time,
      ...updateTime,
    }));
  }, []);
  useEffect(() => {
    checkTodayTodo();
  }, [itemList]);
  const { colors } = useTheme();
  return (
    <Box bgColor={colors.light100} h={32} px={"10%"} py={2}>
      <HStack alignItems={"flex-end"} pt={2} w={"80%"}>
        <VStack alignItems={"center"}>
          <Text _light={{ color: colors.primary700 }} fontSize={"md"}>
            {time.year} {time.month}
          </Text>
          <Text _light={{ color: colors.primary700 }} fontSize={"5xl"}>
            {time.date}
          </Text>
        </VStack>
        <HStack justifyContent={"space-between"} w={"85%"} pl={4} pb={2}>
          <Text _light={{ color: colors.primary700 }} fontSize={"md"}>
            {time.day}
          </Text>
          {todayTodo == 0 ? (
            <Text _light={{ color: colors.primary700 }} fontSize={"md"}>
              今日待辦: 無
            </Text>
          ) : (
            <Text _light={{ color: colors.primary700 }} fontSize={"md"}>
              今日待辦: {todayTodo}
            </Text>
          )}
        </HStack>
      </HStack>
    </Box>
  );
};

export default TodayInfoCard;
