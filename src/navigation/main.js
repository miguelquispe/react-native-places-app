import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Icon } from "@rneui/themed";

// Screens
import MapScreen from "../screens/MapScreen";
import PlacesScreen from "../screens/PlacesScreen";
import { FavoriteNav } from "./favorite";

const MainBottom = createBottomTabNavigator();

export const MainNav = () => {
  return (
    <MainBottom.Navigator
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
      <MainBottom.Screen name="Map" component={MapScreen} />
      <MainBottom.Screen name="Places" component={PlacesScreen} />
      <MainBottom.Screen name="Favorites" component={FavoriteNav} />
    </MainBottom.Navigator>
  );
};
