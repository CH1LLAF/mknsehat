import { useState } from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  StatusBar,
  TouchableOpacity,
  FlatList,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Bell } from "lucide-react-native";
import { colors } from "../../assets/theme";
import ListBlog from "../components/ListBlog";
import { CategoryList } from "../data/categories";

const ItemCategory = ({ item, onPress, color }) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <View style={category.item}>
        <Text style={{ ...category.title, color }}>{item.categoryName}</Text>
      </View>
    </TouchableOpacity>
  );
};

const FlatListCategory = () => {
  const [selected, setSelected] = useState(1);
  const renderItem = ({ item }) => {
    const color = item.id === selected ? colors.blue() : colors.grey();
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
      keyExtractor={(item) => item.id}
      renderItem={(item) => renderItem({ ...item })}
      ItemSeparatorComponent={() => <View style={{ width: 10 }} />}
      contentContainerStyle={{ paddingHorizontal: 24 }}
      horizontal
      showsHorizontalScrollIndicator={false}
    />
  );
};

export default function Home() {
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor={colors.white()} />
      <View style={styles.header}>
        <Text style={styles.title}>MakanSehat.</Text>
        <Bell color={colors.black()} size={24} />
      </View>
      <View style={styles.listCategory}>
        <FlatListCategory />
      </View>
      <ListBlog styles={styles} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white(),
    shadowColor: colors.white(),
  },
  header: {
    paddingHorizontal: 24,
    justifyContent: "space-between",
    flexDirection: "row",
    alignItems: "center",
    height: 52,
    paddingTop: 8,
    paddingBottom: 4,
    backgroundColor: colors.white(),
  },
  title: {
    fontSize: 20,
    fontFamily: "Pjs-ExtraBold",
    color: colors.black(),
  },
  listCategory: {
    paddingVertical: 10,
  },
  listBlog: {
    paddingVertical: 10,
    gap: 10,
  },
  listCard: {
    paddingVertical: 10,
    gap: 15,
  },
});

const category = StyleSheet.create({
  item: {
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderRadius: 25,
    alignItems: "center",
    backgroundColor: colors.grey(0.08),
  },
  title: {
    fontFamily: "Pjs-SemiBold",
    fontSize: 14,
    lineHeight: 18,
    color: colors.grey(),
  },
});
