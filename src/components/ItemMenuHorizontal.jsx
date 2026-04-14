// src/components/ItemMenuHorizontal.jsx
// Komponen anak untuk tampilan horizontal (menu unggulan)
// Props: item, isFavorit, onPress

import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const ItemMenuHorizontal = ({ item, isFavorit, onPress }) => {
  return (
    <View style={styles.card}>
      {/* Latar belakang warna */}
      <View style={styles.emojiBg}>
        <Text style={styles.emoji}>{item.emoji}</Text>
      </View>

      {/* Tombol favorit - PROPS: isFavorit & onPress */}
      <TouchableOpacity onPress={onPress} style={styles.btnFavorit}>
        <Text style={{ fontSize: 18 }}>
          {isFavorit ? '❤️' : '🤍'}
        </Text>
      </TouchableOpacity>

      {/* Info menu - semua dari PROPS item */}
      <Text style={styles.kategori}>{item.kategori}</Text>
      <Text style={styles.nama} numberOfLines={2}>{item.nama}</Text>
      <Text style={styles.kalori}>🔥 {item.kalori} kkal</Text>
    </View>
  );
};

export default ItemMenuHorizontal;

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 14,
    width: 150,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  emojiBg: {
    backgroundColor: '#E8F5E9',
    borderRadius: 12,
    width: 60,
    height: 60,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 8,
  },
  emoji: {
    fontSize: 34,
  },
  btnFavorit: {
    position: 'absolute',
    top: 10,
    right: 10,
  },
  kategori: {
    fontSize: 10,
    color: '#4CAF50',
    fontWeight: '600',
    marginBottom: 2,
  },
  nama: {
    fontSize: 13,
    fontWeight: 'bold',
    color: '#222',
    marginBottom: 6,
  },
  kalori: {
    fontSize: 11,
    color: '#888',
  },
});