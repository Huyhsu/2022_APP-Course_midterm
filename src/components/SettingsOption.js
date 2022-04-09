import React from "react";
import { Text, HStack, Pressable } from "native-base";
import { useTheme } from "@react-navigation/native";

const SettingsOptions = ({ navigation, title, destination }) => {
  const { colors } = useTheme();
  return (
    <Pressable
      onPress={() => {
        destination ? navigation.navigate(destination) : null;
      }}
    >
      <HStack
        _light={{ bg: colors.light100 }}
        px={4}
        py={14}
        mt={2}
        borderRadius={5}
        shadow={1}
      >
        <Text _light={{ color: colors.primary700 }} fontSize={"lg"}>
          {title}
        </Text>
      </HStack>
    </Pressable>
  );
};

export default SettingsOptions;
