import React from "react";
import { Box, Switch, HStack, VStack, Text, useColorMode } from "native-base";
import { useTheme } from "@react-navigation/native";

const DisplaySettingScreen = () => {
  // Color Mode
  const { colorMode, toggleColorMode } = useColorMode();
  const { colors } = useTheme();

  return (
    <Box
      flex={1}
      _light={{ bgColor: colors.light400 }}
      _dark={{ bgColor: colors.light400 }}
    >
      <VStack pt={4} px={4}>
        <HStack
          w={"100%"}
          shadow={1}
          borderRadius={5}
          px={4}
          py={1}
          _light={{ bgColor: colors.light100 }}
          _dark={{
            bgColor: colors.light100,
            borderWidth: "0.6",
            borderColor: colors.light700,
          }}
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
              colorScheme="black"
            />
          </HStack>
        </HStack>
      </VStack>
    </Box>
  );
};

export default DisplaySettingScreen;
