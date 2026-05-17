import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  Alert,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

// ─── Data dummy bookmark ──────────────────────────────────────────────────────
const initialBookmarks = [
  { id: 1, emoji: "🥣", name: "Oatmeal Pisang", category: "Sarapan", kalori: 150, savedAt: "Hari ini" },
  { id: 4, emoji: "🥤", name: "Smoothie Alpukat", category: "Minuman", kalori: 160, savedAt: "Kemarin" },
  { id: 5, emoji: "🍚", name: "Nasi Merah Tempe", category: "Makan Siang", kalori: 310, savedAt: "Kemarin" },
  { id: 6, emoji: "🥚", name: "Telur Rebus", category: "Sarapan", kalori: 78, savedAt: "3 hari lalu" },
  { id: 9, emoji: "🍗", name: "Ayam Panggang", category: "Makan Malam", kalori: 250, savedAt: "3 hari lalu" },
];

// ─── Komponen card bookmark ───────────────────────────────────────────────────
const BookmarkCard = ({
  item,
  onRemove,
}: {
  item: typeof initialBookmarks[0];
  onRemove: (id: number) => void;
}) => (
  <View style={styles.card}>
    <View style={styles.cardEmoji}>
      <Text style={{ fontSize: 30 }}>{item.emoji}</Text>
    </View>
    <View style={{ flex: 1, gap: 4 }}>
      <Text style={styles.cardCategory}>{item.category}</Text>
      <Text style={styles.cardName}>{item.name}</Text>
      <View style={styles.cardMeta}>
        <Text style={styles.cardMetaText}>🔥 {item.kalori} kkal</Text>
        <Text style={styles.cardMetaText}>  🕐 {item.savedAt}</Text>
      </View>
    </View>
    <TouchableOpacity
      style={styles.removeBtn}
      onPress={() => onRemove(item.id)}
    >
      <Text style={styles.removeBtnText}>🗑️</Text>
    </TouchableOpacity>
  </View>
);

// ─── Screen utama ─────────────────────────────────────────────────────────────
export default function Bookmark() {
  const [bookmarks, setBookmarks] = useState(initialBookmarks);

  const totalKalori = bookmarks.reduce((sum, item) => sum + item.kalori, 0);

  const handleRemove = (id: number) => {
    Alert.alert(
      "Hapus Bookmark",
      "Yakin ingin menghapus menu ini dari simpanan?",
      [
        { text: "Batal", style: "cancel" },
        {
          text: "Hapus",
          style: "destructive",
          onPress: () => setBookmarks((prev) => prev.filter((b) => b.id !== id)),
        },
      ]
    );
  };

  const handleClearAll = () => {
    Alert.alert("Hapus Semua", "Hapus semua menu tersimpan?", [
      { text: "Batal", style: "cancel" },
      {
        text: "Hapus Semua",
        style: "destructive",
        onPress: () => setBookmarks([]),
      },
    ]);
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <View>
          <Text style={styles.headerTitle}>Menu Tersimpan 🔖</Text>
          <Text style={styles.headerSub}>{bookmarks.length} menu disimpan</Text>
        </View>
        {bookmarks.length > 0 && (
          <TouchableOpacity onPress={handleClearAll} style={styles.clearBtn}>
            <Text style={styles.clearBtnText}>Hapus Semua</Text>
          </TouchableOpacity>
        )}
      </View>

      {/* Summary Card */}
      {bookmarks.length > 0 && (
        <View style={styles.summaryCard}>
          <View style={styles.summaryItem}>
            <Text style={styles.summaryValue}>{bookmarks.length}</Text>
            <Text style={styles.summaryLabel}>Menu</Text>
          </View>
          <View style={styles.summaryDivider} />
          <View style={styles.summaryItem}>
            <Text style={styles.summaryValue}>{totalKalori}</Text>
            <Text style={styles.summaryLabel}>Total kkal</Text>
          </View>
          <View style={styles.summaryDivider} />
          <View style={styles.summaryItem}>
            <Text style={styles.summaryValue}>
              {Math.round(totalKalori / bookmarks.length)}
            </Text>
            <Text style={styles.summaryLabel}>Rata-rata kkal</Text>
          </View>
        </View>
      )}

      {/* List */}
      <ScrollView showsVerticalScrollIndicator={false} style={{ marginTop: 8 }}>
        {bookmarks.length === 0 ? (
          <View style={styles.emptyWrap}>
            <Text style={{ fontSize: 52 }}>📭</Text>
            <Text style={styles.emptyTitle}>Belum ada simpanan</Text>
            <Text style={styles.emptyText}>
              Temukan menu sehat dan simpan di sini
            </Text>
          </View>
        ) : (
          <View style={styles.listWrap}>
            {bookmarks.map((item) => (
              <BookmarkCard key={item.id} item={item} onRemove={handleRemove} />
            ))}
          </View>
        )}
        <View style={{ height: 30 }} />
      </ScrollView>
    </SafeAreaView>
  );
}

// ─── Styles ───────────────────────────────────────────────────────────────────
const GREEN = "#3a8c34";
const GREEN_LIGHT = "#e8f5e2";

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#f5f7f0" },

  header: {
    backgroundColor: GREEN,
    paddingHorizontal: 24,
    paddingVertical: 18,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  headerTitle: { fontSize: 20, fontWeight: "800", color: "#fff" },
  headerSub: { fontSize: 13, color: "rgba(255,255,255,0.8)", marginTop: 2 },
  clearBtn: {
    backgroundColor: "rgba(255,255,255,0.2)",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.4)",
  },
  clearBtnText: { color: "#fff", fontSize: 12, fontWeight: "600" },

  summaryCard: {
    flexDirection: "row",
    backgroundColor: "#fff",
    marginHorizontal: 16,
    marginTop: 14,
    borderRadius: 16,
    padding: 16,
    justifyContent: "space-around",
    alignItems: "center",
    shadowColor: "#000",
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: 3,
  },
  summaryItem: { alignItems: "center", gap: 2 },
  summaryValue: { fontSize: 20, fontWeight: "800", color: GREEN },
  summaryLabel: { fontSize: 11, color: "#888" },
  summaryDivider: { width: 1, height: 36, backgroundColor: "#eee" },

  listWrap: { paddingHorizontal: 16, gap: 10, paddingTop: 6 },
  card: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    borderRadius: 14,
    padding: 14,
    gap: 12,
    shadowColor: "#000",
    shadowOpacity: 0.04,
    shadowRadius: 6,
    elevation: 2,
  },
  cardEmoji: {
    width: 56,
    height: 56,
    backgroundColor: GREEN_LIGHT,
    borderRadius: 14,
    justifyContent: "center",
    alignItems: "center",
  },
  cardCategory: { fontSize: 11, color: GREEN, fontWeight: "700" },
  cardName: { fontSize: 15, fontWeight: "700", color: "#222" },
  cardMeta: { flexDirection: "row", alignItems: "center" },
  cardMetaText: { fontSize: 12, color: "#888" },
  removeBtn: {
    padding: 6,
    borderRadius: 8,
    backgroundColor: "#fff5f5",
  },
  removeBtnText: { fontSize: 18 },

  emptyWrap: {
    alignItems: "center",
    paddingTop: 80,
    gap: 12,
  },
  emptyTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: "#333",
  },
  emptyText: {
    fontSize: 13,
    color: "#aaa",
    textAlign: "center",
    paddingHorizontal: 40,
  },
});