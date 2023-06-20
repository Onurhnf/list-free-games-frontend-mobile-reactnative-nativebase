import {
  HStack,
  NativeBaseProvider,
  Text,
  useColorMode,
  Switch,
} from "native-base";
import { StyleSheet } from "react-native";
import Main from "./Main";

export default function App() {
  /**
   * I prefer to separate the App and Main components explicitly. This makes it much easier to wrap the entire app if necessary,
   * for example, by using providers like Redux or, in this case, by wrapping it with NativeBase(Design system) Providers.
   **/

  return (
    <NativeBaseProvider>
      <Main />
    </NativeBaseProvider>
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
