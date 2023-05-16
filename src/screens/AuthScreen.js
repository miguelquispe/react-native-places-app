import { StyleSheet, Text, View } from "react-native";

import React, { useEffect } from "react";

import { useDispatch, useSelector } from "react-redux";
import * as WebBrowser from "expo-web-browser";
import {
  facebookLoginSuccess,
  facebookLoginFailure,
  facebookToken,
} from "../store/slices/auth";
import * as AuthSession from "expo-auth-session";

import * as Facebook from "expo-auth-session/providers/facebook";

// import { Button } from "@rneui/themed";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";

import Constants from "expo-constants";

WebBrowser.maybeCompleteAuthSession();

const AuthScreen = () => {
  const navigation = useNavigation();
  const { token } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const [request, response, promptAsync] = Facebook.useAuthRequest({
    clientId: Constants.expoConfig.extra.facebookAppId,
  });

  // useEffect(() => {
  //   console.log("authscreen");
  //   dispatch(facebookToken());
  // }, []);

  useEffect(() => {
    console.log("ue::token", token);
    if (token) {
      console.log("useEffect::if");
      console.log({ token });
      navigation.navigate("Main", { screen: "Map" });
    }
  }, [token]);

  useEffect(() => {
    if (request && !token) {
      console.log({ token });
      console.log({ request });
      handleFacebookLogin();
    }
  }, [request, token]);

  const handleFacebookLogin = async () => {
    const result = await promptAsync();

    if (result.type === "cancel") {
      return dispatch(facebookLoginFailure());
    }
    // if (result.type === "success") {
    AsyncStorage.setItem("@fb_token", result.authentication.accessToken);
    dispatch(facebookLoginSuccess(result.authentication.accessToken));
    // }
  };

  return (
    <View>
      <Text>token: {String(token)}</Text>
      {/* <Button title="Login" onPress={() => handleAuth()} /> */}
      {/* <Button title="Home" onPress={() => navigation.navigate("Main")} /> */}
    </View>
  );
};

export default AuthScreen;

const styles = StyleSheet.create({});
