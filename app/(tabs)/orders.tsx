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

type OrderStatus = "Delivered" | "Cancelled";

interface OrderItem {
  name: string;
  qty: number;
}

interface Order {
  id: string;
  date: string;
  status: OrderStatus;
  items: OrderItem[];
  total: number;
}

const ORDERS: Order[] = [
  {
    id: "ORD-4821",
    date: "May 22, 2026",
    status: "Delivered",
    items: [
      { name: "Truffle Burger", qty: 1 },
      { name: "Parmesan Fries", qty: 2 },
    ],
    total: 36.85,
  },
  {
    id: "ORD-4790",
    date: "May 18, 2026",
    status: "Delivered",
    items: [
      { name: "Double Truffle Smash", qty: 1 },
      { name: "Truffle Bacon", qty: 1 },
    ],
    total: 29.4,
  },
  {
    id: "ORD-4755",
    date: "May 10, 2026",
    status: "Cancelled",
    items: [{ name: "Parmesan Fries", qty: 3 }],
    total: 18.0,
  },
  {
    id: "ORD-4701",
    date: "Apr 30, 2026",
    status: "Delivered",
    items: [
      { name: "Truffle Burger", qty: 2 },
      { name: "Parmesan Fries", qty: 1 },
    ],
    total: 49.65,
  },
  {
    id: "ORD-4688",
    date: "Apr 21, 2026",
    status: "Delivered",
    items: [{ name: "Double Truffle Smash", qty: 2 }],
    total: 22.5,
  },
];

type Filter = "All" | "Delivered" | "Cancelled";
const FILTERS: Filter[] = ["All", "Delivered", "Cancelled"];

const OrderHistory = () => {
  const [activeFilter, setActiveFilter] = useState<Filter>("All");

  const filtered =
    activeFilter === "All"
      ? ORDERS
      : ORDERS.filter((o) => o.status === activeFilter);

  return (
    <SafeAreaView style={styles.container}>
      {/* ── Header ── */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>ORDER HISTORY</Text>
      </View>

      {/* ── Filter tabs ── */}
      <View style={styles.filterRow}>
        {FILTERS.map((f) => (
          <TouchableOpacity
            key={f}
            style={[
              styles.filterTab,
              activeFilter === f && styles.filterTabActive,
            ]}
            onPress={() => setActiveFilter(f)}
            activeOpacity={0.75}
          >
            <Text
              style={[
                styles.filterText,
                activeFilter === f && styles.filterTextActive,
              ]}
            >
              {f}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {filtered.length === 0 && (
          <View style={styles.empty}>
            <Text style={styles.emptyIcon}>🧾</Text>
            <Text style={styles.emptyText}>No orders found</Text>
          </View>
        )}

        {filtered.map((order) => (
          <View key={order.id} style={styles.orderCard}>
            {/* Card header */}
            <View style={styles.cardHeader}>
              <View>
                <Text style={styles.orderId}>{order.id}</Text>
                <Text style={styles.orderDate}>{order.date}</Text>
              </View>
              <View
                style={[
                  styles.statusBadge,
                  order.status === "Cancelled" && styles.statusBadgeCancelled,
                ]}
              >
                <Text
                  style={[
                    styles.statusText,
                    order.status === "Cancelled" && styles.statusTextCancelled,
                  ]}
                >
                  {order.status}
                </Text>
              </View>
            </View>

            <View style={styles.divider} />

            {/* Items */}
            {order.items.map((item, idx) => (
              <View key={idx} style={styles.itemRow}>
                <Text style={styles.itemQty}>{item.qty}×</Text>
                <Text style={styles.itemName}>{item.name}</Text>
              </View>
            ))}

            <View style={styles.divider} />

            {/* Footer */}
            <View style={styles.cardFooter}>
              <Text style={styles.totalLabel}>
                Total{" "}
                <Text style={styles.totalValue}>${order.total.toFixed(2)}</Text>
              </Text>

              {order.status === "Delivered" ? (
                <TouchableOpacity style={styles.reorderBtn} activeOpacity={0.8}>
                  <Text style={styles.reorderText}>REORDER</Text>
                </TouchableOpacity>
              ) : (
                <TouchableOpacity activeOpacity={0.7}>
                  <Text style={styles.detailsLink}>VIEW DETAILS</Text>
                </TouchableOpacity>
              )}
            </View>
          </View>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
};

export default OrderHistory;

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff" },
  scrollContent: { padding: ms(16), gap: ms(14), paddingBottom: ms(32) },

  // Header
  header: {
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: ms(16),
    paddingVertical: ms(12),
  },
  headerTitle: { fontSize: ms(15), fontWeight: "800", letterSpacing: 1.5 },

  // Filters
  filterRow: {
    flexDirection: "row",
    paddingHorizontal: ms(16),
    gap: ms(8),
    marginBottom: ms(4),
  },
  filterTab: {
    paddingHorizontal: ms(16),
    paddingVertical: ms(7),
    borderRadius: ms(20),
    borderWidth: 1.5,
    borderColor: "#E0E0E0",
    backgroundColor: "#FAFAFA",
  },
  filterTabActive: { backgroundColor: "#111", borderColor: "#111" },
  filterText: { fontSize: ms(13), fontWeight: "600", color: "#666" },
  filterTextActive: { color: "#fff" },

  // Order card
  orderCard: {
    borderWidth: 1,
    borderColor: "#E8E8E8",
    borderRadius: ms(12),
    padding: ms(14),
    gap: ms(10),
  },
  cardHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
  },
  orderId: { fontSize: ms(14), fontWeight: "700", color: "#111" },
  orderDate: { fontSize: ms(12), color: "#888", marginTop: ms(2) },

  // Status badge
  statusBadge: {
    backgroundColor: "#ECFDF5",
    borderRadius: ms(6),
    paddingHorizontal: ms(10),
    paddingVertical: ms(3),
  },
  statusBadgeCancelled: { backgroundColor: "#FEF2F2" },
  statusText: { fontSize: ms(11), fontWeight: "700", color: "#16A34A" },
  statusTextCancelled: { color: "#DC2626" },

  // Items
  itemRow: { flexDirection: "row", gap: ms(8) },
  itemQty: {
    fontSize: ms(13),
    fontWeight: "700",
    color: "#888",
    width: ms(24),
  },
  itemName: { fontSize: ms(13), color: "#333", fontWeight: "500" },

  divider: { height: 1, backgroundColor: "#F0F0F0" },

  // Card footer
  cardFooter: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  totalLabel: { fontSize: ms(13), color: "#666" },
  totalValue: { fontWeight: "700", color: "#111" },

  reorderBtn: {
    backgroundColor: "#111",
    borderRadius: ms(8),
    paddingHorizontal: ms(14),
    paddingVertical: ms(7),
  },
  reorderText: {
    color: "#fff",
    fontSize: ms(12),
    fontWeight: "800",
    letterSpacing: 0.5,
  },
  detailsLink: { fontSize: ms(12), fontWeight: "700", color: "#888" },

  // Empty state
  empty: { alignItems: "center", marginTop: ms(60), gap: ms(10) },
  emptyIcon: { fontSize: ms(40) },
  emptyText: { fontSize: ms(15), color: "#999", fontWeight: "500" },
});
