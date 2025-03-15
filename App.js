import React from "react";
import { Provider } from "react-redux";
import { store } from "./src/redux/store";
import { NavigationContainer } from "@react-navigation/native";
import BottomNav from "./src/components/BottomNav";

export default function App() {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <BottomNav />
      </NavigationContainer>
    </Provider>
  );
}
