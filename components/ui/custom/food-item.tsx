import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { ms } from "react-native-size-matters";

type FoodItemProps = {
  id: number;
  name: string;
  origin: string;
  price: string;
  rating: string;
};

const FoodItem = ({ id, name, origin, price, rating }: FoodItemProps) => {
  const router = useRouter();
  return (
    <View style={styles.container}>
      <View style={styles.imageWrapper}>
        <Image
          source={require("@/assets/images/pizza.jpg")}
          resizeMode="cover"
          style={styles.image}
        />
      </View>

      <View style={styles.info}>
        <TouchableOpacity
          activeOpacity={0.5}
          onPress={() => {
            router.push(`/(tabs)/home/${id}`);
          }}
        >
          <Text style={styles.title} numberOfLines={1}>
            {name}
          </Text>
        </TouchableOpacity>
        <Text style={styles.subTitle} numberOfLines={1}>
          {origin}
        </Text>

        <View style={styles.footer}>
          <Text style={styles.price}>${price}</Text>
          <View style={styles.rating}>
            <MaterialCommunityIcons name="star" size={ms(14)} />
            <Text style={styles.ratingText}>{rating}</Text>
          </View>
        </View>
      </View>
    </View>
  );
};

export default FoodItem;

const styles = StyleSheet.create({
  container: {
    width: "48%",
    backgroundColor: "#fff",
    borderRadius: ms(12),
    borderWidth: ms(1),
    borderColor: "#efefef",
    overflow: "hidden",
  },
  imageWrapper: {
    width: "100%",
    aspectRatio: 1.3,
  },
  image: {
    width: "100%",
    height: "100%",
  },
  info: {
    padding: ms(7),
    gap: ms(2),
  },
  title: {
    fontSize: ms(16),
    fontWeight: "700",
    color: "#111",
  },
  subTitle: {
    fontSize: ms(12),
    color: "#888",
  },
  footer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: ms(2),
  },
  price: {
    fontSize: ms(16),
    fontWeight: "800",
    color: "#111",
  },
  rating: {
    flexDirection: "row",
    alignItems: "center",
    gap: ms(3),
  },
  ratingText: {
    fontSize: ms(16),
    fontWeight: "600",
    color: "#444",
  },
});
