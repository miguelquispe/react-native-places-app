import { ActivityIndicator, StyleSheet, Text, View } from "react-native";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Swipe from "../components/Swipe";
import LocationCard from "../components/Card";
import EmptyCard from "../components/EmptyCard";
import { addLike } from "../store/slices/likes";

// import { useLazyDetailsQuery } from "../slices/services/places";
import Constants from "expo-constants";
import { useLazyDetailsQuery } from "../store/services/places";

const PlacesScreen = () => {
  const dispatch = useDispatch();

  const {
    search = [],
    items = [],
    loading,
  } = useSelector((state) => state.locations);

  const [getAll, { data, error }] = useLazyDetailsQuery();

  useEffect(() => {
    console.log("DECK SCREEN");
    console.log({ search });
  }, []);

  useEffect(() => {
    getAll({ ids: search, key: Constants.expoConfig.extra.tripAdvisorApiKey });
  }, [search]);

  useEffect(() => {
    console.log({ items });
    // allLocations();
    // dispatch(getAllLocations(search));
  }, [data]);

  useEffect(() => {
    console.log(error);
  }, [error]);

  // const allLocations = async () => {
  //   // for (const id of search) {
  //   //   const response = await useDetailQuery({
  //   //     id,
  //   //     key: Constants.expoConfig.extra.tripAdvisorApiKey,
  //   //   });
  //   //   console.log({ response });
  //   // }
  // };

  // useEffect(() => {
  //   console.log({ search });
  //   dispatch(getAllLocations(search));
  // }, [dispatch]);

  const onSwipeRight = (item) => {
    const itemLiked = items.find(
      (location) => location.location_id === item.location_id
    );
    console.log({ itemLiked });
    dispatch(addLike(itemLiked));
  };

  // handleSwipeLeft
  // const onSwipeLeft = (item) => {};
  if (loading === "pending") {
    return (
      <View>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  if (error) {
    return (
      <View>
        <Text>Error</Text>
      </View>
    );
  }

  return (
    <View>
      {data?.length > 0 && (
        <Swipe
          data={items}
          renderCard={LocationCard}
          renderNoMoreCards={EmptyCard}
          keyProp="location_id"
          onSwipeRight={onSwipeRight}
        />
      )}
    </View>
  );
};

export default PlacesScreen;

const styles = StyleSheet.create({});
