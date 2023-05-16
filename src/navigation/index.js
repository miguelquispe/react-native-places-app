import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

// Screens
import WelcomeScreen from "../screens/WelcomeScreen";
import AuthScreen from "../screens/AuthScreen";
import { MainNav } from "./main";
// import WelcomeScreen from "../screens/WelcomeScreen";
// import AuthScreen from "../screens/AuthScreen";
// import MapScreen from "../screens/MapScreen";
// import DeckScreen from "../screens/DeckScreen";
// import SettingsScreen from "../screens/SettingsScreen";
// import FavoriteScreen from "../screens/FavoriteScreen";

// Navigation
const RootNav = createBottomTabNavigator();

export const RootNavigation = () => {
  return (
    <NavigationContainer>
      <RootNav.Navigator
        screenOptions={{
          headerShown: false,
          tabBarShowLabel: false,
          tabBarStyle: {
            display: "none",
          },
        }}
      >
        <RootNav.Screen name="Welcome" component={WelcomeScreen} />
        <RootNav.Screen name="Auth" component={AuthScreen} />
        <RootNav.Screen name="Main" component={MainNav} />
      </RootNav.Navigator>
    </NavigationContainer>
  );
};
