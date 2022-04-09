import React from "react";
import { NativeBaseProvider } from "native-base";
import {
  SafeAreaProvider,
  SafeAreaView,
  initialWindowMetrics,
  initialSafeAreaInsets,
} from "react-native-safe-area-context";
import { Provider } from "react-redux";

import store from "./src/redux/store";
import Navigation from "./src/navigation";

export default function App() {
  return (
    <SafeAreaProvider initialMetrics={initialWindowMetrics}>
      <Provider store={store}>
        {/* <SafeAreaView flex={1}> */}
        <NativeBaseProvider>
          <Navigation />
        </NativeBaseProvider>
        {/* </SafeAreaView> */}
      </Provider>
    </SafeAreaProvider>
  );
}
