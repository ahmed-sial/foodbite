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

const INITIAL_ITEMS = [
  {
    id: 1,
    name: "Truffle Burger",
    note: "Medium Rare, No Onions",
    price: 18.5,
    image: require("@/assets/images/pizza.jpg"),
    qty: 1,
  },
  {
    id: 2,
    name: "Parmesan Fries",
    note: "Truffle Aioli Side",
    price: 6.0,
    image: require("@/assets/images/pizza.jpg"),
    qty: 2,
  },
  {
    id: 3,
    name: "Parmesan Fries",
    note: "Truffle Aioli Side",
    price: 6.0,
    image: require("@/assets/images/pizza.jpg"),
    qty: 2,
  },
  {
    id: 4,
    name: "Parmesan Fries",
    note: "Truffle Aioli Side",
    price: 6.0,
    image: require("@/assets/images/pizza.jpg"),
    qty: 2,
  },
  {
    id: 5,
    name: "Parmesan Fries",
    note: "Truffle Aioli Side",
    price: 6.0,
    image: require("@/assets/images/pizza.jpg"),
    qty: 2,
  },
];

const DELIVERY_FEE = 3.5;
const TAX_RATE = 0.085;

const Cart = () => {
  const [items, setItems] = useState(INITIAL_ITEMS);

  const changeQty = (id: number, delta: number) =>
    setItems((prev) =>
      prev
        .map((i) => (i.id === id ? { ...i, qty: i.qty + delta } : i))
        .filter((i) => i.qty > 0),
    );

  const subtotal = items.reduce((s, i) => s + i.price * i.qty, 0);
  const taxes = subtotal * TAX_RATE;
  const total = subtotal + DELIVERY_FEE + taxes;

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>CART</Text>
      </View>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* ── Cart Items ── */}
        <View style={styles.section}>
          {items.map((item, idx) => (
            <View key={item.id}>
              <View style={styles.cartRow}>
                <Image
                  source={item.image}
                  style={styles.itemImage}
                  resizeMode="cover"
                />

                <View style={styles.itemInfo}>
                  <Text style={styles.itemName}>{item.name}</Text>
                  <Text style={styles.itemNote}>{item.note}</Text>
                  <Text style={styles.itemPrice}>
                    ${(item.price * item.qty).toFixed(2)}
                  </Text>
                </View>

                {/* Stepper */}
                <View style={styles.stepper}>
                  <TouchableOpacity onPress={() => changeQty(item.id, 1)}>
                    <Text style={styles.stepIcon}>+</Text>
                  </TouchableOpacity>
                  <Text style={styles.stepValue}>{item.qty}</Text>
                  <TouchableOpacity onPress={() => changeQty(item.id, -1)}>
                    <Text style={styles.stepIcon}>−</Text>
                  </TouchableOpacity>
                </View>
              </View>

              {idx < items.length - 1 && <View style={styles.divider} />}
            </View>
          ))}
        </View>

        {/* ── Summary ── */}
        <View style={styles.summary}>
          <Text style={styles.summaryTitle}>SUMMARY</Text>

          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>Subtotal</Text>
            <Text style={styles.summaryValue}>${subtotal.toFixed(2)}</Text>
          </View>
          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>Delivery Fee</Text>
            <Text style={styles.summaryValue}>${DELIVERY_FEE.toFixed(2)}</Text>
          </View>
          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>Taxes</Text>
            <Text style={styles.summaryValue}>${taxes.toFixed(2)}</Text>
          </View>

          <View style={styles.totalRow}>
            <Text style={styles.totalLabel}>TOTAL</Text>
            <Text style={styles.totalValue}>${total.toFixed(2)}</Text>
          </View>
        </View>

        {/* ── Checkout ── */}
        <TouchableOpacity style={styles.checkoutBtn} activeOpacity={0.85}>
          <Text style={styles.checkoutText}>CHECKOUT →</Text>
        </TouchableOpacity>

        <Text style={styles.deliveryNote}>Estimated delivery: 25-35 min</Text>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Cart;

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff" },
  header: {
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: ms(16),
    paddingVertical: ms(10),
  },
  headerTitle: { fontSize: ms(16), fontWeight: "800", letterSpacing: 1 },
  // Page title
  pageTitle: {
    fontSize: ms(28),
    fontWeight: "700",
    paddingHorizontal: ms(16),
    marginBottom: ms(16),
  },

  // Cart items card
  section: {
    marginHorizontal: ms(16),
    borderWidth: 1,
    borderColor: "#EBEBEB",
    borderRadius: ms(12),
    paddingHorizontal: ms(12),
  },
  cartRow: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: ms(12),
    gap: ms(12),
  },
  itemImage: {
    width: ms(64),
    height: ms(64),
    borderRadius: ms(8),
  },
  itemInfo: { flex: 1 },
  itemName: { fontSize: ms(15), fontWeight: "700", color: "#111" },
  itemNote: { fontSize: ms(12), color: "#888", marginTop: ms(2) },
  itemPrice: { fontSize: ms(14), fontWeight: "600", marginTop: ms(4) },
  divider: { height: 1, backgroundColor: "#F0F0F0" },

  // Stepper
  stepper: { alignItems: "center", gap: ms(6) },
  stepIcon: { fontSize: ms(18), color: "#111", fontWeight: "300" },
  stepValue: { fontSize: ms(15), fontWeight: "700" },

  // Summary
  summary: {
    marginHorizontal: ms(16),
    backgroundColor: "#F7F7F7",
    borderRadius: ms(12),
    padding: ms(16),
    gap: ms(10),
  },
  summaryTitle: { fontSize: ms(13), fontWeight: "800", letterSpacing: 0.5 },
  summaryRow: { flexDirection: "row", justifyContent: "space-between" },
  summaryLabel: { fontSize: ms(13), color: "#555" },
  summaryValue: { fontSize: ms(13), color: "#111" },
  totalRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: ms(4),
    paddingTop: ms(10),
    borderTopWidth: 1,
    borderTopColor: "#E0E0E0",
  },
  totalLabel: { fontSize: ms(12), fontWeight: "700", letterSpacing: 0.5 },
  totalValue: { fontSize: ms(22), fontWeight: "800" },

  // Checkout
  checkoutBtn: {
    margin: ms(16),
    backgroundColor: "#111",
    borderRadius: ms(10),
    paddingVertical: ms(16),
    alignItems: "center",
  },
  checkoutText: {
    color: "#fff",
    fontSize: ms(14),
    fontWeight: "800",
    letterSpacing: 0.6,
  },
  deliveryNote: {
    textAlign: "center",
    fontSize: ms(12),
    color: "#999",
    marginBottom: ms(24),
  },
});
