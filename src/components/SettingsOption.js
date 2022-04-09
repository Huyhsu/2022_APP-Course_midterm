import React from "react";
import { Text, HStack, Pressable } from "native-base";
import { useTheme } from "@react-navigation/native";

const SettingsOptions = ({ navigation, title }) => {
  const { colors } = useTheme();
  return (
    <Pressable onPress={() => {}}>
      <HStack _light={{ bg: colors.light100 }} h={140}>
        <Text _light={{ color: colors.dark700 }} fontSize={"4xl"}>
          123{title}
        </Text>
      </HStack>
    </Pressable>
  );
};

export default SettingsOptions;
