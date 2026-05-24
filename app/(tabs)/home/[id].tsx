import foodData from "@/assets/data/foodData";
import { useLocalSearchParams } from "expo-router";
import React, { useState } from "react";
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { ms } from "react-native-size-matters";

type Doneness = "Rare" | "Med Rare" | "Well Done";
type Removal = "No Onions" | "No Aioli";
interface Addition {
  label: string;
  price: number;
}

const ADDITIONS: Addition[] = [
  { label: "Extra Cheese", price: 1.5 },
  { label: "Truffle Bacon", price: 2.0 },
];
const REMOVALS: Removal[] = ["No Onions", "No Aioli"];
const PREP_OPTIONS: Doneness[] = ["Rare", "Med Rare", "Well Done"];

const FoodItem = () => {
  const { id } = useLocalSearchParams();
  const item = foodData.find((i) => i.id.toString() === id);

  const lorem =
    "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quas quod rem itaque vel ut odio hic excepturi voluptatem ipsa ab explicabo eveniet, impedit, qui necessitatibus suscipit quaerat veniam temporibus deserunt?";

  const [doneness, setDoneness] = useState<Doneness>("Med Rare");
  const [checkedAdditions, setCheckedAdditions] = useState<Set<string>>(
    new Set(),
  );
  const [activeRemovals, setActiveRemovals] = useState<Set<Removal>>(new Set());
  const [qty, setQty] = useState(1);

  const toggleAddition = (label: string) =>
    setCheckedAdditions((prev) => {
      const next = new Set(prev);
      next.has(label) ? next.delete(label) : next.add(label);
      return next;
    });

  const toggleRemoval = (r: Removal) =>
    setActiveRemovals((prev) => {
      const next = new Set(prev);
      next.has(r) ? next.delete(r) : next.add(r);
      return next;
    });

  const extrasCost = ADDITIONS.filter((a) =>
    checkedAdditions.has(a.label),
  ).reduce((sum, a) => sum + a.price, 0);
  const total = (((item?.price ?? 0) + extrasCost) * qty).toFixed(2);

  return (
    <SafeAreaView style={styles.container} edges={["bottom"]}>
      <Image
        source={require("@/assets/images/pizza.jpg")}
        style={styles.image}
        resizeMode="cover"
      />

      <ScrollView
        style={styles.content}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        <View style={styles.titleRow}>
          <Text style={styles.title}>{item?.name}</Text>
          <Text style={styles.priceBadge}>${item?.price}</Text>
        </View>
        <Text style={styles.subTitle}>{item?.origin}</Text>
        <Text style={styles.description}>{lorem}</Text>

        {/* ── Divider ── */}
        <View style={styles.divider} />

        {/* ── Customize your bite ── */}
        <Text style={styles.sectionHeading}>Customize your bite</Text>

        {/* Preparation */}
        <View style={styles.optionBlock}>
          <View style={styles.optionHeader}>
            <Text style={styles.optionLabel}>Preparation</Text>
            <View style={styles.requiredBadge}>
              <Text style={styles.requiredText}>REQUIRED</Text>
            </View>
          </View>

          <View style={styles.pillRow}>
            {PREP_OPTIONS.map((opt) => {
              const active = doneness === opt;
              return (
                <TouchableOpacity
                  key={opt}
                  style={[styles.pill, active && styles.pillActive]}
                  onPress={() => setDoneness(opt)}
                  activeOpacity={0.75}
                >
                  <Text
                    style={[styles.pillText, active && styles.pillTextActive]}
                  >
                    {opt}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </View>
        </View>

        {/* Additions */}
        <View style={styles.optionBlock}>
          <View style={styles.optionHeader}>
            <Text style={styles.optionLabel}>Additions</Text>
            <Text style={styles.optionalText}>OPTIONAL</Text>
          </View>

          <View style={styles.additionBox}>
            {ADDITIONS.map((a, idx) => {
              const checked = checkedAdditions.has(a.label);
              return (
                <View key={a.label}>
                  <TouchableOpacity
                    style={styles.additionRow}
                    onPress={() => toggleAddition(a.label)}
                    activeOpacity={0.7}
                  >
                    <View
                      style={[
                        styles.checkbox,
                        checked && styles.checkboxChecked,
                      ]}
                    >
                      {checked && <Text style={styles.checkMark}>✓</Text>}
                    </View>
                    <Text style={styles.additionLabel}>{a.label}</Text>
                    <Text style={styles.additionPrice}>
                      +${a.price.toFixed(2)}
                    </Text>
                  </TouchableOpacity>

                  {idx < ADDITIONS.length - 1 && (
                    <View style={styles.innerDivider} />
                  )}
                </View>
              );
            })}
          </View>
        </View>

        {/* Removals */}
        <View style={styles.optionBlock}>
          <Text style={styles.optionLabel}>Removals</Text>
          <View style={styles.chipRow}>
            {REMOVALS.map((r) => {
              const active = activeRemovals.has(r);
              return (
                <TouchableOpacity
                  key={r}
                  style={[styles.chip, active && styles.chipActive]}
                  onPress={() => toggleRemoval(r)}
                  activeOpacity={0.75}
                >
                  <Text
                    style={[styles.chipText, active && styles.chipTextActive]}
                  >
                    {r}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </View>
        </View>
      </ScrollView>

      {/* ── Sticky bottom bar ── */}
      <View style={styles.bottomBar}>
        <View style={styles.stepper}>
          <TouchableOpacity
            style={styles.stepBtn}
            onPress={() => setQty((q) => Math.max(1, q - 1))}
            activeOpacity={0.7}
          >
            <Text style={styles.stepBtnText}>−</Text>
          </TouchableOpacity>
          <Text style={styles.stepValue}>{qty}</Text>
          <TouchableOpacity
            style={styles.stepBtn}
            onPress={() => setQty((q) => q + 1)}
            activeOpacity={0.7}
          >
            <Text style={styles.stepBtnText}>+</Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity style={styles.cartBtn} activeOpacity={0.85}>
          <Text style={styles.cartIcon}>🛒</Text>
          <Text style={styles.cartBtnText}>ADD TO CART</Text>
          <Text style={styles.cartTotal}> · ${total}</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default FoodItem;

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#111" },

  image: { width: "100%", height: "40%" },

  content: {
    flex: 1,
    backgroundColor: "#fff",
    borderTopLeftRadius: ms(28),
    borderTopRightRadius: ms(28),
    marginTop: -ms(28),
    paddingHorizontal: ms(14),
    paddingTop: ms(20),
  },

  scrollContent: { paddingBottom: ms(110) },

  titleRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  title: { fontSize: ms(28), fontWeight: "700" },
  priceBadge: {
    fontSize: ms(20),
    fontWeight: "800",
    borderRadius: ms(8),
    padding: ms(6),
    backgroundColor: "#E8E8E8",
  },
  subTitle: { fontSize: ms(16) },
  description: { fontSize: ms(14), lineHeight: ms(18) },

  divider: {
    height: 1,
    backgroundColor: "#EBEBEB",
    marginVertical: ms(18),
  },

  sectionHeading: {
    fontSize: ms(18),
    fontWeight: "700",
    marginBottom: ms(16),
  },

  optionBlock: { marginBottom: ms(20) },
  optionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: ms(10),
  },
  optionLabel: { fontSize: ms(15), fontWeight: "700", color: "#111" },
  optionalText: { fontSize: ms(11), fontWeight: "700", color: "#D4890A" },

  requiredBadge: {
    backgroundColor: "#FFEDD5",
    borderRadius: ms(4),
    paddingHorizontal: ms(8),
    paddingVertical: ms(2),
  },
  requiredText: {
    fontSize: ms(10),
    fontWeight: "700",
    color: "#D4890A",
    letterSpacing: 0.4,
  },

  pillRow: { flexDirection: "row", gap: ms(8) },
  pill: {
    flex: 1,
    borderWidth: ms(1.5),
    borderColor: "#DEDEDE",
    borderRadius: ms(10),
    paddingVertical: ms(9),
    alignItems: "center",
    backgroundColor: "#FAFAFA",
  },
  pillActive: { backgroundColor: "#111", borderColor: "#111" },
  pillText: { fontSize: ms(13), fontWeight: "600", color: "#666" },
  pillTextActive: { color: "#fff" },

  additionBox: {
    borderWidth: ms(1.5),
    borderColor: "#EBEBEB",
    borderRadius: ms(12),
    paddingHorizontal: ms(14),
    backgroundColor: "#FAFAFA",
  },
  additionRow: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: ms(12),
  },
  innerDivider: { height: 1, backgroundColor: "#F0F0F0" },

  checkbox: {
    width: ms(22),
    height: ms(22),
    borderRadius: ms(6),
    borderWidth: ms(2),
    borderColor: "#CECECE",
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    marginRight: ms(10),
  },
  checkboxChecked: { backgroundColor: "#111", borderColor: "#111" },
  checkMark: {
    color: "#fff",
    fontSize: ms(13),
    fontWeight: "700",
    lineHeight: ms(16),
  },
  additionLabel: {
    flex: 1,
    fontSize: ms(14),
    color: "#222",
    fontWeight: "500",
  },
  additionPrice: { fontSize: ms(14), fontWeight: "600", color: "#444" },

  chipRow: { flexDirection: "row", flexWrap: "wrap", gap: ms(8) },
  chip: {
    borderWidth: ms(1.5),
    borderColor: "#DEDEDE",
    borderRadius: ms(20),
    paddingHorizontal: ms(14),
    paddingVertical: ms(7),
    backgroundColor: "#F7F7F7",
  },
  chipActive: { backgroundColor: "#111", borderColor: "#111" },
  chipText: { fontSize: ms(13), fontWeight: "600", color: "#555" },
  chipTextActive: { color: "#fff" },

  bottomBar: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: ms(14),
    paddingTop: ms(12),
    paddingBottom: ms(42),
    backgroundColor: "#fff",
    borderTopWidth: ms(1),
    borderTopColor: "#F0F0F0",
    gap: ms(10),
  },

  stepper: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: ms(1.5),
    borderColor: "#E0E0E0",
    borderRadius: ms(10),
    overflow: "hidden",
  },
  stepBtn: {
    width: ms(36),
    height: ms(44),
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#F5F5F5",
  },
  stepBtnText: { fontSize: ms(20), fontWeight: "300", color: "#111" },
  stepValue: {
    fontSize: ms(15),
    fontWeight: "700",
    color: "#111",
    paddingHorizontal: ms(12),
  },

  cartBtn: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#111",
    borderRadius: ms(12),
    height: ms(48),
  },
  cartIcon: { fontSize: ms(15), marginRight: ms(4) },
  cartBtnText: {
    color: "#fff",
    fontSize: ms(13),
    fontWeight: "800",
    letterSpacing: 0.6,
  },
  cartTotal: { color: "#aaa", fontSize: ms(13), fontWeight: "600" },
});
