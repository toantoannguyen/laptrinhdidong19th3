import React, { useContext } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabsNavigator } from "@react-navigation/bottom-tabs"; // Đảm bảo import đúng
import Ionicons from "react-native-vector-icons/Ionicons";
import { AuthContext, AuthProvider } from "./AuthContext";
import SignInScreen from "./SignInScreen";
import ExplorerScreen from "./ExplorerScreen";
import AccountScreen from "./AccountScreen";
import { View, Text } from "react-native";

// Giả lập màn hình Cart (chưa triển khai chi tiết)
const CartScreen = () => (
  <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
    <Text>Cart Screen</Text>
  </View>
);

const Stack = createStackNavigator();
const Tab = createBottomTabsNavigator(); // Tạo Bottom Tabs Navigator

// Component Bottom Tabs cho các màn hình chính
const MainTabs = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, size }) => {
          let iconName;
          if (route.name === "Explorer") iconName = "search";
          else if (route.name === "Cart") iconName = "cart";
          else if (route.name === "Account") iconName = "person";
          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: "blue",
        tabBarInactiveTintColor: "gray",
      })}
    >
      <Tab.Screen
        name="Explorer"
        component={ExplorerScreen}
        options={{ headerShown: false }}
      />
      <Tab.Screen
        name="Cart"
        component={CartScreen}
        options={{ headerShown: false }}
      />
      <Tab.Screen
        name="Account"
        component={AccountScreen}
        options={{ headerShown: false }}
      />
    </Tab.Navigator>
  );
};

// Component điều hướng chính
const AppNavigator = () => {
  const { user } = useContext(AuthContext);

  return (
    <NavigationContainer>
      <Stack.Navigator>
        {user ? (
          <Stack.Screen
            name="Main"
            component={MainTabs}
            options={{ headerShown: false }}
          />
        ) : (
          <Stack.Screen
            name="SignIn"
            component={SignInScreen}
            options={{ headerShown: false }}
          />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default function App() {
  return (
    <AuthProvider>
      <AppNavigator />
    </AuthProvider>
  );
}
