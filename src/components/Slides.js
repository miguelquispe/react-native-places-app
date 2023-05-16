import { View, Text, ScrollView, Dimensions } from "react-native";
import React from "react";
import { Button } from "@rneui/themed";

const SCREEN_WIDTH = Dimensions.get("window").width;

const Slides = ({ data, onComplete }) => {
  renderLastSlide = (i) => {
    if (i === data.length - 1) {
      return (
        <Button
          title="Onwards!"
          raised
          buttonStyle={styles.buttonStyle}
          onPress={() => onComplete()}
        />
      );
    }
  };

  const renderSlides = () => {
    return data.map((slide, i) => {
      return (
        <View
          key={slide.text}
          style={[
            styles.slideStyle,
            {
              backgroundColor: slide.color,
            },
          ]}
        >
          <Text style={styles.slideText}>{slide.text}</Text>
          {renderLastSlide(i)}
        </View>
      );
    });
  };

  return (
    <ScrollView horizontal style={{ flex: 1 }} pagingEnabled>
      {renderSlides()}
    </ScrollView>
  );
};

export default Slides;

const styles = {
  slideStyle: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    width: SCREEN_WIDTH,
  },
  slideText: {
    fontSize: 10,
    color: "white",
  },
  buttonStyle: {
    backgroundColor: "#0288D1",
  },
};
