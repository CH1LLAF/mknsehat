import { StyleSheet, Text, View } from "react-native";
import { colors } from "../../assets/theme";
import { useNavigation } from "@react-navigation/native";
import React, { useEffect } from "react";

const SplashScreen = () => {
  const navigation = useNavigation();
  useEffect(() => {
    setTimeout(() => {
        navigation.replace("Login");
      }, 1500);
  }, []);
  return (
    <View style={styles.container}>
      <Text style={styles.logo}>MakanSehat.</Text>
      <View style={styles.taglineContainer}>
        <Text style={[styles.tagline, { fontFamily: "Pjs-Regular" }]}>
          🥗 Hidup Sehat Dimulai dari
        </Text>
        <Text style={[styles.tagline, { fontFamily: "Pjs-SemiBold" }]}>
          Pilihan Makanan yang Tepat
        </Text>
      </View>
      <View style={styles.infoContainer}>
        <Text style={[styles.info, { fontFamily: "Pjs-Regular" }]}>
          Presented By
        </Text>
        <Text
          style={[
            styles.info,
            { fontFamily: "Pjs-SemiBold", textAlign: "center" },
          ]}
        >
          Mobile Programming
        </Text>
        <Text
          style={[
            styles.info,
            { fontFamily: "Pjs-SemiBold", textAlign: "center" },
          ]}
        >
          Laboratory
        </Text>
      </View>
    </View>
  );
};

export default SplashScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white(),
    justifyContent: "center",
  },
  logo: {
    fontSize: 44,
    fontFamily: "Pjs-ExtraBold",
    color: colors.blue(),
    alignSelf: "center",
  },
  taglineContainer: {
    alignItems: "center",
    marginTop: 12,
  },
  tagline: {
    fontSize: 14,
    color: colors.grey(),
    textAlign: "center",
  },
  infoContainer: {
    alignItems: "center",
    position: "absolute",
    bottom: 24,
    left: 0,
    right: 0,
  },
  info: {
    fontSize: 12,
    color: colors.grey(0.6),
  },
});
