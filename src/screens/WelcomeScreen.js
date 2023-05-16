import { StyleSheet, Text, View } from "react-native";
import React, { useEffect } from "react";
import Slides from "../components/Slides";
import { useNavigation } from "@react-navigation/native";
// import AsyncStorage from "@react-native-async-storage/async-storage";
import { useDispatch, useSelector } from "react-redux";
import { facebookToken } from "../store/slices/auth";
// import Constants from "expo-constants";

const SLIDE_DATA = [
  { text: "Welcome to JobApp", color: "#03A9F4" },
  { text: "Use this to get a job", color: "#009688" },
  { text: "Set your location, then swipe away", color: "#03A9F4" },
];

const WelcomeScreen = () => {
  const state = useSelector((state) => state);
  // const { token } = state.auth;
  const dispatch = useDispatch();

  useEffect(() => {
    // dispatch(facebookToken());
    // console.log({ token });
    console.log({ state });
  }, []);

  // useEffect(() => {
  //   // if (token) {
  //   navigation.navigate("Main", { screen: "Map" });
  //   // }
  // }, [token]);

  const navigation = useNavigation();
  const onSlidesComplete = () => {
    // Navigate to the main screen
    // navigation.navigate("Auth");
    navigation.navigate("Main", { screen: "Map" });
  };

  return <Slides data={SLIDE_DATA} onComplete={onSlidesComplete} />;
};

export default WelcomeScreen;

const styles = StyleSheet.create({});
