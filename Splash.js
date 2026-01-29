import { View, StyleSheet, Image } from "react-native";
import React, { useEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import { auth } from "../../firebase";
import { onAuthStateChanged } from "firebase/auth";

const Splash = () => {
  // Navigation hook to move between screens
  const navigation = useNavigation();

  useEffect(() => {
    // Listen for authentication state changes
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        // If user is logged in, go to main app
        navigation.navigate("TabNavigator");
      } else {
        // If no user, show splash for 3 seconds then go to Register
        setTimeout(() => {
          navigation.navigate("Register");
        }, 3000);
      }
    });

    // Cleanup the listener when component unmounts
    return unsubscribe;
  }, []);

  return (
    <View style={styles.container}>
      {/* Splash screen image */}
      <Image
        style={styles.image}
        source={require("../../assets/safety.png")}
      />
    </View>
  );
};

export default Splash;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  image: {
    height: 150,
    width: 150,
  },
});
