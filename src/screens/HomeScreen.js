import React from "react";
import { useTheme } from "@react-navigation/native";
import { Box, Text, FlatList, HStack, Image } from "native-base";

import Item from "../components/Item";

const HomeScreen = ({ navigation, currentList }) => {
  const { colors } = useTheme();
  const renderItem = ({ item }) => (
    <>
      {item.title != null ? (
        <Item item={item} navigation={navigation} />
      ) : (
        <>
          {doneList.length == 0 ? null : (
            <>
              <HStack mt={4}>
                <Text fontSize={"md"} color={colors.primary700}>
                  已完成
                </Text>
                <Image
                  source={require("../icon/icon_dropdown.png")}
                  alt={"calendar_icon"}
                />
              </HStack>
              <FlatList
                data={item}
                renderItem={renderItem}
                showsVerticalScrollIndicator={false}
                keyExtractor={(item, index) =>
                  item.title + item.category + index
                }
                contentContainerStyle={{
                  paddingTop: 16,
                  paddingBottom: 88,
                }}
              />
            </>
          )}
        </>
      )}
    </>
  );

  let sortedList = [...currentList];
  sortedList.sort((first, second) => {
    return first.compareTime - second.compareTime;
  });
  let notDoneList = sortedList.filter((value) => value.done == false);
  let doneList = sortedList.filter((value) => value.done);
  let finalList = [...notDoneList, doneList];
  return (
    <Box
      _light={{ bgColor: colors.light400 }}
      _dark={{ bgColor: colors.light400 }}
      flex={1}
      // alignItems={"center"}
      px={4}
      w={"100%"}
    >
      {currentList.length == 0 ? (
        <Text
          _light={{ color: colors.primary700 }}
          fontSize={"md"}
          pt={24}
          alignSelf={"center"}
        >
          點擊 + 號以新增項目
        </Text>
      ) : (
        <FlatList
          data={finalList}
          renderItem={renderItem}
          showsVerticalScrollIndicator={false}
          keyExtractor={(item, index) => item.title + item.category + index}
          contentContainerStyle={{
            paddingTop: 16,
            paddingBottom: 88,
          }}
        />
      )}
    </Box>
  );
};

export default HomeScreen;
