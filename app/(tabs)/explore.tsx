import React, { useState, useRef } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Animated,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

// ─── Data ─────────────────────────────────────────────────────────────────────
const categories = [
  { id: 0, label: "Semua" },
  { id: 1, label: "Sarapan" },
  { id: 2, label: "Makan Siang" },
  { id: 3, label: "Makan Malam" },
  { id: 4, label: "Cemilan" },
  { id: 5, label: "Minuman" },
];

const allMenus = [
  { id: 1,  emoji: "🥗", name: "Salad Sayur Segar",  kategori: "Makan Siang",  kalori: 120 },
  { id: 2,  emoji: "🥣", name: "Oatmeal Pisang",     kategori: "Sarapan",      kalori: 150 },
  { id: 3,  emoji: "🍎", name: "Buah Segar Mix",     kategori: "Cemilan",      kalori: 80  },
  { id: 4,  emoji: "🍲", name: "Sup Ayam Bening",    kategori: "Makan Malam",  kalori: 200 },
  { id: 5,  emoji: "🥤", name: "Smoothie Alpukat",   kategori: "Minuman",      kalori: 160 },
  { id: 6,  emoji: "🍚", name: "Nasi Merah Tempe",   kategori: "Makan Siang",  kalori: 310 },
  { id: 7,  emoji: "🥚", name: "Telur Rebus",        kategori: "Sarapan",      kalori: 78  },
  { id: 8,  emoji: "🧆", name: "Tahu Kukus",         kategori: "Makan Malam",  kalori: 95  },
];

const recentSearches = ["Salad", "Ayam", "Smoothie", "Oatmeal"];

const HEADER_HEIGHT = 100; // tinggi search bar
const RECENT_HEIGHT = 110; // tinggi panel recent + kategori

const SearchResultItem = ({ item }: { item: typeof allMenus[0] }) => (
  <View style={styles.resultCard}>
    <View style={styles.resultEmoji}>
      <Text style={{ fontSize: 28 }}>{item.emoji}</Text>
    </View>
    <View style={{ flex: 1 }}>
      <Text style={styles.resultCategory}>{item.kategori}</Text>
      <Text style={styles.resultName}>{item.name}</Text>
      <Text style={styles.resultKalori}>🔥 {item.kalori} kkal</Text>
    </View>
    <TouchableOpacity style={styles.addBtn}>
      <Text style={styles.addBtnText}>+</Text>
    </TouchableOpacity>
  </View>
);

export default function Discover() {
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState(0);

  // ── Animated ────────────────────────────────────────────────────────────────
  const scrollY = useRef(new Animated.Value(0)).current;

  const diffClampY = Animated.diffClamp(scrollY, 0, RECENT_HEIGHT);

  // Panel recent search geser ke atas saat scroll turun
  const recentY = diffClampY.interpolate({
    inputRange: [0, RECENT_HEIGHT],
    outputRange: [0, -RECENT_HEIGHT],
    extrapolate: "clamp",
  });

  const filtered = allMenus.filter((item) => {
    const matchSearch = item.name.toLowerCase().includes(search.toLowerCase());
    const matchCat =
      activeCategory === 0 || item.kategori === categories[activeCategory]?.label;
    return matchSearch && matchCat;
  });

  return (
    <SafeAreaView style={styles.container}>

      {/* Header search — posisi absolute, tidak scroll */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Temukan Menu Sehat 🔍</Text>
        <View style={styles.searchWrap}>
          <Text style={{ fontSize: 14 }}>🔍</Text>
          <TextInput
            style={styles.searchInput}
            placeholder="Cari nama menu..."
            placeholderTextColor="#aaa"
            value={search}
            onChangeText={setSearch}
          />
          {search.length > 0 && (
            <TouchableOpacity onPress={() => setSearch("")}>
              <Text style={{ fontSize: 14, color: "#aaa" }}>✕</Text>
            </TouchableOpacity>
          )}
        </View>
      </View>

      {/* Panel recent search + kategori — slide up saat scroll */}
      <Animated.View
        style={[styles.recentPanel, { transform: [{ translateY: recentY }] }]}
      >
        <View style={styles.recentRow}>
          <Text style={styles.recentLabel}>Terakhir:</Text>
          {recentSearches.map((r, i) => (
            <TouchableOpacity key={i} style={styles.recentChip} onPress={() => setSearch(r)}>
              <Text style={styles.recentText}>🕐 {r}</Text>
            </TouchableOpacity>
          ))}
        </View>

        <Animated.ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.catRow}
        >
          {categories.map((cat) => (
            <TouchableOpacity
              key={cat.id}
              style={[styles.catChip, activeCategory === cat.id && styles.catChipActive]}
              onPress={() => setActiveCategory(cat.id)}
            >
              <Text style={[styles.catText, activeCategory === cat.id && styles.catTextActive]}>
                {cat.label}
              </Text>
            </TouchableOpacity>
          ))}
        </Animated.ScrollView>
      </Animated.View>

      {/* List hasil scroll */}
      <Animated.ScrollView
        showsVerticalScrollIndicator={false}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { y: scrollY } } }],
          { useNativeDriver: true }
        )}
        scrollEventThrottle={16}
        contentContainerStyle={{
          paddingTop: HEADER_HEIGHT + RECENT_HEIGHT + 8,
          paddingHorizontal: 16,
          paddingBottom: 30,
        }}
      >
        <Text style={styles.sectionTitle}>
          {search.length > 0 ? `Hasil "${search}"` : "Semua Menu"}
          {"  "}
          <Text style={styles.countText}>{filtered.length} menu</Text>
        </Text>

        {filtered.length === 0 ? (
          <View style={styles.emptyWrap}>
            <Text style={{ fontSize: 40 }}>🥺</Text>
            <Text style={styles.emptyText}>Menu tidak ditemukan</Text>
          </View>
        ) : (
          filtered.map((item) => <SearchResultItem key={item.id} item={item} />)
        )}
      </Animated.ScrollView>
    </SafeAreaView>
  );
}

