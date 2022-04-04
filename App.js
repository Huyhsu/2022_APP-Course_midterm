import React from "react";
import { StyleSheet } from "react-native";
import {
  NativeBaseProvider,
  Box,
  Text,
  HStack,
  VStack,
  StatusBar,
} from "native-base";
import { SafeAreaProvider } from "react-native-safe-area-context";

import Navigation from "./src/navigation";

export default function App() {
  return (
    <SafeAreaProvider>
      <StatusBar backgroundColor={"#E8F3FF"} barStyle={"dark-content"} />
      <NativeBaseProvider>
        <Navigation />
      </NativeBaseProvider>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
