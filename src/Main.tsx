import React from "react";
import { View, Text, StyleSheet } from "react-native";

export const Main = () => (
  <View style={styles.container}>
    <Text>Both App</Text>
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center"
  }
});
