// screens/AddUserScreen.js
import { addDoc, collection } from "firebase/firestore";
import React, { Component } from "react";
import {
  Button,
  StyleSheet,
  TextInput,
  ScrollView,
  ActivityIndicator,
  View,
} from "react-native";
import { db } from "../firebaseConfig";
import { auth, createUserWithEmailAndPassword, getAuth } from "firebase/auth";
class AddUserScreen extends Component {
  constructor() {
    super();
    this.state = {
      name: "",
      email: "",
      mobile: "",
      password: "",
      isLoading: false,
    };
  }
  inputValueUpdate = (val, prop) => {
    const state = this.state;
    state[prop] = val;
    this.setState(state);
  };
  storeUser() {
    if (this.state.name === "") {
      alert("Fill at least your name!");
    } else {
      this.setState({
        isLoading: true,
      });
      const auth = getAuth();
    createUserWithEmailAndPassword(auth, this.state.email, this.state.password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        console.log(user)
        this.props.navigation.navigate("UserScreen");
        // ...
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        // ..
      });


      // addDoc(collection(db, "users"), {
      //   name: this.state.name,
      //   email: this.state.email,
      //   mobile: this.state.mobile,
      // })
      //   .then((res) => {
      //     this.setState({
      //       name: "",
      //       email: "",
      //       mobile: "",
      //       isLoading: false,
      //     });
      //     this.props.navigation.navigate("UserScreen");
      //   })
      //   .catch((err) => {
      //     console.error("Error found: ", err);
      //     this.setState({
      //       isLoading: false,
      //     });
      //   });
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
            placeholder={"Name"}
            value={this.state.name}
            onChangeText={(val) => this.inputValueUpdate(val, "name")}
          />
        </View>
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
        <View style={styles.inputGroup}>
          <TextInput
            placeholder={"Mobile"}
            value={this.state.mobile}
            onChangeText={(val) => this.inputValueUpdate(val, "mobile")}
          />
        </View>
        <View style={styles.button}>
          <Button
            title="Add User"
            onPress={() => this.storeUser()}
            color="#19AC52"
          />
        </View>
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
export default AddUserScreen;
