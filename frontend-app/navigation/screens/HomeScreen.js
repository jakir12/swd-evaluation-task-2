import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  Button,
  TouchableOpacity,
} from "react-native";
export default function HomeScreen({ navigation }) {


    return (
        <View style={styles.container}>
            <Image style={styles.image} source={require("../../assets/log2.png")} />

            <StatusBar style="auto" />
            <View style={styles.inputView}>
                <Text>WELCOME TO NATIONAL POLYMER</Text>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
   
    container: {
      flex: 1,
      backgroundColor: "#fff",
      alignItems: "center",
      justifyContent: "center",
    },
    image: {
      marginBottom: 40,
    },

  });