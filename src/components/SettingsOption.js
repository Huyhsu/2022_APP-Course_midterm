import React from "react";
import { useTheme } from "@react-navigation/native";
import { Text, HStack, Pressable } from "native-base";

const SettingsOptions = ({ navigation, title, destination }) => {
  const { colors } = useTheme();
  return (
    <Pressable
      onPress={() => {
        destination ? navigation.navigate(destination) : null;
      }}
    >
      <HStack
        _light={{ bgColor: colors.light100 }}
        _dark={{
          bgColor: colors.light100,
          borderWidth: "0.6",
          borderColor: colors.light700,
        }}
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
