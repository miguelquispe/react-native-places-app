import { createNativeStackNavigator } from "@react-navigation/native-stack";
import FavoriteScreen from "../screens/FavoriteScreen";
import SettingsScreen from "../screens/SettingsScreen";

const FavoriteStack = createNativeStackNavigator();

export const FavoriteNav = () => {
  return (
    <FavoriteStack.Navigator>
      <FavoriteStack.Screen name="Favorite" component={FavoriteScreen} />
      <FavoriteStack.Screen name="Settings" component={SettingsScreen} />
    </FavoriteStack.Navigator>
  );
};
