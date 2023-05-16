import { View, Text, Platform } from "react-native";
import React from "react";
import { useDetailQuery } from "../store/services/places";
import Constants from "expo-constants";
import MapView, { PROVIDER_DEFAULT, PROVIDER_GOOGLE } from "react-native-maps";
import { AirbnbRating, Card } from "@rneui/themed";
import { Button } from "@rneui/base";
import * as Linking from "expo-linking";

// Android: RN Maps lat and long must be double type

const LocationCard = ({ item, isDetail = false, children }) => {
  return (
    <Card key={item.location_id}>
      <Card.Title>{item?.name}</Card.Title>
      <AirbnbRating
        defaultRating={item.rating}
        count={5}
        size={20}
        showRating={false}
        isDisabled
      />
      <Card.Divider />
      <View
        style={{
          height: 200,
        }}
      >
        <MapView
          scrollEnabled={false}
          provider={
            Platform.OS === "android" ? PROVIDER_GOOGLE : PROVIDER_DEFAULT
          }
          style={{
            flex: 1,
          }}
          cacheEnabled={Platform.OS === "android" ? true : false}
          initialRegion={{
            latitude: parseFloat(item.latitude),
            longitude: parseFloat(item.longitude),
            latitudeDelta: 0.01,
            longitudeDelta: 0.02,
          }}
        />
      </View>
      <Text>{item?.location_id}</Text>
      <Text>{item?.address_obj?.address_string}</Text>
      {isDetail && (
        <Button
          title="View Location"
          onPress={() => Linking.openURL(item?.web_url)}
        />
      )}
    </Card>
  );
};

export default LocationCard;
