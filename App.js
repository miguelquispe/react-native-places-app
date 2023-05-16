import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import WelcomeScreen from "./src/screens/WelcomeScreen";
import AuthScreen from "./src/screens/AuthScreen";
import MapScreen from "./src/screens/MapScreen";
import DeckScreen from "./src/screens/DeckScreen";
import SettingsScreen from "./src/screens/SettingsScreen";
import ReviewScreen from "./src/screens/ReviewScreen";

import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { persistor, store } from "./src/store";
import { Icon } from "@rneui/themed";

// Navigation
const MainMenu = createBottomTabNavigator();
const HomeTabs = createBottomTabNavigator();
const ReviewStack = createNativeStackNavigator();

const ReviewScreens = () => {
  return (
    <ReviewStack.Navigator>
      <ReviewStack.Screen name="Review Jobs" component={ReviewScreen} />
      <ReviewStack.Screen name="Settings" component={SettingsScreen} />
    </ReviewStack.Navigator>
  );
};

const HomeScreen = () => {
  return (
    <HomeTabs.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarIcon: () => {
          let iconName = "crosshairs";

          if (route.name === "Map") {
            iconName = "crosshairs";
          } else if (route.name === "Deck") {
            iconName = "file-alt";
          } else if (route.name === "Review") {
            iconName = "heart";
          }

          return <Icon name={iconName} type="font-awesome-5" />;
        },
      })}
    >
      <HomeTabs.Screen name="Map" component={MapScreen} />
      <HomeTabs.Screen name="Deck" component={DeckScreen} />
      <HomeTabs.Screen name="Review" component={ReviewScreens} />
    </HomeTabs.Navigator>
  );
};

// let persistor = persistStore(store);

export default function App() {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <NavigationContainer>
          <MainMenu.Navigator
            screenOptions={{
              headerShown: false,
              tabBarShowLabel: false,
              tabBarStyle: {
                display: "none",
              },
            }}
          >
            <MainMenu.Screen name="Welcome" component={WelcomeScreen} />
            <MainMenu.Screen name="Auth" component={AuthScreen} />
            <MainMenu.Screen name="Main" component={HomeScreen} />
          </MainMenu.Navigator>
        </NavigationContainer>
      </PersistGate>
    </Provider>
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
