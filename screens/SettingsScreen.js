import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { Button } from "@rneui/base";
import { useDispatch } from "react-redux";
import { clearLikes } from "../app/features/likes";

const SettingsScreen = () => {
  const dispatch = useDispatch();

  return (
    <View>
      <Text>SettingsScreen</Text>

      <Button
        title="Reset Liked Locations"
        onPress={() => dispatch(clearLikes())}
      />
    </View>
  );
};

export default SettingsScreen;

const styles = StyleSheet.create({});
