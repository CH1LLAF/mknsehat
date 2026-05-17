import { Tabs } from "expo-router";
import { Text } from "react-native";

// Ikon tab pakai emoji agar tidak perlu install library icon tambahan
const TabIcon = ({ emoji, label, focused }: { emoji: string; label: string; focused: boolean }) => (
  <Text style={{ fontSize: focused ? 22 : 20, opacity: focused ? 1 : 0.5 }}>{emoji}</Text>
);

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: "#3a8c34",
        tabBarInactiveTintColor: "#aaa",
        tabBarStyle: {
          backgroundColor: "#fff",
          borderTopColor: "#e8f0e4",
          height: 60,
          paddingBottom: 8,
        },
        tabBarLabelStyle: {
          fontSize: 11,
          fontWeight: "600",
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          tabBarIcon: ({ focused }) => (
            <TabIcon emoji="🏠" label="Home" focused={focused} />
          ),
        }}
      />
      <Tabs.Screen
        name="explore"
        options={{
          title: "Discover",
          tabBarIcon: ({ focused }) => (
            <TabIcon emoji="🔍" label="Discover" focused={focused} />
          ),
        }}
      />
      <Tabs.Screen
        name="bookmark"
        options={{
          title: "Simpanan",
          tabBarIcon: ({ focused }) => (
            <TabIcon emoji="🔖" label="Simpanan" focused={focused} />
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: "Profil",
          tabBarIcon: ({ focused }) => (
            <TabIcon emoji="👤" label="Profil" focused={focused} />
          ),
        }}
      />
    </Tabs>
  );
}