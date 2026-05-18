import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useLocalSearchParams, useRouter } from "expo-router";
import { MenuList } from "../src/data/menus"; // ← import data asli kamu

// ─── Data tambahan (detail) yang tidak ada di menus.js ───────────────────────
const MenuDetail_Extra = {
  1: {
    waktuMasak: "10 menit",
    porsi: "1 porsi",
    deskripsi:
      "Salad sayur segar penuh warna yang kaya vitamin, mineral, dan serat. Cocok sebagai menu makan siang ringan yang menyehatkan dan menyegarkan.",
    bahan: [
      "100g selada segar",
      "1 buah tomat, potong",
      "1/2 buah mentimun, iris",
      "5 buah zaitun hitam",
      "2 sdm olive oil",
      "1 sdm perasan lemon",
      "Garam dan merica secukupnya",
    ],
    langkah: [
      "Cuci semua sayuran hingga bersih, tiriskan.",
      "Sobek selada menjadi ukuran sekali gigit.",
      "Potong tomat dan mentimun sesuai selera.",
      "Campur semua sayuran dalam mangkuk.",
      "Siram dengan olive oil dan perasan lemon.",
      "Tambahkan garam dan merica, aduk rata, sajikan.",
    ],
    nutrisi: { protein: 3, karbohidrat: 14, lemak: 6, serat: 5 },
  },
  2: {
    waktuMasak: "10 menit",
    porsi: "1 porsi",
    deskripsi:
      "Oatmeal pisang adalah sarapan sehat yang kaya serat dan karbohidrat kompleks. Sangat cocok untuk memulai hari dengan energi penuh tanpa rasa berat di perut.",
    bahan: [
      "50g oatmeal instan",
      "1 buah pisang matang",
      "200ml susu rendah lemak",
      "1 sdm madu",
      "Sejumput kayu manis",
    ],
    langkah: [
      "Masak oatmeal dengan susu selama 3-5 menit sambil diaduk.",
      "Iris pisang dan siapkan di atas mangkuk.",
      "Tuang oatmeal yang sudah matang ke dalam mangkuk.",
      "Tambahkan madu dan tabur kayu manis di atasnya.",
      "Sajikan selagi hangat.",
    ],
    nutrisi: { protein: 6, karbohidrat: 28, lemak: 3, serat: 4 },
  },
  3: {
    waktuMasak: "5 menit",
    porsi: "1 porsi",
    deskripsi:
      "Camilan segar dari berbagai buah-buahan pilihan. Kaya vitamin dan antioksidan, rendah kalori, dan sangat menyegarkan sebagai cemilan di siang hari.",
    bahan: [
      "1/2 buah apel, potong dadu",
      "5 butir anggur",
      "1/4 buah melon, potong dadu",
      "5 buah stroberi",
      "Perasan air jeruk nipis",
    ],
    langkah: [
      "Cuci semua buah hingga bersih.",
      "Potong buah sesuai selera.",
      "Susun dalam mangkuk atau wadah.",
      "Peras air jeruk nipis di atasnya.",
      "Sajikan segera atau simpan di kulkas.",
    ],
    nutrisi: { protein: 1, karbohidrat: 20, lemak: 0, serat: 3 },
  },
  4: {
    waktuMasak: "30 menit",
    porsi: "2 porsi",
    deskripsi:
      "Sup ayam bening yang hangat dan bergizi. Kuah bening dengan potongan ayam tanpa kulit yang lembut, sayuran segar, dan bumbu alami tanpa MSG.",
    bahan: [
      "200g dada ayam tanpa kulit",
      "2 buah wortel, potong bulat",
      "100g buncis, potong 3cm",
      "3 siung bawang putih",
      "2 cm jahe",
      "Garam dan merica secukupnya",
      "1L air",
    ],
    langkah: [
      "Rebus ayam bersama bawang putih dan jahe hingga empuk.",
      "Angkat ayam, suwir kasar, lalu masukkan kembali ke kaldu.",
      "Masukkan wortel dan buncis ke dalam kaldu.",
      "Masak hingga sayuran matang, sekitar 10 menit.",
      "Bumbui dengan garam dan merica.",
      "Sajikan hangat.",
    ],
    nutrisi: { protein: 22, karbohidrat: 12, lemak: 4, serat: 3 },
  },
  5: {
    waktuMasak: "5 menit",
    porsi: "1 gelas",
    deskripsi:
      "Smoothie alpukat yang creamy dan lezat. Mengandung lemak sehat, vitamin E, dan kalium yang baik untuk jantung dan kulit.",
    bahan: [
      "1/2 buah alpukat matang",
      "150ml susu almond",
      "1 sdm madu",
      "Es batu secukupnya",
      "Sejumput garam",
    ],
    langkah: [
      "Keruk daging alpukat.",
      "Masukkan semua bahan ke blender.",
      "Blender hingga halus dan creamy.",
      "Tuang ke gelas dan sajikan segera.",
    ],
    nutrisi: { protein: 3, karbohidrat: 18, lemak: 10, serat: 5 },
  },
  6: {
    waktuMasak: "35 menit",
    porsi: "1 porsi",
    deskripsi:
      "Nasi merah yang kaya serat dipadukan dengan tempe bacem yang gurih. Pilihan makan siang sehat dan mengenyangkan dengan protein nabati tinggi.",
    bahan: [
      "100g nasi merah",
      "100g tempe, potong kotak",
      "2 sdm kecap manis",
      "1 siung bawang putih",
      "1/2 sdt ketumbar",
      "Garam secukupnya",
      "Minyak untuk menumis",
    ],
    langkah: [
      "Masak nasi merah seperti biasa.",
      "Tumis bawang putih hingga harum.",
      "Masukkan tempe, tambahkan kecap dan ketumbar.",
      "Masak hingga tempe menyerap bumbu.",
      "Sajikan tempe bersama nasi merah.",
    ],
    nutrisi: { protein: 18, karbohidrat: 45, lemak: 8, serat: 6 },
  },
  7: {
    waktuMasak: "12 menit",
    porsi: "1 porsi",
    deskripsi:
      "Telur rebus adalah sumber protein terbaik dengan cara memasak paling sehat. Kaya protein dan nutrisi esensial untuk memulai hari.",
    bahan: [
      "2 butir telur ayam",
      "Air secukupnya untuk merebus",
      "Sejumput garam",
    ],
    langkah: [
      "Didihkan air dalam panci.",
      "Masukkan telur dengan hati-hati ke dalam air mendidih.",
      "Rebus selama 10 menit untuk telur matang sempurna.",
      "Angkat dan rendam dalam air dingin selama 2 menit.",
      "Kupas dan sajikan.",
    ],
    nutrisi: { protein: 12, karbohidrat: 1, lemak: 5, serat: 0 },
  },
  8: {
    waktuMasak: "20 menit",
    porsi: "1 porsi",
    deskripsi:
      "Tahu kukus yang lembut dan rendah kalori. Dimasak tanpa minyak sehingga sangat cocok untuk diet sehat. Kaya protein nabati dan mudah dicerna.",
    bahan: [
      "150g tahu putih",
      "1 sdm kecap asin rendah sodium",
      "1 sdt minyak wijen",
      "1 cm jahe, parut",
      "Daun bawang untuk taburan",
    ],
    langkah: [
      "Potong tahu menjadi beberapa bagian.",
      "Siapkan kukusan, panaskan airnya.",
      "Susun tahu di atas piring tahan panas.",
      "Tuang campuran kecap, minyak wijen, dan jahe di atas tahu.",
      "Kukus selama 15 menit.",
      "Taburi daun bawang dan sajikan.",
    ],
    nutrisi: { protein: 10, karbohidrat: 4, lemak: 2, serat: 1 },
  },
};

