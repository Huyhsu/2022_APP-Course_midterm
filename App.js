import React from "react";
import { NativeBaseProvider, StatusBar } from "native-base";
import {
  SafeAreaProvider,
  SafeAreaView,
  initialWindowMetrics,
  initialSafeAreaInsets,
} from "react-native-safe-area-context";

import Navigation from "./src/navigation";

export default function App() {
  return (
    <SafeAreaProvider initialMetrics={initialWindowMetrics}>
      <StatusBar backgroundColor={"#E8F3FF"} barStyle={"dark-content"} />
      <SafeAreaView flex={1}>
        <NativeBaseProvider>
          <Navigation />
        </NativeBaseProvider>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}
