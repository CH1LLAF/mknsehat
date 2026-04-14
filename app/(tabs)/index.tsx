// app/(tabs)/index.tsx
import { useState } from 'react';
import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import ListMenu from '../../src/components/ListMenu';
import { CategoryList } from '../../src/data/categories';

// ============================================================
// KOMPONEN: ItemCategory
// Menerima PROPS: item, onPress, color
// ============================================================
const ItemCategory = ({
  item,
  onPress,
  color,
}: {
  item: { id: number; categoryName: string };
  onPress: () => void;
  color: string;
}) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <View style={category.item}>
        <Text style={{ ...category.title, color }}>{item.categoryName}</Text>
      </View>
    </TouchableOpacity>
  );
};

// ============================================================
// KOMPONEN: FlatListCategory
// Menyimpan STATE "selected" untuk kategori yang dipilih
// ============================================================
const FlatListCategory = () => {
  // STATE: menyimpan id kategori yang sedang dipilih
  const [selected, setSelected] = useState(1);

  const renderItem = ({ item }: { item: { id: number; categoryName: string } }) => {
    const color = item.id === selected ? '#4CAF50' : '#888';

    return (
      <ItemCategory
        item={item}
        onPress={() => setSelected(item.id)}
        color={color}
      />
    );
  };

  return (
    <FlatList
      data={CategoryList}
      keyExtractor={(item) => item.id.toString()}
      renderItem={(item) => renderItem({ ...item })}
      ItemSeparatorComponent={() => <View style={{ width: 10 }} />}
      contentContainerStyle={{ paddingHorizontal: 16 }}
      horizontal
      showsHorizontalScrollIndicator={false}
    />
  );
};

// ============================================================
// KOMPONEN INDUK: App
// Mengirim PROPS "styles" ke ListMenu
// ============================================================
export default function App() {
  return (
    <SafeAreaView style={styles.container}>

      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.title}>MakanSehat 🥦</Text>
        <Text style={styles.subtitle}>Panduan Menu Sehat Harian</Text>
      </View>

      {/* Banner Kalori */}
      <View style={styles.banner}>
        <Text style={styles.bannerLabel}>Kebutuhan Kalori Harian Anda</Text>
        <Text style={styles.bannerKalori}>2.000 kkal</Text>
      </View>

      {/* Kategori - punya STATE sendiri di dalam FlatListCategory */}
      <View style={styles.listCategory}>
        <FlatListCategory />
      </View>

      {/* ListMenu menerima PROPS styles dari sini */}
      <ListMenu styles={styles} />

    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F4F9F4',
  },
  header: {
    backgroundColor: '#4CAF50',
    paddingHorizontal: 20,
    paddingVertical: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
  },
  subtitle: {
    fontSize: 13,
    color: '#e0f2e0',
    marginTop: 2,
  },
  banner: {
    backgroundColor: '#fff',
    marginHorizontal: 16,
    marginTop: 12,
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    elevation: 2,
  },
  bannerLabel: {
    fontSize: 13,
    color: '#888',
  },
  bannerKalori: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#4CAF50',
    marginTop: 4,
  },
  listCategory: {
    paddingVertical: 12,
  },
  listMenu: {
    paddingVertical: 8,
    gap: 10,
  },
  listCard: {
    paddingVertical: 6,
    gap: 4,
  },
});

const category = StyleSheet.create({
  item: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.05)',
  },
  title: {
    fontSize: 14,
    fontWeight: '600',
    color: '#888',
  },
});