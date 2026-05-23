import React from "react";
import {
  Dimensions,
  ImageBackground,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { ms } from "react-native-size-matters";

type DiscountCardProps = {
  offerName: string;
  title: string;
  subTitle: string;
  discountText: string;
};

const DiscountCard = ({
  offerName,
  title,
  subTitle,
  discountText,
}: DiscountCardProps) => {
  return (
    <View style={styles.card}>
      <ImageBackground
        source={require("@/assets/images/pizza.jpg")}
        resizeMode="cover"
        imageStyle={{ opacity: 0.5 }}
        style={styles.image}
      >
        <View style={styles.textContainer}>
          <View style={styles.offerBadge}>
            <Text style={styles.offerName}>{offerName}</Text>
          </View>

          {/* Title */}
          <Text style={styles.title}>{title}</Text>

          {/* Subtitle */}
          <Text style={styles.subTitle}>{subTitle}</Text>

          {/* Discount Button */}
          <TouchableOpacity style={styles.discountButton} activeOpacity={0.8}>
            <Text style={styles.discountText}>{discountText}</Text>
          </TouchableOpacity>
        </View>
      </ImageBackground>
    </View>
  );
};

export default DiscountCard;

const { width: SCREEN_WIDTH } = Dimensions.get("window");

const styles = StyleSheet.create({
  card: {
    width: SCREEN_WIDTH * 0.9,
    borderWidth: ms(1),
    borderColor: "#e0e0e0",
    borderRadius: ms(16),
    overflow: "hidden",
    backgroundColor: "#f5f5f5",
    marginHorizontal: ms(6),
  },
  image: {
    width: "100%",
    aspectRatio: 2.2,
    justifyContent: "center",
  },
  textContainer: {
    width: "55%",
    paddingHorizontal: ms(14),
    paddingVertical: ms(12),
    gap: ms(6),
  },
  offerBadge: {
    backgroundColor: "#111",
    paddingHorizontal: ms(7),
    paddingVertical: ms(3),
    borderRadius: ms(4),
    alignSelf: "flex-start",
  },
  offerName: {
    color: "#fff",
    fontSize: ms(12),
    fontWeight: "700",
    letterSpacing: ms(1),
    textTransform: "uppercase",
  },
  title: {
    fontSize: ms(24),
    fontWeight: "800",
    color: "#111",
    lineHeight: ms(22),
  },
  subTitle: {
    fontSize: ms(14),
    fontWeight: "500",
    lineHeight: ms(14),
  },
  discountButton: {
    backgroundColor: "white",
    color: "black",
    paddingHorizontal: ms(12),
    paddingVertical: ms(5),
    alignSelf: "flex-start",
    marginTop: ms(2),
  },
  discountText: {
    fontSize: ms(11),
    fontWeight: "700",
    color: "#111",
  },
});
