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
} from "native-base";

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
          {/* <Item />
          <Item />
          <Item />
          <Item />
          <Item />
          <Item />
          <Item />
          <Item /> */}
        </Center>
      </ScrollView>
      {/* <Fab
        position="absolute"
        w={58}
        h={58}
        bgColor={"#D3F9E7"}
        rounded={16}
        bottom={16}
        right={4}
        icon={
          <Image source={require("../icon/icon_add.png")} alt={"add_icon"} />
        }
      /> */}
    </Box>
  );
};

export default HomeScreen;
