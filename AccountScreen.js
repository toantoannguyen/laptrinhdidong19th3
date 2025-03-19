import React, { useContext } from "react";
import { View, Text, Button, StyleSheet } from "react-native";
import { AuthContext } from "./AuthContext";

const AccountScreen = ({ navigation }) => {
  const { user, signOut } = useContext(AuthContext); // Lấy thông tin người dùng và hàm signOut

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{user?.name}</Text>
      <Text style={styles.subtitle}>nguyễn văn toàn - 22810310176</Text>
      <Button title="Sign Out" color="orange" onPress={signOut} />
      <Button
        title="Back to Explorer"
        onPress={() => navigation.navigate("Explorer")}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, justifyContent: "center" },
  title: { fontSize: 24, fontWeight: "bold", marginBottom: 10 },
  subtitle: { fontSize: 16, marginBottom: 20 },
});

export default AccountScreen;
