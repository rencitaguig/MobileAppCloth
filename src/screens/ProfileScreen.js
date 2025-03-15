import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { loginSuccess, logout } from "../redux/slices/authSlice";
import { login, register } from "../api/auth";

const ProfileScreen = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const [isRegistering, setIsRegistering] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  // Handle Login
  const handleLogin = async () => {
    try {
      const data = await login(email, password);
      dispatch(loginSuccess(data));
    } catch (error) {
      console.error("Login error:", error);
      alert(error.message);
    }
  };

  // Handle Register with exponential backoff retry mechanism
  const handleRegister = async (retryCount = 3, delay = 1000) => {
    if (password !== confirmPassword) {
      alert("Passwords do not match!");
      return;
    }
    try {
      await register("User", email, password);
      handleLogin(); // Auto-login after registration
    } catch (error) {
      if (error.message === "Network Error" && retryCount > 0) {
        console.warn(`Retrying registration... (${3 - retryCount + 1})`);
        setTimeout(() => handleRegister(retryCount - 1, delay * 2), delay);
      } else {
        console.error("Registration error:", error);
        alert(error.message);
      }
    }
  };

  // If logged in, show Profile Screen
  if (user) {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Welcome to Your Profile</Text>
        <TouchableOpacity onPress={() => dispatch(logout())} style={styles.button}>
          <Text style={styles.buttonText}>Logout</Text>
        </TouchableOpacity>
      </View>
    );
  }

  // Default: Show Login or Register inside Profile Page
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{isRegistering ? "Register" : "Login"}</Text>

      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
      />

      <TextInput
        style={styles.input}
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />

      {/* Show confirm password only when registering */}
      {isRegistering && (
        <TextInput
          style={styles.input}
          placeholder="Confirm Password"
          value={confirmPassword}
          onChangeText={setConfirmPassword}
          secureTextEntry
        />
      )}

      <TouchableOpacity style={styles.button} onPress={isRegistering ? handleRegister : handleLogin}>
        <Text style={styles.buttonText}>{isRegistering ? "Register" : "Login"}</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => setIsRegistering(!isRegistering)} style={styles.link}>
        <Text style={styles.linkText}>
          {isRegistering ? "Already have an account? Login" : "Don't have an account? Sign Up"}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  input: {
    width: "100%",
    height: 50,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 10,
    paddingHorizontal: 10,
    marginBottom: 15,
  },
  button: {
    backgroundColor: "#ff3e6c",
    padding: 15,
    borderRadius: 10,
    width: "100%",
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
  link: {
    marginTop: 15,
  },
  linkText: {
    color: "#ff3e6c",
    fontWeight: "bold",
  },
});

export default ProfileScreen;