const GREEN = "#3a8c34";
const GREEN_LIGHT = "#e8f5e2";

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#f5f7f0" },

  // Header absolute
  header: {
    position: "absolute",
    top: 0, left: 0, right: 0,
    zIndex: 1000,
    backgroundColor: GREEN,
    paddingHorizontal: 16,
    paddingTop: 12,
    paddingBottom: 10,
    height: HEADER_HEIGHT,
  },
  headerTitle: { color: "#fff", fontWeight: "800", fontSize: 15, marginBottom: 8 },
  searchWrap: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 7,
    gap: 8,
  },
  searchInput: { flex: 1, fontSize: 13, color: "#333" },

  // Panel animasi
  recentPanel: {
    position: "absolute",
    top: HEADER_HEIGHT,
    left: 0, right: 0,
    zIndex: 999,
    backgroundColor: "#fff",
    elevation: 4,
    shadowColor: "#000",
    shadowOpacity: 0.07,
    shadowRadius: 6,
    height: RECENT_HEIGHT,
    paddingTop: 8,
  },
  recentRow: {
    flexDirection: "row",
    alignItems: "center",
    flexWrap: "wrap",
    paddingHorizontal: 14,
    gap: 6,
    marginBottom: 8,
  },
  recentLabel: { fontSize: 11, color: "#888", fontWeight: "600" },
  recentChip: {
    backgroundColor: GREEN_LIGHT,
    borderRadius: 20,
    paddingHorizontal: 10,
    paddingVertical: 4,
  },
  recentText: { fontSize: 12, color: GREEN },

  catRow: { paddingHorizontal: 14, gap: 8, alignItems: "center" },
  catChip: {
    paddingHorizontal: 14, paddingVertical: 6,
    borderRadius: 20, backgroundColor: "#f0f0f0",
    borderWidth: 1, borderColor: "#e0e0e0",
  },
  catChipActive: { backgroundColor: GREEN, borderColor: GREEN },
  catText: { fontSize: 12, color: "#555", fontWeight: "500" },
  catTextActive: { color: "#fff", fontWeight: "700" },

  sectionTitle: { fontSize: 15, fontWeight: "700", color: "#222", marginBottom: 12 },
  countText: { fontWeight: "400", fontSize: 13, color: "#888" },

  resultCard: {
    flexDirection: "row", alignItems: "center",
    backgroundColor: "#fff", borderRadius: 14,
    padding: 14, marginBottom: 10, gap: 12,
    shadowColor: "#000", shadowOpacity: 0.04, shadowRadius: 6, elevation: 2,
  },
  resultEmoji: {
    width: 52, height: 52, backgroundColor: GREEN_LIGHT,
    borderRadius: 12, justifyContent: "center", alignItems: "center",
  },
  resultCategory: { fontSize: 11, color: GREEN, fontWeight: "700", marginBottom: 2 },
  resultName: { fontSize: 15, fontWeight: "700", color: "#222", marginBottom: 2 },
  resultKalori: { fontSize: 12, color: "#888" },
  addBtn: {
    width: 32, height: 32, borderRadius: 16,
    backgroundColor: GREEN_LIGHT, justifyContent: "center", alignItems: "center",
  },
  addBtnText: { fontSize: 20, color: GREEN, fontWeight: "700", lineHeight: 22 },

  emptyWrap: { alignItems: "center", paddingVertical: 40, gap: 10 },
  emptyText: { fontSize: 15, color: "#aaa" },
});