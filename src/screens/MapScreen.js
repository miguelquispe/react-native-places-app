import {
  ActivityIndicator,
  Platform,
  StyleSheet,
  Text,
  View,
} from "react-native";
import MapView, {
  Marker,
  PROVIDER_DEFAULT,
  PROVIDER_GOOGLE,
} from "react-native-maps";
import React, { useEffect, useState } from "react";
import { Button } from "@rneui/themed";
import { useLazyGetLocationsQuery } from "../store/services/places";
import Constants from "expo-constants";
import { useNavigation } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import { clearPlaces } from "../store/slices/places";

const MapScreen = () => {
  const state = useSelector((state) => state);
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const [mapLoaded, setMapLoaded] = useState(false);
  const [region, setRegion] = useState({
    latitude: -12.046374,
    longitude: -77.042793,
    longitudeDelta: 0.04,
    latitudeDelta: 0.02,
  });

  const [getLocations, { data: locations, isLoading, error, isSuccess }] =
    useLazyGetLocationsQuery();

  useEffect(() => {
    console.log("MAP SCREEN");
    console.log(state);
    dispatch(clearPlaces());
    setMapLoaded(true);
  }, []);

  useEffect(() => {
    if (isSuccess && locations.length > 0) {
      navigation.navigate("Places");
    }
  }, [isSuccess, locations]);

  const onRegionChangeComplete = (newRegion) => {
    console.log(newRegion);
    setRegion(newRegion);
  };

  if (!mapLoaded) {
    return (
      <View style={{ flex: 1, justifyContent: "center" }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  const onButtonPress = async () => {
    console.log(region);
    try {
      await getLocations({
        latLong: `${region.latitude},${region.longitude}`,
        key: Constants.expoConfig.extra.tripAdvisorApiKey,
        language: "es_PE",
      }).unwrap();
    } catch (error) {
      console.log({ error });
    }
  };

  return (
    <View style={styles.container}>
      <MapView
        provider={
          Platform.OS === "android" ? PROVIDER_GOOGLE : PROVIDER_DEFAULT
        }
        initialRegion={region}
        style={{
          flex: 1,
        }}
        // onRegionChangeComplete={onRegionChangeComplete}
      >
        <Marker
          draggable
          coordinate={region}
          onDragEnd={(e) => console.log(e)}
        />
      </MapView>
      <View style={styles.buttonContainer}>
        <Button
          title="Search This Area"
          onPress={() => onButtonPress()}
          buttonStyle={{
            width: "100%",
          }}
          loading={isLoading}
        />
      </View>
    </View>
  );
};

export default MapScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  buttonContainer: {
    position: "absolute",
    bottom: 20,
    left: 0,
    right: 0,
  },
});
