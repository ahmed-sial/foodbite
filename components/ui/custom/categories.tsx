import { Category } from "@/types/types";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import React, { useState } from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { ms, s, vs } from "react-native-size-matters";

type CategoriesProps = {
  categories: Category[];
};

const Categories = ({ categories }: CategoriesProps) => {
  const [selectedCat, setSelectedCat] = useState("");
  return (
    <ScrollView
      style={styles.scrollView}
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={{ gap: ms(18) }}
    >
      {categories.map((cat) => {
        return (
          <View key={cat.name}>
            <TouchableOpacity
              style={[
                styles.iconBox,
                selectedCat === cat.name ? styles.selected : "",
              ]}
              activeOpacity={0.7}
              onPress={() => setSelectedCat(cat.name)}
            >
              <MaterialCommunityIcons
                name={cat.icon}
                size={ms(28)}
                color="#555555"
              />
            </TouchableOpacity>
            <Text style={styles.text}>{cat.name}</Text>
          </View>
        );
      })}
    </ScrollView>
  );
};

export default Categories;

const styles = StyleSheet.create({
  scrollView: {
    margin: ms(10),
  },
  iconBox: {
    justifyContent: "center",
    alignItems: "center",
    borderRadius: ms(10),
    backgroundColor: "#E3E3DE",
    width: s(58),
    height: vs(52),
  },
  text: {
    fontSize: ms(14),
    textAlign: "center",
  },
  selected: {
    borderWidth: ms(2),
    borderColor: "black",
  },
});
