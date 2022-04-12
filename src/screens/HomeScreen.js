import React from "react";
import { useTheme } from "@react-navigation/native";
import { Box, Text, FlatList } from "native-base";

import Item from "../components/Item";

const HomeScreen = ({ navigation, currentList }) => {
  const { colors } = useTheme();
  const renderItem = ({ item }) => <Item item={item} navigation={navigation} />;
  return (
    <Box
      _light={{ bgColor: colors.light400 }}
      _dark={{ bgColor: colors.light400 }}
      flex={1}
      alignItems={"center"}
    >
      {currentList.length == 0 ? (
        <Text _light={{ color: colors.primary700 }} fontSize={"md"} pt={24}>
          點擊 + 號以新增項目
        </Text>
      ) : (
        <FlatList
          data={currentList}
          renderItem={renderItem}
          showsVerticalScrollIndicator={false}
          keyExtractor={(item, index) => item.title + item.category + index}
          contentContainerStyle={{
            paddingBottom: 88,
          }}
        />
      )}
    </Box>
  );
};

export default HomeScreen;
