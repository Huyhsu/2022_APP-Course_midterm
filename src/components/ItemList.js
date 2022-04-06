import React from "react";
import { Box, Center, Input, Image, HStack, Text, FlatList } from "native-base";
import { LogBox } from "react-native";

import Item from "../components/Item";

LogBox.ignoreLogs(["NativeBase:"]);

const ItemList = (props) => {
  const renderItem = ({ item }) => <Item />;
  return (
    <FlatList
      data={props}
      renderItem={renderItem}
      keyExtractor={(item) => item.naem}
    />
  );
};

export default ItemList;
