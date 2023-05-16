import { ScrollView, StyleSheet, Text, View } from "react-native";
import React, { useEffect } from "react";
import { Button, Card } from "@rneui/themed";
import { useSelector } from "react-redux";
import * as Linking from "expo-linking";
import LocationCard from "../components/Card";

const ReviewScreen = ({ navigation }) => {
  const { likes } = useSelector((state) => state.likes);

  useEffect(() => {
    navigation.setOptions({
      title: "Review Jobs",
      headerRight: () => (
        <Button
          title="Settings"
          onPress={() => navigation.navigate("Settings")}
          type="clear"
        />
      ),
    });
  }, [navigation]);

  return (
    <ScrollView>
      {likes.map((item) => {
        return <LocationCard key={item["location_id"]} item={item} isDetail />;
      })}
    </ScrollView>
  );
};

export default ReviewScreen;

const styles = StyleSheet.create({});
