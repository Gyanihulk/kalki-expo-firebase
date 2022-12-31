// screens/SignInUser.js
import React, { Component } from "react";
import {
  Button,
  StyleSheet,
  TextInput,
  ScrollView,
  ActivityIndicator,
  View,
} from "react-native";
import { signOut, getAuth, signInWithEmailAndPassword } from "firebase/auth";
class SignInUser extends Component {
  constructor() {
    super();
    this.state = {
      email: "",
      password: "",
      isLoading: false,
    };
  }
  inputValueUpdate = (val, prop) => {
    const state = this.state;
    state[prop] = val;
    this.setState(state);
  };
  loginUser() {
    if (this.state.name === "") {
      alert("Fill at least your name!");
    } else {
      this.setState({
        isLoading: true,
      });
      const auth = getAuth();
      signInWithEmailAndPassword(auth, this.state.email, this.state.password)
        .then((userCredential) => {
          // Signed in
          const user = userCredential.user;
          console.log(user)
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          console.log(error)
        });
    }
  }
  logoutUser() {
    if (this.state.name === "") {
      alert("Fill at least your name!");
    } else {
      this.setState({
        isLoading: true,
      });
      const auth = getAuth();
      console.log(auth);
      signOut(auth)
        .then(() => {
          // Sign-out successful.
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }
  render() {
    if (this.state.isLoading) {
      return (
        <View style={styles.preloader}>
          <ActivityIndicator size="large" color="#9E9E9E" />
        </View>
      );
    }
    return (
      <ScrollView style={styles.container}>
        <View style={styles.inputGroup}>
          <TextInput
            multiline={true}
            placeholder={"Email"}
            value={this.state.email}
            onChangeText={(val) => this.inputValueUpdate(val, "email")}
          />
        </View>
        <View style={styles.inputGroup}>
          <TextInput
            multiline={true}
            placeholder={"password"}
            value={this.state.password}
            onChangeText={(val) => this.inputValueUpdate(val, "password")}
          />
        </View>

        <View style={styles.button}>
          <Button
            title="Log In"
            onPress={() => this.loginUser()}
            color="#19AC52"
          />
        </View>
        <Button
          title="log out"
          onPress={() => this.logoutUser()}
          color="#19AC52"
        />
      </ScrollView>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 35,
  },
  inputGroup: {
    flex: 1,
    padding: 0,
    marginBottom: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#cccccc",
  },
  preloader: {
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    position: "absolute",
    alignItems: "center",
    justifyContent: "center",
  },
});
export default SignInUser;
