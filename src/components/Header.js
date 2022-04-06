import React from "react";
import { Box, Center, Input, Image } from "native-base";
import { SafeAreaView } from "react-native-safe-area-context";
import { LogBox } from "react-native";

LogBox.ignoreLogs(["NativeBase:"]);

const MyHeader = (props) => {
  return (
    <SafeAreaView>
      {/* <Center backgroundColor={"#E8F3FF"} height={58}> */}
      <Box>
        <Center bgColor={"#E8F3FF"} h={16}>
          <Input
            w={"80%"}
            h={8}
            p={0}
            fontSize={"md"}
            color={"#111111"}
            backgroundColor={"#F8FEFF"}
            borderWidth={0}
            borderRadius={4}
            placeholder="搜尋..."
            placeholderTextColor={"#888888"}
            InputLeftElement={
              <Image
                source={require("../icon/icon_search.png")}
                alt={"search_icon"}
              />
            }
          />
        </Center>
      </Box>
    </SafeAreaView>
  );
};

export default MyHeader;
