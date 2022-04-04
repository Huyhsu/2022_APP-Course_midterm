import React from "react";
import { Box, HStack, Text, StatusBar } from "native-base";

const HomeScreen = ({ navigation }) => {
  return (
    <Box bgColor={"amber.100"}>
      {/* <StatusBar backgroundColor={"red"} /> */}
      <Text>I am HomeScreen</Text>
    </Box>
  );
};

export default HomeScreen;
