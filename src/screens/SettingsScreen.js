import React from "react";
import { useTheme, Box, HStack, Text, VStack } from "native-base";

import SettingsOptions from "../components/SettingsOption";

const SettingsScreen = ({ navigation }) => {
  return (
    <Box flex={1}>
      <VStack>
        <SettingsOptions />
        <SettingsOptions />
      </VStack>
    </Box>
  );
};

export default SettingsScreen;
