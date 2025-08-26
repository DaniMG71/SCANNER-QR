import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import QrScanner from "./views/QrScannner";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="QrScanner">
        <Stack.Screen name="QrScanner" component={QrScanner} options={{ headerShown: false }}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}
