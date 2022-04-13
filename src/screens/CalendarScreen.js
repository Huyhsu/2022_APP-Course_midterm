import React, { useEffect, useState } from "react";
import { useTheme } from "@react-navigation/native";
import { Box, FlatList, Text, useColorMode } from "native-base";
import { useDispatch, useSelector } from "react-redux";
import { Calendar, LocaleConfig } from "react-native-calendars";

import Item from "../components/Item";
import { updateSelectItems } from "../redux/actions";

LocaleConfig.locales["fr"] = {
  monthNames: [
    "一月",
    "二月",
    "三月",
    "四月",
    "五月",
    "六月",
    "七月",
    "八月",
    "九月",
    "十月",
    "十一月",
    "十二月",
  ],
  monthNamesShort: [
    "一月",
    "二月",
    "三月",
    "四月",
    "五月",
    "六月",
    "七月",
    "八月",
    "九月",
    "十月",
    "十一月",
    "十二月",
  ],
  dayNames: ["週日", "週一", "週二", "週三", "週四", "週五", "週六"],
  dayNamesShort: ["日", "一", "二", "三", "四", "五", "六"],
  today: "今天",
};
LocaleConfig.defaultLocale = "fr";

const CalendarScreen = ({ navigation }) => {
  // State
  const { currentSelectDateItemList, itemList } = useSelector(
    (state) => state.item
  );
  const dispatch = useDispatch();
  const { colors } = useTheme();
  const { colorMode } = useColorMode();
  const [{ key, theme }, setTheme] = useState({
    key: "light",
    theme: {
      calendarBackground: colors.light100,
      dayTextColor: colors.dark700,
      monthTextColor: colors.dark700,
      arrowColor: colors.primary700,
    },
  });
  useEffect(() => {
    colorMode == "light"
      ? setTheme({
          key: "light",
          theme: {
            calendarBackground: colors.light100,
            dayTextColor: colors.dark700,
            monthTextColor: colors.dark700,
            arrowColor: colors.primary700,
          },
        })
      : setTheme({
          key: "dark",
          theme: {
            calendarBackground: colors.light400,
            dayTextColor: colors.primary700,
            monthTextColor: colors.primary700,
            arrowColor: colors.primary700,
          },
        });
  }, [colorMode]);

  const high = { key: "high", color: colors.high700 };
  const medium = {
    key: "medium",
    color: colors.medium700,
  };
  const low = { key: "low", color: colors.low700 };
  const primary = { key: "primary", color: colors.primary700 };

  const [pointedDate, setPointedDay] = useState({});
  const [stayPointedDate, setStayPointedDate] = useState("");

  const getPointedDate = (date) => {
    let tempPointDate = {};
    tempPointDate[date] = {
      selected: true,
      selectedColor: colors.select700,
    };
    setStayPointedDate(date);
    // 標記當前點擊的日期
    setPointedDay(tempPointDate);
  };

  useEffect(() => {
    let tempPointDate = {};
    tempPointDate[stayPointedDate] = {
      selected: true,
      selectedColor: colors.select700,
    };
    // 標記當前點擊的日期 為了更新 dark mode 顏色
    setPointedDay(tempPointDate);
    // 更新對應日期的事項
    dispatch(updateSelectItems(stayPointedDate));
  }, [itemList, colorMode]);

  const [allMarkedDates, setAllMarkDates] = useState({});

  useEffect(() => {
    let tempMarkedDates = {};
    itemList.items.map((value) => {
      tempMarkedDates[value.selectTime] = {
        dots: [
          primary,
          // value.divide == "low"
          //   ? low
          //   : value.divide == "medium"
          //   ? medium
          //   : high,
        ],
      };
    });
    setAllMarkDates(tempMarkedDates);
  }, [itemList, colorMode]);

  const renderItem = ({ item }) => <Item item={item} navigation={navigation} />;

  return (
    <Box
      flex={1}
      // px={4}
      _light={{ bgColor: colors.light100 }}
      _dark={{ bgColor: colors.light400 }}
    >
      <Calendar
        markingType={"multi-dot"}
        markedDates={{ ...allMarkedDates, ...pointedDate }}
        minDate={"2022-04-01"}
        onDayPress={(day) => {
          // console.log("selected day", day.dateString);
          dispatch(updateSelectItems(day.dateString));
          getPointedDate(day.dateString);
          // console.log(allMarkedDates);
        }}
        enableSwipeMonths
        key={key}
        theme={{ ...theme, dotStyle: { width: 8, height: 8, borderRadius: 8 } }}
      />
      <Box
        flex={1}
        pt={4}
        mt={4}
        shadow={4}
        bgColor={colors.secondary700}
        borderTopRightRadius={24}
        borderTopLeftRadius={24}
        borderWidth={1}
        borderColor={colors.light700}
        borderBottomWidth={0}
      >
        {currentSelectDateItemList.items.length == 0 ? (
          <Text
            _light={{ color: colors.primary700 }}
            fontSize={"md"}
            pt={24}
            alignSelf={"center"}
          >
            當日無待辦事項
          </Text>
        ) : (
          <FlatList
            data={currentSelectDateItemList.items}
            renderItem={renderItem}
            showsVerticalScrollIndicator={false}
            keyExtractor={(item, index) => item.title + item.category + index}
            contentContainerStyle={{
              paddingTop: 16,
              paddingBottom: 88,
              paddingHorizontal: 16,
            }}
          />
        )}
      </Box>
    </Box>
  );
};

export default CalendarScreen;
