import React from "react";
import { Box, Center, Input, Image } from "native-base";
import { SafeAreaView } from "react-native-safe-area-context";
import { useTheme } from "@react-navigation/native";

import { LogBox } from "react-native";
LogBox.ignoreLogs(["NativeBase:"]);

const MyHeader = (props) => {
  const { colors } = useTheme();
  return (
    <SafeAreaView>
      <Box>
        <Center _light={{ bgColor: colors.secondary700 }} h={16}>
          <Input
            _light={{
              color: colors.dark700,
              bgColor: colors.light100,
              placeholderTextColor: colors.light700,
            }}
            _dark={{
              color: colors.dark700,
              bgColor: colors.light100,
              placeholderTextColor: colors.light700,
            }}
            w={"80%"}
            h={8}
            p={0}
            fontSize={"md"}
            borderWidth={0}
            borderRadius={4}
            placeholder="搜尋..."
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
