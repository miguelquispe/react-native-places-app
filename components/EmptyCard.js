import { View, Text } from "react-native";
import React from "react";
import { Button, Card } from "@rneui/themed";
import { useNavigation } from "@react-navigation/native";

const EmptyCard = () => {
  const navigation = useNavigation();

  return (
    <Card>
      <Card.Title>No more cards to show</Card.Title>
      <Button
        title="Back to Map"
        onPress={() =>
          navigation.navigate("Main", {
            screen: "Map",
          })
        }
      />
    </Card>
  );
};

export default EmptyCard;
