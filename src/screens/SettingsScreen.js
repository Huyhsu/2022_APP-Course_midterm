import React from "react";
import { useTheme, Box, HStack, Text, VStack, Center } from "native-base";

import SettingsOptions from "../components/SettingsOption";

const SettingsScreen = ({ navigation }) => {
  return (
    <Box flex={1}>
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
