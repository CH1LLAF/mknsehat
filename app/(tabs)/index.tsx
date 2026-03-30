import {
  FlatList,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

// Data menu makanan sehat
const menuData = [
  { id: '1', nama: 'Salad Sayur', kalori: '120 kkal', emoji: '🥗' },
  { id: '2', nama: 'Oatmeal', kalori: '150 kkal', emoji: '🥣' },
  { id: '3', nama: 'Buah Segar', kalori: '80 kkal', emoji: '🍎' },
  { id: '4', nama: 'Sup Ayam', kalori: '200 kkal', emoji: '🍲' },
];

// Data tips kesehatan
const tipsData = [
  { id: '1', tips: 'Minum 8 gelas air putih per hari' },
  { id: '2', tips: 'Makan sayur dan buah setiap hari' },
  { id: '3', tips: 'Hindari makanan tinggi gula' },
  { id: '4', tips: 'Sarapan sebelum jam 9 pagi' },
];

export default function App() {
  // Fungsi untuk menangani tombol
  const handleLihatDetail = () => {
    alert('Fitur detail menu akan segera hadir!');
  };

  // Fungsi untuk merender setiap item menu makanan
  const renderMenuItem = ({ item }: any) => (
    <View style={styles.menuCard}>
      <Text style={styles.menuEmoji}>{item.emoji}</Text>
      <Text style={styles.menuNama}>{item.nama}</Text>
      <Text style={styles.menuKalori}>{item.kalori}</Text>
    </View>
  );

  // Fungsi untuk merender setiap item tips kesehatan
  const renderTipsItem = ({ item }: any) => (
    <View style={styles.tipsItem}>
      <Text style={styles.tipsIcon}>✅</Text>
      <Text style={styles.tipsText}>{item.tips}</Text>
    </View>
  );

  return (
    <ScrollView style={styles.container}>
      {/* Header Aplikasi */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>MakanSehat 🥦</Text>
        <Text style={styles.headerSubtitle}>Panduan Menu Makan Sehat Harian</Text>
      </View>

      {/* Banner Info Kalori */}
      <View style={styles.bannerKalori}>
        <Text style={styles.bannerLabel}>Kebutuhan Kalori Harian Anda</Text>
        <Text style={styles.bannerKaloriAngka}>2.000 kkal</Text>
        <TouchableOpacity style={styles.btnHitung} onPress={handleLihatDetail}>
          <Text style={styles.btnHitungText}>Hitung Ulang</Text>
        </TouchableOpacity>
      </View>

      {/* Section Menu Sehat */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Menu Sehat Hari Ini</Text>
        {/* FlatList untuk menampilkan daftar menu secara horizontal */}
        <FlatList
          data={menuData}
          renderItem={renderMenuItem}
          keyExtractor={(item) => item.id}
          horizontal={true}
          showsHorizontalScrollIndicator={false}
        />
      </View>

      {/* Section Tips Kesehatan */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Tips Kesehatan</Text>
        {/* FlatList untuk menampilkan daftar tips */}
        <FlatList
          data={tipsData}
          renderItem={renderTipsItem}
          keyExtractor={(item) => item.id}
          scrollEnabled={false}
        />
      </View>

      {/* Tombol Mulai */}
      <TouchableOpacity style={styles.btnMulai} onPress={handleLihatDetail}>
        <Text style={styles.btnMulaiText}>Mulai Hidup Sehat 🌿</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9F9F9',
  },
  header: {
    backgroundColor: '#4CAF50',
    padding: 30,
    paddingTop: 50,
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#fff',
  },
  headerSubtitle: {
    fontSize: 14,
    color: '#e0f2e0',
    marginTop: 5,
  },
  bannerKalori: {
    backgroundColor: '#fff',
    margin: 16,
    borderRadius: 12,
    padding: 20,
    alignItems: 'center',
    elevation: 2,
  },
  bannerLabel: {
    fontSize: 14,
    color: '#888',
  },
  bannerKaloriAngka: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#4CAF50',
    marginVertical: 8,
  },
  btnHitung: {
    backgroundColor: '#E8F5E9',
    paddingHorizontal: 20,
    paddingVertical: 8,
    borderRadius: 20,
  },
  btnHitungText: {
    color: '#4CAF50',
    fontWeight: '600',
  },
  section: {
    marginHorizontal: 16,
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
  },
  menuCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginRight: 12,
    alignItems: 'center',
    width: 110,
    elevation: 2,
  },
  menuEmoji: {
    fontSize: 32,
    marginBottom: 6,
  },
  menuNama: {
    fontSize: 13,
    fontWeight: '600',
    color: '#333',
    textAlign: 'center',
  },
  menuKalori: {
    fontSize: 11,
    color: '#888',
    marginTop: 4,
  },
  tipsItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 14,
    borderRadius: 10,
    marginBottom: 8,
    elevation: 1,
  },
  tipsIcon: {
    fontSize: 16,
    marginRight: 10,
  },
  tipsText: {
    fontSize: 14,
    color: '#444',
    flex: 1,
  },
  btnMulai: {
    backgroundColor: '#4CAF50',
    margin: 16,
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
    marginBottom: 30,
  },
  btnMulaiText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});