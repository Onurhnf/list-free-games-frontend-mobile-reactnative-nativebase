import { NavigationContainer } from "@react-navigation/native";
import React from "react";
import HomeStack from "./screens/Stacks/HomeStack";
import { View } from "native-base";

const Main: React.FC = () => {
  // I prefer to explicitly declare the App and Main components. This makes it easier to wrap the entire app if necessary,
  // such as with providers like Redux, or in this case, wrapping it with NativeBase(design system in this project) Providers.

  return (
    <NavigationContainer>
      <HomeStack />
    </NavigationContainer>
  );
};

export default Main;
