import data from "@/assets/data/data";
import foodData from "@/assets/data/foodData";
import Categories from "@/components/ui/custom/categories";
import DiscountCard from "@/components/ui/custom/discount-card";
import FoodItem from "@/components/ui/custom/food-item";
import Header from "@/components/ui/custom/header";
import SearchBar from "@/components/ui/search/searchbar";
import React from "react";
import { FlatList, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { ms } from "react-native-size-matters";

const Home = () => {
  const ListHeader = () => (
    <>
      <View style={styles.topSection}>
        <Header />
        <SearchBar />
        <Categories
          categories={[
            { name: "Burgers", icon: "hamburger" },
            { name: "Pizzas", icon: "pizza" },
            { name: "Asian", icon: "noodles" },
            { name: "Seafood", icon: "fish" },
            { name: "Bakery", icon: "bread-slice-outline" },
            { name: "Desi", icon: "food" },
          ]}
        />
      </View>

      {/* Horizontal discount cards */}
      <FlatList
        data={data}
        keyExtractor={(item) => item.title}
        renderItem={({ item }) => (
          <DiscountCard
            discountText={item.discountText}
            offerName={item.offerName}
            subTitle={item.subTitle}
            title={item.title}
          />
        )}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.discountsList}
      />

      {/* Section heading */}
      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>POPULAR SIGNATURES</Text>
        <Text style={styles.viewAll}>VIEW ALL</Text>
      </View>
    </>
  );

  return (
    <SafeAreaView style={styles.screen}>
      <FlatList
        data={foodData}
        keyExtractor={(item) => item.name}
        renderItem={({ item }) => (
          <FoodItem
            name={item.name}
            origin={item.origin}
            price={item.price}
            rating={item.rating}
          />
        )}
        ListHeaderComponent={ListHeader}
        numColumns={2}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.foodList}
        columnWrapperStyle={styles.columnWrapper}
      />
    </SafeAreaView>
  );
};

export default Home;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
  topSection: {
    paddingHorizontal: ms(16),
    gap: ms(14),
    marginBottom: ms(6),
  },
  discountsList: {
    paddingHorizontal: ms(16),
    gap: ms(12),
    paddingBottom: ms(4),
  },
  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: ms(16),
    marginTop: ms(5),
    marginBottom: ms(8),
  },
  sectionTitle: {
    fontSize: ms(16),
    fontWeight: "700",
    letterSpacing: ms(0.5),
  },
  viewAll: {
    fontSize: ms(12),
    fontWeight: "500",
    color: "#888",
  },
  foodList: {
    paddingBottom: ms(24),
  },
  columnWrapper: {
    gap: ms(10),
    marginBottom: ms(10),
    paddingHorizontal: ms(16),
  },
});
