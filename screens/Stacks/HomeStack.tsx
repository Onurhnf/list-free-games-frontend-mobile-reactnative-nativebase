import {
  CardStyleInterpolators,
  createStackNavigator,
} from "@react-navigation/stack";
import Home from "../Home/Home.screen";
import { useColorMode, useTheme, useColorModeValue, Button } from "native-base";

import { Feather } from "@expo/vector-icons";
import { Octicons } from "@expo/vector-icons";

export default function HomeStack() {
  const Stack = createStackNavigator();
  const theme = useTheme();
  const headerBg = useColorModeValue(
    theme.colors.blueGray[200],
    theme.colors.coolGray[800]
  );
  const headerTitle = useColorModeValue(
    theme.colors.blueGray[800],
    theme.colors.blueGray[200]
  );

  return (
    <Stack.Navigator
      screenOptions={{
        cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
      }}
    >
      <Stack.Screen
        name="Famobi"
        component={Home}
        options={{
          headerShown: true,
          headerTitleAlign: "center",
          headerStyle: { backgroundColor: headerBg },
          headerTintColor: headerTitle,
          headerRight: ToggleDarkMode,
        }}
      />
    </Stack.Navigator>
  );
}

function ToggleDarkMode() {
  const { colorMode, toggleColorMode } = useColorMode();
  return (
    <Button
      onPress={toggleColorMode}
      mr={2}
      variant="outline"
      borderRadius="3xl"
      startIcon={
        colorMode === "dark" ? (
          <Feather name="sun" size={24} color="white" />
        ) : (
          <Octicons name="moon" size={24} color="black" />
        )
      }
    ></Button>
  );
}
