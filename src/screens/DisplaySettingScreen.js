import React from "react";
import { Box, Switch, HStack, VStack, Text, useColorMode } from "native-base";
import { useTheme } from "@react-navigation/native";

const DisplaySettingScreen = () => {
  // Color Mode
  const { colorMode, toggleColorMode } = useColorMode();
  const { colors } = useTheme();

  return (
    <Box flex={1} _light={{ bgColor: colors.light400 }}>
      <VStack pt={4} px={4}>
        <HStack
          w={"100%"}
          shadow={1}
          borderRadius={5}
          px={4}
          py={1}
          _dark={{
            bg: "blueGray.800",
            borderColor: "blueGray.500",
            borderWidth: 0.6,
          }}
          _light={{ bgColor: colors.light100 }}
        >
          <HStack alignItems={"center"} space={48} p={0}>
            <Text _light={{ color: colors.primary700 }} fontSize="lg">
              {colorMode == "light" ? "淺色模式" : "深色模式"}
            </Text>

            <Switch
              name="light Mode"
              isChecked={colorMode === "light"}
              onToggle={toggleColorMode}
              accessibilityLabel="display-mode"
              accessibilityHint="light or dark mode"
            />
          </HStack>
        </HStack>
      </VStack>
    </Box>
  );
};

export default DisplaySettingScreen;
