import { View, Text, Image, StyleSheet } from "react-native";
import React from "react";
import { useUser } from "@clerk/clerk-expo";
import Colors from "../../Utils/Colors";

export default function Header() {
  const { user } = useUser();
  return (
    <View style={styles.container}>
      <Image
        source={require("./../../../assets/images/brand.png")}
        style={{ width: 200, height: 45, objectFit: "contain" }}
      ></Image>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    flexDirection: "row",
    alignItems: "center",
    //backgroundColor: Colors.WHITE_TRANSP,
  },
});
