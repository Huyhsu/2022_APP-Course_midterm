import React from "react";
import { Box, HStack, Text, StatusBar, ScrollView, Center } from "native-base";

import Item from "../components/Item";

const HomeScreen = (props, { navigation }) => {
  return (
    <Box flex={1} bgColor={"#F4F4F4"}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* <Box bgColor={"red.100"}>
          <Text>I am HomeScreen</Text>
          <Text>{props.number}</Text>
        </Box> */}
        <Center pb={88}>
          <Item />
          <Item />
          <Item />
          <Item />
          <Item />
          <Item />
          <Item />
          <Item />
          <Item />
        </Center>
      </ScrollView>
    </Box>
  );
};

export default HomeScreen;
