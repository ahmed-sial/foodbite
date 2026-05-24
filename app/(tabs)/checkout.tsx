import React, { useState } from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { ms } from "react-native-size-matters";

const PAYMENT_METHODS = [
  { id: "apple", label: "Apple Pay", icon: "⊞" },
  { id: "card", label: "···· 4242", sub: "Exp 12/25", icon: "▭" },
];

const Checkout = () => {
  const [selectedPayment, setSelectedPayment] = useState("apple");

  const subtotal = 42.0;
  const deliveryFee = 3.5;
  const taxes = 4.15;
  const total = subtotal + deliveryFee + taxes;

  return (
    <SafeAreaView style={styles.container}>
      {/* ── Header ── */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>CHECKOUT</Text>
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* ── Delivery Details ── */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Delivery Details</Text>
          <TouchableOpacity>
            <Text style={styles.editText}>EDIT</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.card}>
          <View style={styles.row}>
            <Text style={styles.cardIcon}>📍</Text>
            <View>
              <Text style={styles.cardPrimary}>Jane Doe</Text>
              <Text style={styles.cardSecondary}>
                123 Atelier Avenue, Suite 4B
              </Text>
              <Text style={styles.cardSecondary}>New York, NY 10001</Text>
              {/* <Text style={[styles.cardSecondary + " " + styles.noteText]}> */}
              {/* Leave at door. Gate code: 4321 */}
              {/* </Text> */}
            </View>
          </View>
        </View>

        {/* ── Estimated Arrival ── */}
        <Text style={styles.sectionTitle}>Estimated Arrival</Text>

        <View style={styles.card}>
          <View style={styles.row}>
            <Text style={styles.cardIcon}>🕐</Text>
            <Text style={styles.cardPrimary}>35 - 45 min</Text>
          </View>
        </View>

        {/* ── Payment ── */}
        <Text style={styles.sectionTitle}>Payment</Text>

        <View style={styles.card}>
          {PAYMENT_METHODS.map((method, idx) => (
            <View key={method.id}>
              <TouchableOpacity
                style={styles.paymentRow}
                onPress={() => setSelectedPayment(method.id)}
                activeOpacity={0.7}
              >
                <Text style={styles.paymentIcon}>{method.icon}</Text>
                <View style={{ flex: 1 }}>
                  <Text style={styles.cardPrimary}>{method.label}</Text>
                  {method.sub && (
                    <Text style={styles.cardSecondary}>{method.sub}</Text>
                  )}
                </View>
                <View
                  style={[
                    styles.radio,
                    selectedPayment === method.id && styles.radioSelected,
                  ]}
                />
              </TouchableOpacity>
              {idx < PAYMENT_METHODS.length - 1 && (
                <View style={styles.innerDivider} />
              )}
            </View>
          ))}

          <View style={styles.innerDivider} />

          <TouchableOpacity style={styles.addPaymentRow}>
            <Text style={styles.addPaymentText}>+ ADD PAYMENT METHOD</Text>
          </TouchableOpacity>
        </View>

        {/* ── Summary ── */}
        <Text style={styles.sectionTitle}>Summary</Text>

        <View style={styles.summaryBlock}>
          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>Subtotal</Text>
            <Text style={styles.summaryValue}>${subtotal.toFixed(2)}</Text>
          </View>
          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>Delivery Fee</Text>
            <Text style={styles.summaryValue}>${deliveryFee.toFixed(2)}</Text>
          </View>
          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>Taxes & Fees</Text>
            <Text style={styles.summaryValue}>${taxes.toFixed(2)}</Text>
          </View>

          <View style={styles.divider} />

          <View style={styles.summaryRow}>
            <Text style={styles.totalLabel}>Total</Text>
            <Text style={styles.totalValue}>${total.toFixed(2)}</Text>
          </View>
        </View>
      </ScrollView>

      {/* ── Place Order ── */}
      <View style={styles.footer}>
        <TouchableOpacity style={styles.placeOrderBtn} activeOpacity={0.85}>
          <Text style={styles.placeOrderText}>PLACE ORDER</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default Checkout;

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff" },
  scrollContent: { paddingHorizontal: ms(16), paddingBottom: ms(24) },

  // Header
  header: {
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: ms(16),
    paddingVertical: ms(12),
  },
  backArrow: { fontSize: ms(20), color: "#111" },
  headerTitle: { fontSize: ms(15), fontWeight: "800", letterSpacing: 1.5 },

  // Section
  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: ms(20),
    marginBottom: ms(10),
  },
  sectionTitle: {
    fontSize: ms(16),
    fontWeight: "700",
    color: "#111",
    marginTop: ms(20),
    marginBottom: ms(10),
  },
  editText: { fontSize: ms(12), fontWeight: "700", color: "#111" },

  // Card
  card: {
    borderWidth: 1,
    borderColor: "#E8E8E8",
    borderRadius: ms(10),
    paddingHorizontal: ms(14),
    paddingVertical: ms(12),
  },
  row: { flexDirection: "row", alignItems: "flex-start", gap: ms(10) },
  cardIcon: { fontSize: ms(16), marginTop: ms(1) },
  cardPrimary: { fontSize: ms(14), fontWeight: "600", color: "#111" },
  cardSecondary: { fontSize: ms(13), color: "#777", marginTop: ms(1) },
  noteText: { marginTop: ms(6) },

  // Payment rows
  paymentRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: ms(10),
    paddingVertical: ms(12),
  },
  paymentIcon: { fontSize: ms(18) },
  radio: {
    width: ms(18),
    height: ms(18),
    borderRadius: ms(9),
    borderWidth: 1.5,
    borderColor: "#CCC",
  },
  radioSelected: { borderColor: "#111", borderWidth: ms(5) },
  innerDivider: { height: 1, backgroundColor: "#F0F0F0" },
  addPaymentRow: { paddingVertical: ms(12), alignItems: "center" },
  addPaymentText: { fontSize: ms(13), fontWeight: "700", color: "#111" },

  // Summary
  summaryBlock: { gap: ms(10) },
  summaryRow: { flexDirection: "row", justifyContent: "space-between" },
  summaryLabel: { fontSize: ms(13), color: "#666" },
  summaryValue: { fontSize: ms(13), color: "#111" },
  divider: { height: 1, backgroundColor: "#EBEBEB" },
  totalLabel: { fontSize: ms(16), fontWeight: "700", color: "#111" },
  totalValue: { fontSize: ms(20), fontWeight: "800", color: "#111" },

  // Footer
  footer: {
    paddingHorizontal: ms(16),
    paddingBottom: ms(24),
    paddingTop: ms(10),
    borderTopWidth: 1,
    borderTopColor: "#F0F0F0",
  },
  placeOrderBtn: {
    backgroundColor: "#111",
    borderRadius: ms(10),
    paddingVertical: ms(16),
    alignItems: "center",
  },
  placeOrderText: {
    color: "#fff",
    fontSize: ms(14),
    fontWeight: "800",
    letterSpacing: 1,
  },
});
