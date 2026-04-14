// src/components/ItemMenu.jsx
// Komponen anak yang menerima PROPS dari ListMenu
// Props: item, isFavorit, onPress

import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const ItemMenu = ({ item, isFavorit, onPress }) => {
  return (
    <View style={styles.card}>
      {/* Emoji makanan - berasal dari PROPS item */}
      <Text style={styles.emoji}>{item.emoji}</Text>

      <View style={styles.info}>
        {/* Nama kategori - berasal dari PROPS item */}
        <Text style={styles.kategori}>{item.kategori}</Text>

        {/* Nama menu - berasal dari PROPS item */}
        <Text style={styles.nama}>{item.nama}</Text>

        <View style={styles.footer}>
          <Text style={styles.kalori}>🔥 {item.kalori} kkal</Text>
          <Text style={styles.tanggal}>📅 {item.createdAt}</Text>
          <Text style={styles.suka}>❤️ {item.totalSuka}</Text>
        </View>
      </View>

      {/* Tombol favorit - menggunakan PROPS isFavorit & onPress */}
      <TouchableOpacity onPress={onPress} style={styles.btnFavorit}>
        <Text style={{ fontSize: 22 }}>
          {isFavorit ? '❤️' : '🤍'}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default ItemMenu;

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 14,
    marginHorizontal: 16,
    marginVertical: 6,
    flexDirection: 'row',
    alignItems: 'center',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
  },
  emoji: {
    fontSize: 40,
    marginRight: 12,
  },
  info: {
    flex: 1,
    gap: 4,
  },
  kategori: {
    fontSize: 11,
    color: '#4CAF50',
    fontWeight: '600',
  },
  nama: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#222',
  },
  footer: {
    flexDirection: 'row',
    gap: 10,
    marginTop: 4,
  },
  kalori: {
    fontSize: 11,
    color: '#888',
  },
  tanggal: {
    fontSize: 11,
    color: '#888',
  },
  suka: {
    fontSize: 11,
    color: '#888',
  },
  btnFavorit: {
    padding: 6,
  },
});