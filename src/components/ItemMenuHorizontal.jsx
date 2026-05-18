// src/components/ItemMenuHorizontal.jsx
// Komponen card menu vertikal (grid/horizontal scroll) — bisa diklik → ke MenuDetail
import React from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { useRouter } from "expo-router";

const ItemMenuHorizontal = ({ item }) => {
  const router = useRouter();

  const handlePress = () => {
    router.push({
      pathname: "/menu-detail",
      params: { menuId: item.id },
    });
  };

  return (
    <TouchableOpacity style={styles.card} onPress={handlePress} activeOpacity={0.8}>
      {/* Bookmark badge */}
      <TouchableOpacity style={styles.heartBtn}>
        <Text style={{ fontSize: 16 }}>🤍</Text>
      </TouchableOpacity>

      {/* Emoji */}
      <View style={styles.emojiWrap}>
        <Text style={{ fontSize: 36 }}>{item.emoji}</Text>
      </View>

      {/* Info */}
      <Text style={styles.category}>{item.category}</Text>
      <Text style={styles.name} numberOfLines={2}>{item.name}</Text>
      <Text style={styles.kalori}>🔥 {item.kalori} kkal</Text>
    </TouchableOpacity>
  );
};

export default ItemMenuHorizontal;

const GREEN = "#3a8c34";
const GREEN_LIGHT = "#e8f5e2";

const styles = StyleSheet.create({
  card: {
    width: 140,
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 14,
    marginRight: 10,
    gap: 4,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 3,
    position: "relative",
  },
  heartBtn: {
    position: "absolute",
    top: 10,
    right: 10,
    zIndex: 10,
  },
  emojiWrap: {
    width: 56,
    height: 56,
    backgroundColor: GREEN_LIGHT,
    borderRadius: 14,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 6,
  },
  category: { fontSize: 10, color: GREEN, fontWeight: "700" },
  name: { fontSize: 13, fontWeight: "700", color: "#222", lineHeight: 18 },
  kalori: { fontSize: 11, color: "#888", marginTop: 2 },
});