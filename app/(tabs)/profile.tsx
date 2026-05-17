import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  Switch,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

// ─── Data dummy profil ────────────────────────────────────────────────────────
const profileData = {
  name: "Budi Santoso",
  joinedAt: "Januari 2025",
  targetKalori: 2000,
  todayKalori: 668,
  beratBadan: 65,
  tinggiBadan: 170,
  menuDisimpan: 5,
  menuDicoba: 12,
};

// ─── Komponen menu setting ────────────────────────────────────────────────────
const SettingItem = ({
  emoji,
  label,
  value,
  isToggle = false,
  onPress,
}: {
  emoji: string;
  label: string;
  value?: string;
  isToggle?: boolean;
  onPress?: () => void;
}) => {
  const [enabled, setEnabled] = useState(false);
  return (
    <TouchableOpacity
      style={styles.settingItem}
      onPress={onPress}
      activeOpacity={isToggle ? 1 : 0.7}
    >
      <View style={styles.settingLeft}>
        <View style={styles.settingIcon}>
          <Text style={{ fontSize: 18 }}>{emoji}</Text>
        </View>
        <Text style={styles.settingLabel}>{label}</Text>
      </View>
      {isToggle ? (
        <Switch
          value={enabled}
          onValueChange={setEnabled}
          trackColor={{ true: GREEN }}
          thumbColor="#fff"
        />
      ) : (
        <View style={styles.settingRight}>
          {value && <Text style={styles.settingValue}>{value}</Text>}
          <Text style={styles.settingArrow}>›</Text>
        </View>
      )}
    </TouchableOpacity>
  );
};

