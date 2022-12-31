import { StatusBar } from "expo-status-bar";
import React from "react";
import { addDoc, collection } from "firebase/firestore";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { Button, StyleSheet, Text, View } from "react-native";
import { app, db } from "./firebaseConfig";
import AddUserScreen from "./screens/AddUserScreen";
import UserDetailScreen from "./screens/UserDetailScreen";
import UserScreen from "./screens/UserScreen";
import SignInUser from "./screens/SignInUser";
import { getAuth } from "firebase/auth";

const Stack = createStackNavigator();
function MyStack() {
  const auth = getAuth(app);
console.log(auth)
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: "#621FF7",
        },
        headerTintColor: "#fff",
        headerTitleStyle: {
          fontWeight: "bold",
        },
      }}
    >
  
      <Stack.Screen
        name="SignInUser"
        component={SignInUser}
        options={{ title: "Add User" }}
      />
      <Stack.Screen
        name="AddUserScreen"
        component={AddUserScreen}
        options={{ title: "Add User" }}
      />
      <Stack.Screen
        name="UserScreen"
        component={UserScreen}
        options={{ title: "Users List" }}
      />
      <Stack.Screen
        name="UserDetailScreen"
        component={UserDetailScreen}
        options={{ title: "User Detail" }}
      />
    </Stack.Navigator>
  );
}

export default function App() {
  return (
    <>
      <NavigationContainer>
        <MyStack />
      </NavigationContainer>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
