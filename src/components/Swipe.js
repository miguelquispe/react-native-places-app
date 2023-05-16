import {
  StyleSheet,
  View,
  PanResponder,
  Animated,
  Dimensions,
  LayoutAnimation,
  UIManager,
  Text,
} from "react-native";
import React, { useEffect, useRef, useState } from "react";

UIManager.setLayoutAnimationEnabledExperimental &&
  UIManager.setLayoutAnimationEnabledExperimental(true);

const SCREEN_WIDTH = Dimensions.get("window").width;
const SWIPE_THRESHOLD = 0.25 * SCREEN_WIDTH;
const SWIPE_OUT_DURATION = 250;

const Swipe = ({
  data,
  renderCard: RenderCard,
  onSwipeLeft,
  onSwipeRight,
  renderNoMoreCards: RenderNoMoreCards,
  keyProp,
}) => {
  // console.log("data-swipe", data);
  const pan = useRef(new Animated.ValueXY()).current;
  const [currentIndex, setCurrentIndex] = useState(0);
  const indexCardSwipe = useRef(0);

  console.log({ keyProp });

  const panResponder = useRef(
    PanResponder.create({
      // Ask to be the responder:
      // Any time a user touches the screen, this function will be called
      onStartShouldSetPanResponder: () => true,
      // If the user touches the screen and then moves their finger, this function will be called
      onPanResponderMove: Animated.event([null, { dx: pan.x, dy: pan.y }], {
        useNativeDriver: false,
      }),
      // If the user removes their finger from the screen, this function will be called
      onPanResponderRelease: (event, gesture) => {
        if (gesture.dx > SWIPE_THRESHOLD) {
          forceSwipe("right");
        } else if (gesture.dx < -SWIPE_THRESHOLD) {
          forceSwipe("left");
        } else {
          resetPosition();
        }
      },
    })
  ).current;

  // Reset the currentIndex to 0 when the data changes
  useEffect(() => {
    console.log("setCurrentIndex");
    setCurrentIndex(0);
  }, [data]);

  // componentWillUpdate
  useEffect(() => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.spring);
    console.log("currentIndex", currentIndex);
    indexCardSwipe.current = currentIndex;
  }, [currentIndex]);

  const onSwipeComplete = (direction) => {
    const item = data[indexCardSwipe.current];
    // console.log("first", currentIndex);

    console.log("first", item.location_id);

    direction === "right" ? onSwipeRight(item) : onSwipeLeft();
    pan.setValue({ x: 0, y: 0 });
    // console.log(currentIndex);
    setCurrentIndex((current) => current + 1);
  };

  const forceSwipe = (direction) => {
    const x = direction === "right" ? SCREEN_WIDTH : -SCREEN_WIDTH;

    Animated.timing(pan, {
      toValue: { x, y: 0 },
      duration: SWIPE_OUT_DURATION,
      useNativeDriver: false,
    }).start(() => onSwipeComplete(direction));
  };

  const resetPosition = () => {
    Animated.spring(pan, {
      toValue: { x: 0, y: 0 },
      useNativeDriver: false,
    }).start();
  };

  const getCardStyle = () => {
    const rotate = pan.x.interpolate({
      inputRange: [-SCREEN_WIDTH * 1.5, 0, SCREEN_WIDTH * 1.5],
      outputRange: ["-120deg", "0deg", "120deg"],
    });

    return {
      ...pan.getLayout(),
      transform: [{ rotate }],
    };
  };

  const renderCards = () => {
    if (currentIndex >= data.length) return <RenderNoMoreCards />;

    const deck = data.map((item, index) => {
      console.log("key", item[keyProp]);
      if (index < currentIndex) return null;

      if (index === currentIndex) {
        return (
          <Animated.View
            key={item[keyProp]}
            style={[getCardStyle(), styles.cardStyle, { zIndex: 99 }]}
            {...panResponder.panHandlers}
          >
            <RenderCard item={item} />
          </Animated.View>
        );
      }

      return (
        <Animated.View
          key={item[keyProp]}
          style={[
            styles.cardStyle,
            {
              top: 10 * (index - currentIndex),
            },
          ]}
        >
          <RenderCard item={item} />
        </Animated.View>
      );
    });

    // Validate in Android the reverse() method
    // return Platform.OS === "android" ? deck : deck.reverse();
    return deck.reverse();
  };

  return <View>{renderCards()}</View>;
};

Swipe.defaultProps = {
  onSwipeLeft: () => {},
  onSwipeRight: () => {},
  keyProp: "id",
};

export default Swipe;

const styles = StyleSheet.create({
  cardStyle: {
    position: "absolute",
    width: SCREEN_WIDTH,
  },
});