// ─── Komponen nutrisi bar ─────────────────────────────────────────────────────
const NutrisiBar = ({
  label,
  value,
  max,
  color,
}: {
  label: string;
  value: number;
  max: number;
  color: string;
}) => (
  <View style={styles.nutrisiRow}>
    <Text style={styles.nutrisiLabel}>{label}</Text>
    <View style={styles.barBg}>
      <View
        style={[
          styles.barFill,
          { width: `${Math.min((value / max) * 100, 100)}%`, backgroundColor: color },
        ]}
      />
    </View>
    <Text style={styles.nutrisiValue}>{value}g</Text>
  </View>
);

// ─── Screen utama ─────────────────────────────────────────────────────────────
export default function MenuDetailScreen() {
  const { menuId } = useLocalSearchParams<{ menuId: string }>();
  const router = useRouter();
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [isLiked, setIsLiked] = useState(false);

  // id di MenuList adalah number, params dari router selalu string → konversi
  const menu = MenuList.find((m) => m.id === Number(menuId));
  const extra = MenuDetail_Extra[Number(menuId) as keyof typeof MenuDetail_Extra];

  if (!menu || !extra) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={{ flex: 1, justifyContent: "center", alignItems: "center", gap: 12 }}>
          <Text style={{ fontSize: 40 }}>😕</Text>
          <Text style={{ color: "#888" }}>Menu tidak ditemukan</Text>
          <TouchableOpacity style={styles.backBtnFallback} onPress={() => router.back()}>
            <Text style={{ color: "#fff", fontWeight: "700" }}>Kembali</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backBtn} onPress={() => router.back()}>
          <Text style={styles.backArrow}>←</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Detail Menu</Text>
        <TouchableOpacity
          style={styles.bookmarkBtn}
          onPress={() => setIsBookmarked(!isBookmarked)}
        >
          <Text style={{ fontSize: 20 }}>{isBookmarked ? "🔖" : "🏷️"}</Text>
        </TouchableOpacity>
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Hero */}
        <View style={styles.hero}>
          <View style={styles.heroEmoji}>
            <Text style={{ fontSize: 80 }}>{menu.emoji}</Text>
          </View>
          <View style={styles.heroBadge}>
            <Text style={styles.heroBadgeText}>{menu.kategori}</Text>
          </View>
        </View>

        <View style={styles.body}>
          {/* Judul & meta */}
          <Text style={styles.menuName}>{menu.name}</Text>
          <View style={styles.metaRow}>
            <View style={styles.metaChip}>
              <Text style={styles.metaText}>🔥 {menu.kalori} kkal</Text>
            </View>
            <View style={styles.metaChip}>
              <Text style={styles.metaText}>⏱️ {extra.waktuMasak}</Text>
            </View>
            <View style={styles.metaChip}>
              <Text style={styles.metaText}>🍽️ {extra.porsi}</Text>
            </View>
          </View>

          {/* Like */}
          <TouchableOpacity
            style={styles.likeRow}
            onPress={() => setIsLiked(!isLiked)}
          >
            <Text style={{ fontSize: 20 }}>{isLiked ? "❤️" : "🤍"}</Text>
            <Text style={styles.likeText}>
              {isLiked ? menu.totalSuka + 1 : menu.totalSuka} orang menyukai ini
            </Text>
          </TouchableOpacity>

          {/* Deskripsi */}
          <View style={styles.card}>
            <Text style={styles.cardTitle}>📝 Deskripsi</Text>
            <Text style={styles.desc}>{extra.deskripsi}</Text>
          </View>

          {/* Bahan */}
          <View style={styles.card}>
            <Text style={styles.cardTitle}>🛒 Bahan-bahan</Text>
            {extra.bahan.map((b, i) => (
              <View key={i} style={styles.bahanRow}>
                <View style={styles.bahanDot} />
                <Text style={styles.bahanText}>{b}</Text>
              </View>
            ))}
          </View>

          {/* Langkah */}
          <View style={styles.card}>
            <Text style={styles.cardTitle}>👨‍🍳 Cara Membuat</Text>
            {extra.langkah.map((l, i) => (
              <View key={i} style={styles.langkahRow}>
                <View style={styles.langkahNum}>
                  <Text style={styles.langkahNumText}>{i + 1}</Text>
                </View>
                <Text style={styles.langkahText}>{l}</Text>
              </View>
            ))}
          </View>

          {/* Nutrisi */}
          <View style={styles.card}>
            <Text style={styles.cardTitle}>📊 Nilai Nutrisi</Text>
            <NutrisiBar label="Protein"  value={extra.nutrisi.protein}      max={50}  color="#3a8c34" />
            <NutrisiBar label="Karbo"    value={extra.nutrisi.karbohidrat}  max={100} color="#f5a623" />
            <NutrisiBar label="Lemak"    value={extra.nutrisi.lemak}         max={70}  color="#e05252" />
            <NutrisiBar label="Serat"    value={extra.nutrisi.serat}         max={30}  color="#4a90d9" />
          </View>

          <View style={{ height: 30 }} />
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
    flexDirection: "row", alignItems: "center", justifyContent: "space-between",
    paddingHorizontal: 16, paddingVertical: 12,
    backgroundColor: "#fff", borderBottomWidth: 1, borderBottomColor: "#f0f0f0",
  },
  backBtn: {
    width: 36, height: 36, borderRadius: 10,
    backgroundColor: GREEN_LIGHT, justifyContent: "center", alignItems: "center",
  },
  backArrow: { fontSize: 20, color: GREEN, lineHeight: 22 },
  headerTitle: { fontSize: 16, fontWeight: "700", color: "#222" },
  bookmarkBtn: {
    width: 36, height: 36, borderRadius: 10,
    backgroundColor: GREEN_LIGHT, justifyContent: "center", alignItems: "center",
  },

  hero: { backgroundColor: GREEN_LIGHT, alignItems: "center", paddingVertical: 36 },
  heroEmoji: {
    width: 140, height: 140, borderRadius: 70, backgroundColor: "#fff",
    justifyContent: "center", alignItems: "center",
    shadowColor: "#000", shadowOpacity: 0.08, shadowRadius: 12, elevation: 4,
  },
  heroBadge: {
    marginTop: 16, backgroundColor: GREEN,
    paddingHorizontal: 16, paddingVertical: 6, borderRadius: 20,
  },
  heroBadgeText: { color: "#fff", fontWeight: "700", fontSize: 13 },

  body: { paddingHorizontal: 16, paddingTop: 16 },
  menuName: { fontSize: 24, fontWeight: "800", color: "#111", marginBottom: 12, textAlign: "center" },
  metaRow: { flexDirection: "row", justifyContent: "center", gap: 8, marginBottom: 16, flexWrap: "wrap" },
  metaChip: {
    backgroundColor: "#fff", borderRadius: 20,
    paddingHorizontal: 14, paddingVertical: 7,
    borderWidth: 1, borderColor: "#e0e0e0",
  },
  metaText: { fontSize: 12, color: "#555", fontWeight: "500" },

  likeRow: { flexDirection: "row", alignItems: "center", justifyContent: "center", gap: 8, marginBottom: 16 },
  likeText: { fontSize: 14, color: "#888" },

  card: {
    backgroundColor: "#fff", borderRadius: 16, padding: 16, marginBottom: 12,
    shadowColor: "#000", shadowOpacity: 0.04, shadowRadius: 6, elevation: 2, gap: 10,
  },
  cardTitle: { fontSize: 15, fontWeight: "700", color: "#222" },
  desc: { fontSize: 13, color: "#666", lineHeight: 20 },

  bahanRow: { flexDirection: "row", alignItems: "center", gap: 10 },
  bahanDot: { width: 7, height: 7, borderRadius: 4, backgroundColor: GREEN },
  bahanText: { fontSize: 13, color: "#444", flex: 1 },

  langkahRow: { flexDirection: "row", gap: 12, alignItems: "flex-start" },
  langkahNum: {
    width: 26, height: 26, borderRadius: 13, backgroundColor: GREEN,
    justifyContent: "center", alignItems: "center", marginTop: 1,
  },
  langkahNumText: { color: "#fff", fontSize: 12, fontWeight: "700" },
  langkahText: { fontSize: 13, color: "#444", flex: 1, lineHeight: 20 },

  nutrisiRow: { flexDirection: "row", alignItems: "center", gap: 10 },
  nutrisiLabel: { width: 60, fontSize: 12, color: "#666" },
  barBg: { flex: 1, height: 8, backgroundColor: "#f0f0f0", borderRadius: 4, overflow: "hidden" },
  barFill: { height: "100%", borderRadius: 4 },
  nutrisiValue: { width: 36, fontSize: 12, color: "#888", textAlign: "right" },

  backBtnFallback: {
    backgroundColor: GREEN, paddingHorizontal: 24, paddingVertical: 10, borderRadius: 12,
  },
});