// ─── Screen utama ─────────────────────────────────────────────────────────────
export default function Profile() {
  const imt = (
    profileData.beratBadan /
    ((profileData.tinggiBadan / 100) * (profileData.tinggiBadan / 100))
  ).toFixed(1);

  const imtLabel =
    Number(imt) < 18.5
      ? "Kurang Berat"
      : Number(imt) < 25
      ? "Normal ✅"
      : "Kelebihan Berat";

  const progressPercent = Math.min(
    (profileData.todayKalori / profileData.targetKalori) * 100,
    100
  );

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header / Avatar */}
        <View style={styles.headerBg}>
          <View style={styles.avatarWrap}>
            <Text style={styles.avatarEmoji}>👤</Text>
          </View>
          <Text style={styles.profileName}>{profileData.name}</Text>
          <Text style={styles.profileJoined}>
            Bergabung sejak {profileData.joinedAt}
          </Text>
          <TouchableOpacity style={styles.editBtn}>
            <Text style={styles.editBtnText}>✏️  Edit Profil</Text>
          </TouchableOpacity>
        </View>

        {/* Stats Row */}
        <View style={styles.statsRow}>
          <View style={styles.statItem}>
            <Text style={styles.statValue}>{profileData.menuDisimpan}</Text>
            <Text style={styles.statLabel}>Disimpan</Text>
          </View>
          <View style={styles.statDivider} />
          <View style={styles.statItem}>
            <Text style={styles.statValue}>{profileData.menuDicoba}</Text>
            <Text style={styles.statLabel}>Dicoba</Text>
          </View>
          <View style={styles.statDivider} />
          <View style={styles.statItem}>
            <Text style={styles.statValue}>{profileData.targetKalori}</Text>
            <Text style={styles.statLabel}>Target kkal</Text>
          </View>
        </View>

        {/* Progress Kalori Hari Ini */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Kalori Hari Ini</Text>
          <View style={styles.progressCard}>
            <View style={styles.progressHeader}>
              <Text style={styles.progressKalori}>
                🔥 {profileData.todayKalori} kkal
              </Text>
              <Text style={styles.progressTarget}>
                / {profileData.targetKalori} kkal
              </Text>
            </View>
            <View style={styles.progressBarBg}>
              <View
                style={[styles.progressBarFill, { width: `${progressPercent}%` }]}
              />
            </View>
            <Text style={styles.progressNote}>
              Sisa {profileData.targetKalori - profileData.todayKalori} kkal lagi
            </Text>
          </View>
        </View>

        {/* Data Tubuh */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Data Tubuh</Text>
          <View style={styles.bodyCard}>
            <View style={styles.bodyItem}>
              <Text style={styles.bodyEmoji}>⚖️</Text>
              <Text style={styles.bodyValue}>{profileData.beratBadan} kg</Text>
              <Text style={styles.bodyLabel}>Berat Badan</Text>
            </View>
            <View style={styles.bodyDivider} />
            <View style={styles.bodyItem}>
              <Text style={styles.bodyEmoji}>📏</Text>
              <Text style={styles.bodyValue}>{profileData.tinggiBadan} cm</Text>
              <Text style={styles.bodyLabel}>Tinggi Badan</Text>
            </View>
            <View style={styles.bodyDivider} />
            <View style={styles.bodyItem}>
              <Text style={styles.bodyEmoji}>📊</Text>
              <Text style={styles.bodyValue}>{imt}</Text>
              <Text style={styles.bodyLabel}>IMT</Text>
            </View>
          </View>
          <View style={styles.imtLabel}>
            <Text style={styles.imtText}>Status IMT: {imtLabel}</Text>
          </View>
        </View>

        {/* Pengaturan */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Pengaturan</Text>
          <View style={styles.settingCard}>
            <SettingItem
              emoji="🎯"
              label="Target Kalori Harian"
              value={`${profileData.targetKalori} kkal`}
            />
            <View style={styles.settingDivider} />
            <SettingItem emoji="🔔" label="Notifikasi Makan" isToggle />
            <View style={styles.settingDivider} />
            <SettingItem emoji="🌙" label="Mode Gelap" isToggle />
            <View style={styles.settingDivider} />
            <SettingItem emoji="🔒" label="Keamanan & Privasi" />
            <View style={styles.settingDivider} />
            <SettingItem emoji="❓" label="Bantuan & FAQ" />
          </View>
        </View>

        {/* Logout */}
        <View style={[styles.section, { marginBottom: 30 }]}>
          <TouchableOpacity style={styles.logoutBtn}>
            <Text style={styles.logoutText}>🚪  Keluar Akun</Text>
          </TouchableOpacity>
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

  headerBg: {
    backgroundColor: GREEN,
    alignItems: "center",
    paddingTop: 24,
    paddingBottom: 30,
    gap: 8,
  },
  avatarWrap: {
    width: 88,
    height: 88,
    borderRadius: 44,
    backgroundColor: GREEN_LIGHT,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 3,
    borderColor: "#fff",
  },
  avatarEmoji: { fontSize: 44 },
  profileName: { fontSize: 22, fontWeight: "800", color: "#fff" },
  profileJoined: { fontSize: 13, color: "rgba(255,255,255,0.75)" },
  editBtn: {
    marginTop: 6,
    paddingHorizontal: 20,
    paddingVertical: 8,
    backgroundColor: "rgba(255,255,255,0.2)",
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.4)",
  },
  editBtnText: { color: "#fff", fontSize: 13, fontWeight: "600" },

  statsRow: {
    flexDirection: "row",
    backgroundColor: "#fff",
    marginHorizontal: 16,
    marginTop: -18,
    borderRadius: 16,
    padding: 16,
    justifyContent: "space-around",
    alignItems: "center",
    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowRadius: 10,
    elevation: 4,
  },
  statItem: { alignItems: "center", gap: 3 },
  statValue: { fontSize: 20, fontWeight: "800", color: GREEN },
  statLabel: { fontSize: 11, color: "#888" },
  statDivider: { width: 1, height: 36, backgroundColor: "#eee" },

  section: { paddingHorizontal: 16, marginTop: 20 },
  sectionTitle: {
    fontSize: 15,
    fontWeight: "700",
    color: "#222",
    marginBottom: 10,
  },

  progressCard: {
    backgroundColor: "#fff",
    borderRadius: 14,
    padding: 16,
    gap: 10,
    shadowColor: "#000",
    shadowOpacity: 0.04,
    shadowRadius: 6,
    elevation: 2,
  },
  progressHeader: { flexDirection: "row", alignItems: "baseline", gap: 4 },
  progressKalori: { fontSize: 22, fontWeight: "800", color: GREEN },
  progressTarget: { fontSize: 13, color: "#888" },
  progressBarBg: {
    height: 10,
    backgroundColor: GREEN_LIGHT,
    borderRadius: 5,
    overflow: "hidden",
  },
  progressBarFill: {
    height: "100%",
    backgroundColor: GREEN,
    borderRadius: 5,
  },
  progressNote: { fontSize: 12, color: "#888" },

  bodyCard: {
    flexDirection: "row",
    backgroundColor: "#fff",
    borderRadius: 14,
    padding: 16,
    justifyContent: "space-around",
    shadowColor: "#000",
    shadowOpacity: 0.04,
    shadowRadius: 6,
    elevation: 2,
  },
  bodyItem: { alignItems: "center", gap: 4 },
  bodyEmoji: { fontSize: 24 },
  bodyValue: { fontSize: 18, fontWeight: "800", color: "#222" },
  bodyLabel: { fontSize: 11, color: "#888" },
  bodyDivider: { width: 1, backgroundColor: "#eee" },
  imtLabel: {
    backgroundColor: GREEN_LIGHT,
    borderRadius: 10,
    padding: 10,
    marginTop: 8,
    alignItems: "center",
  },
  imtText: { fontSize: 13, color: GREEN, fontWeight: "600" },

  settingCard: {
    backgroundColor: "#fff",
    borderRadius: 14,
    overflow: "hidden",
    shadowColor: "#000",
    shadowOpacity: 0.04,
    shadowRadius: 6,
    elevation: 2,
  },
  settingItem: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 14,
  },
  settingLeft: { flexDirection: "row", alignItems: "center", gap: 12 },
  settingIcon: {
    width: 36,
    height: 36,
    backgroundColor: GREEN_LIGHT,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  settingLabel: { fontSize: 14, color: "#333", fontWeight: "500" },
  settingRight: { flexDirection: "row", alignItems: "center", gap: 6 },
  settingValue: { fontSize: 13, color: "#888" },
  settingArrow: { fontSize: 20, color: "#ccc", lineHeight: 22 },
  settingDivider: { height: 1, backgroundColor: "#f0f0f0", marginLeft: 62 },

  logoutBtn: {
    backgroundColor: "#fff5f5",
    borderRadius: 14,
    padding: 16,
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#ffe0e0",
  },
  logoutText: { fontSize: 15, color: "#e05252", fontWeight: "700" },
});