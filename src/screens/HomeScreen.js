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
} from "native-base";

import { useDispatch, useSelector } from "react-redux";

import Item from "../components/Item";
import { addItem } from "../redux/actions";

const HomeScreen = (props, { navigation }) => {
  const { itemList } = useSelector((state) => state.item);
  const dispatch = useDispatch();

  return (
    <Box flex={1} bgColor={"#F4F4F4"}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* <Box bgColor={"red.100"}>
          <Text>I am HomeScreen</Text>
          <Text>{props.number}</Text>
        </Box> */}
        <Center pb={88}>
          <Button onPress={() => dispatch(addItem({ title: "7414" }))}>
            ADD
          </Button>
        </Center>
        {itemList.items.map((item, index) => (
          <Item data={item} />
        ))}
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
