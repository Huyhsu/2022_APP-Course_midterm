import React from "react";
import { useTheme } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Box, Center, Input, Image, useColorMode } from "native-base";

import { LogBox } from "react-native";
LogBox.ignoreLogs(["NativeBase:"]);

const MyHeader = (props) => {
  const { colors } = useTheme();
  const { colorMode } = useColorMode();
  return (
    <SafeAreaView>
      <Box>
        <Center bgColor={colors.secondary700} h={16}>
          <Input
            _light={{
              color: colors.dark700,
              bgColor: colors.light100,
              placeholderTextColor: colors.light700,
            }}
            _dark={{
              color: colors.primary700,
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
              colorMode == "light" ? (
                <Image
                  source={require("../icon/icon_search.png")}
                  alt={"search_icon"}
                />
              ) : (
                <Image
                  source={require("../icon/icon_dark_search.png")}
                  alt={"search_icon"}
                />
              )
            }
          />
        </Center>
      </Box>
    </SafeAreaView>
  );
};

export default MyHeader;
