// src/components/ItemMenu.jsx
// Komponen card menu horizontal (list) — bisa diklik → ke MenuDetail
import React from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { useRouter } from "expo-router";

const ItemMenu = ({ item }) => {
  const router = useRouter();

  const handlePress = () => {
    // Navigate ke stack screen menu-detail dengan parameter menuId
    router.push({
      pathname: "/menu-detail",
      params: { menuId: item.id },
    });
  };

  return (
    <TouchableOpacity style={styles.cardItem} onPress={handlePress} activeOpacity={0.8}>
      {/* Emoji / Gambar */}
      <View style={styles.imageWrap}>
        <Text style={{ fontSize: 32 }}>{item.emoji}</Text>
      </View>

      {/* Info */}
      <View style={{ flex: 1, gap: 3 }}>
        <Text style={styles.category}>{item.category}</Text>
        <Text style={styles.name}>{item.name}</Text>
        <View style={styles.metaRow}>
          <Text style={styles.metaText}>🔥 {item.kalori} kkal</Text>
          <Text style={styles.metaText}>  📅 {item.savedAt}</Text>
          <Text style={styles.metaText}>  ❤️ {item.likes}</Text>
        </View>
      </View>

      {/* Bookmark icon */}
      <TouchableOpacity style={styles.bookmarkIcon}>
        <Text style={{ fontSize: 18, color: "#ccc" }}>🤍</Text>
      </TouchableOpacity>
    </TouchableOpacity>
  );
};

export default ItemMenu;

const GREEN = "#3a8c34";
const GREEN_LIGHT = "#e8f5e2";

const styles = StyleSheet.create({
  cardItem: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    borderRadius: 14,
    padding: 14,
    gap: 12,
    marginBottom: 10,
    shadowColor: "#000",
    shadowOpacity: 0.04,
    shadowRadius: 6,
    elevation: 2,
  },
  imageWrap: {
    width: 58,
    height: 58,
    backgroundColor: GREEN_LIGHT,
    borderRadius: 14,
    justifyContent: "center",
    alignItems: "center",
  },
  category: { fontSize: 11, color: GREEN, fontWeight: "700" },
  name: { fontSize: 15, fontWeight: "700", color: "#222" },
  metaRow: { flexDirection: "row", flexWrap: "wrap" },
  metaText: { fontSize: 11, color: "#888" },
  bookmarkIcon: { padding: 4 },
});