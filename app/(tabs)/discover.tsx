import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TextInput,
  TouchableOpacity,
  FlatList,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

// ─── Data dummy (sesuaikan dengan data kamu di src/data/menus.js) ─────────────
const categories = [
  { id: 0, label: "Semua" },
  { id: 1, label: "Sarapan" },
  { id: 2, label: "Makan Siang" },
  { id: 3, label: "Makan Malam" },
  { id: 4, label: "Cemilan" },
  { id: 5, label: "Minuman" },
];

const allMenus = [
  { id: 1, emoji: "🥣", name: "Oatmeal Pisang", category: "Sarapan", kalori: 150 },
  { id: 2, emoji: "🍎", name: "Buah Segar Mix", category: "Cemilan", kalori: 80 },
  { id: 3, emoji: "🍲", name: "Sup Ayam Bening", category: "Makan Malam", kalori: 200 },
  { id: 4, emoji: "🥤", name: "Smoothie Alpukat", category: "Minuman", kalori: 160 },
  { id: 5, emoji: "🍚", name: "Nasi Merah Tempe", category: "Makan Siang", kalori: 310 },
  { id: 6, emoji: "🥚", name: "Telur Rebus", category: "Sarapan", kalori: 78 },
  { id: 7, emoji: "🥦", name: "Tumis Brokoli", category: "Makan Siang", kalori: 120 },
  { id: 8, emoji: "🫐", name: "Smoothie Berry", category: "Minuman", kalori: 130 },
  { id: 9, emoji: "🍗", name: "Ayam Panggang", category: "Makan Malam", kalori: 250 },
  { id: 10, emoji: "🥗", name: "Salad Sayur", category: "Cemilan", kalori: 60 },
];

const recentSearches = ["Salad", "Ayam", "Smoothie", "Oatmeal"];

// ─── Komponen kartu hasil pencarian ──────────────────────────────────────────
const SearchResultItem = ({ item }: { item: typeof allMenus[0] }) => (
  <View style={styles.resultCard}>
    <View style={styles.resultEmoji}>
      <Text style={{ fontSize: 28 }}>{item.emoji}</Text>
    </View>
    <View style={{ flex: 1 }}>
      <Text style={styles.resultCategory}>{item.category}</Text>
      <Text style={styles.resultName}>{item.name}</Text>
      <Text style={styles.resultKalori}>🔥 {item.kalori} kkal</Text>
    </View>
    <TouchableOpacity style={styles.addBtn}>
      <Text style={styles.addBtnText}>+</Text>
    </TouchableOpacity>
  </View>
);

// ─── Screen utama ─────────────────────────────────────────────────────────────
export default function Discover() {
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState(0);

  const filtered = allMenus.filter((item) => {
    const matchSearch = item.name.toLowerCase().includes(search.toLowerCase());
    const matchCat =
      activeCategory === 0 || item.category === categories[activeCategory]?.label;
    return matchSearch && matchCat;
  });

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Temukan Menu</Text>
        <Text style={styles.headerSub}>Cari makanan sehat untukmu</Text>
      </View>

      {/* Search Bar */}
      <View style={styles.searchWrap}>
        <Text style={styles.searchIcon}>🔍</Text>
        <TextInput
          style={styles.searchInput}
          placeholder="Cari nama menu..."
          placeholderTextColor="#aaa"
          value={search}
          onChangeText={setSearch}
        />
        {search.length > 0 && (
          <TouchableOpacity onPress={() => setSearch("")}>
            <Text style={{ fontSize: 16, color: "#aaa" }}>✕</Text>
          </TouchableOpacity>
        )}
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Recent Searches */}
        {search.length === 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Pencarian Terakhir</Text>
            <View style={styles.recentWrap}>
              {recentSearches.map((r, i) => (
                <TouchableOpacity
                  key={i}
                  style={styles.recentChip}
                  onPress={() => setSearch(r)}
                >
                  <Text style={styles.recentText}>🕐 {r}</Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        )}

        {/* Filter Kategori */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Kategori</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            <View style={styles.catRow}>
              {categories.map((cat) => (
                <TouchableOpacity
                  key={cat.id}
                  style={[
                    styles.catChip,
                    activeCategory === cat.id && styles.catChipActive,
                  ]}
                  onPress={() => setActiveCategory(cat.id)}
                >
                  <Text
                    style={[
                      styles.catText,
                      activeCategory === cat.id && styles.catTextActive,
                    ]}
                  >
                    {cat.label}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </ScrollView>
        </View>

        {/* Hasil */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>
            {search.length > 0 ? `Hasil "${search}"` : "Semua Menu"}
            <Text style={styles.countText}>  {filtered.length} menu</Text>
          </Text>
          {filtered.length === 0 ? (
            <View style={styles.emptyWrap}>
              <Text style={{ fontSize: 40 }}>🥺</Text>
              <Text style={styles.emptyText}>Menu tidak ditemukan</Text>
            </View>
          ) : (
            filtered.map((item) => <SearchResultItem key={item.id} item={item} />)
          )}
        </View>
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
  },
  headerTitle: { fontSize: 22, fontWeight: "800", color: "#fff" },
  headerSub: { fontSize: 13, color: "rgba(255,255,255,0.8)", marginTop: 2 },

  searchWrap: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    marginHorizontal: 16,
    marginTop: 14,
    marginBottom: 4,
    borderRadius: 14,
    paddingHorizontal: 14,
    paddingVertical: 10,
    gap: 10,
    shadowColor: "#000",
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: 3,
  },
  searchIcon: { fontSize: 16 },
  searchInput: { flex: 1, fontSize: 14, color: "#333" },

  section: { paddingHorizontal: 16, marginTop: 18 },
  sectionTitle: {
    fontSize: 15,
    fontWeight: "700",
    color: "#222",
    marginBottom: 10,
  },
  countText: { fontWeight: "400", fontSize: 13, color: "#888" },

  recentWrap: { flexDirection: "row", flexWrap: "wrap", gap: 8 },
  recentChip: {
    backgroundColor: "#fff",
    borderRadius: 20,
    paddingHorizontal: 14,
    paddingVertical: 7,
    borderWidth: 1,
    borderColor: "#e0e0e0",
  },
  recentText: { fontSize: 13, color: "#555" },

  catRow: { flexDirection: "row", gap: 8, paddingBottom: 4 },
  catChip: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#ddd",
  },
  catChipActive: { backgroundColor: GREEN, borderColor: GREEN },
  catText: { fontSize: 13, color: "#555", fontWeight: "500" },
  catTextActive: { color: "#fff", fontWeight: "700" },

  resultCard: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    borderRadius: 14,
    padding: 14,
    marginBottom: 10,
    gap: 12,
    shadowColor: "#000",
    shadowOpacity: 0.04,
    shadowRadius: 6,
    elevation: 2,
  },
  resultEmoji: {
    width: 52,
    height: 52,
    backgroundColor: GREEN_LIGHT,
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
  },
  resultCategory: { fontSize: 11, color: GREEN, fontWeight: "700", marginBottom: 2 },
  resultName: { fontSize: 15, fontWeight: "700", color: "#222", marginBottom: 2 },
  resultKalori: { fontSize: 12, color: "#888" },
  addBtn: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: GREEN_LIGHT,
    justifyContent: "center",
    alignItems: "center",
  },
  addBtnText: { fontSize: 20, color: GREEN, fontWeight: "700", lineHeight: 22 },

  emptyWrap: { alignItems: "center", paddingVertical: 40, gap: 10 },
  emptyText: { fontSize: 15, color: "#aaa" },
});