import React from "react";
import {
  Box,
  HStack,
  Text,
  StatusBar,
  ScrollView,
  Center,
  Image,
  Fab,
  Pressable,
  Button,
  FlatList,
} from "native-base";
import { useTheme } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";

import Item from "../components/Item";
import { addItem } from "../redux/actions";

const HomeScreen = ({ navigation, currentList }) => {
  const { itemList } = useSelector((state) => state.item);
  const dispatch = useDispatch();
  const { colors } = useTheme();
  const renderItem = ({ item }) => <Item item={item} />;
  return (
    <Box
      _light={{ bgColor: colors.light400 }}
      _dark={{ bgColor: colors.light400 }}
      flex={1}
      alignItems={"center"}
    >
      {/* <Button
        onPress={() => dispatch(addItem({ title: "7414", category: "test" }))}
      >
        ADD
      </Button> */}
      {currentList.length == 0 ? (
        <Text _light={{ color: colors.primary700 }} fontSize={"md"} pt={24}>
          點擊 + 號新增事項
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

      {/* <ScrollView showsVerticalScrollIndicator={false}>
        <Box bgColor={"red.100"}>
          <Text>I am HomeScreen</Text>
        </Box>
        <Center pb={88}>
          <Button
            onPress={() =>
              dispatch(addItem({ title: "7414", category: "哈哈" }))
            }
          >
            ADD
          </Button>
        </Center>
        {props.currentList.map((item, index) => (
          <Item data={item} key={item.category + index} />
        ))}
      </ScrollView> */}
    </Box>
  );
};

export default HomeScreen;
