import React, { useState, useContext } from "react";
import { View, Text, TextInput, Button, StyleSheet, Alert } from "react-native";
import { AuthContext } from "./AuthContext";

const SignInScreen = () => {
  const [email, setEmail] = useState(""); // Trạng thái email
  const [password, setPassword] = useState(""); // Trạng thái mật khẩu
  const { signIn } = useContext(AuthContext); // Lấy hàm signIn từ Context

  const handleSignIn = () => {
    const success = signIn(email, password); // Gọi hàm đăng nhập
    if (!success) {
      Alert.alert("Lỗi", "Email hoặc mật khẩu không đúng!"); // Hiển thị thông báo lỗi
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Sign In</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter your email here"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
      />
      <TextInput
        style={styles.input}
        placeholder="Enter your password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      <Button title="Sign In" color="orange" onPress={handleSignIn} />
      <Text style={styles.orText}>Or sign in with</Text>
      <View style={styles.socialButtons}>
        <Button
          title="Google"
          color="red"
          onPress={() => Alert.alert("Google Sign-In", "Chưa triển khai")}
        />
        <Button
          title="Facebook"
          color="blue"
          onPress={() => Alert.alert("Facebook Sign-In", "Chưa triển khai")}
        />
      </View>
      <Text style={styles.signUpText}>Not yet a member? Sign Up</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, justifyContent: "center" },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 10,
    marginBottom: 10,
    borderRadius: 5,
  },
  orText: { textAlign: "center", marginVertical: 10 },
  socialButtons: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginBottom: 20,
  },
  signUpText: { textAlign: "center", color: "blue" },
});

export default SignInScreen;
