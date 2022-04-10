import React from "react";
import { useTheme } from "@react-navigation/native";
import { Box, HStack, Text, VStack, Center, useColorMode } from "native-base";

import SettingsOptions from "../components/SettingsOption";
import { color } from "react-native/Libraries/Components/View/ReactNativeStyleAttributes";

const SettingsScreen = ({ navigation }) => {
  const { colors } = useTheme();
  const { colorMode } = useColorMode();
  return (
    <Box
      flex={1}
      bgColor={colorMode == "light" ? colors.light100 : colors.light400}
    >
      <VStack pt={4} px={4}>
        <SettingsOptions
          title={"主題設定"}
          navigation={navigation}
          destination="DisplaySetting"
        />
        <SettingsOptions title={"垃圾桶"} navigation={navigation} />
      </VStack>
    </Box>
  );
};

export default SettingsScreen;
