import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import QrScanner from "./views/QrScannner";
import Menu from "./views/Menu";
import Main from "./views/Main"
import SearchByName from "./views/SearchByName";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Main">
      <Stack.Screen name="Main" component={Main} options={{ headerShown: false }}/>
      <Stack.Screen name="Menu" component={Menu} options={{ headerShown: false }}/>
      <Stack.Screen name="QrScanner" component={QrScanner} options={{ headerShown: false }}/>
      <Stack.Screen name="SearchByName" component={SearchByName} options={{ headerShown: false }}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}
