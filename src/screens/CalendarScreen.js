import React, { useEffect, useState } from "react";
import { useTheme } from "@react-navigation/native";
import { Box, HStack, Text, useColorMode } from "native-base";
import {
  Calendar,
  CalendarList,
  Agenda,
  LocaleConfig,
} from "react-native-calendars";

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
  return (
    <Box
      flex={1}
      pt={4}
      px={4}
      _light={{ bgColor: colors.light100 }}
      _dark={{ bgColor: colors.light400 }}
    >
      <Calendar
        // // Initially visible month. Default = now
        // // current={"2012-03-01"}
        // // Minimum date that can be selected, dates before minDate will be grayed out. Default = undefined
        // minDate={"2022-04-01"}
        // // Maximum date that can be selected, dates after maxDate will be grayed out. Default = undefined
        // maxDate={"2023-05-30"}
        // // Handler which gets executed on day press. Default = undefined
        // onDayPress={(day) => {
        //   console.log("selected day", day);
        // }}
        // // Handler which gets executed on day long press. Default = undefined
        // onDayLongPress={(day) => {
        //   console.log("selected day", day);
        // }}
        // // Month format in calendar title. Formatting values: http://arshaw.com/xdate/#Formatting
        // monthFormat={"yyyy MM"}
        // // Handler which gets executed when visible month changes in calendar. Default = undefined
        // onMonthChange={(month) => {
        //   console.log("month changed", month);
        // }}
        // // Hide month navigation arrows. Default = false
        // hideArrows={true}
        // // Replace default arrows with custom ones (direction can be 'left' or 'right')
        // renderArrow={(direction) => <Arrow />}
        // // Do not show days of other months in month page. Default = false
        // hideExtraDays={true}
        // // If hideArrows = false and hideExtraDays = false do not switch month when tapping on greyed out
        // // day from another month that is visible in calendar page. Default = false
        // disableMonthChange={true}
        // // If firstDay=1 week starts from Monday. Note that dayNames and dayNamesShort should still start from Sunday
        // firstDay={1}
        // // Hide day names. Default = false
        // hideDayNames={true}
        // // Show week numbers to the left. Default = false
        // showWeekNumbers={true}
        // // Handler which gets executed when press arrow icon left. It receive a callback can go back month
        // onPressArrowLeft={(subtractMonth) => subtractMonth()}
        // // Handler which gets executed when press arrow icon right. It receive a callback can go next month
        // onPressArrowRight={(addMonth) => addMonth()}
        // // Disable left arrow. Default = false
        // disableArrowLeft={true}
        // // Disable right arrow. Default = false
        // disableArrowRight={true}
        // // Disable all touch events for disabled days. can be override with disableTouchEvent in markedDates
        // disableAllTouchEventsForDisabledDays={true}
        // // Replace default month and year title with custom one. the function receive a date as parameter
        // renderHeader={(date) => {
        //   /*Return JSX*/
        // }}
        // // Enable the option to swipe between months. Default = false
        // enableSwipeMonths={true}
        enableSwipeMonths
        key={key}
        theme={{ ...theme }}
      />
    </Box>
  );
};

export default CalendarScreen;
