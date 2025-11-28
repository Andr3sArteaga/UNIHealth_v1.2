import React from "react";
import { StatusBar } from "expo-status-bar";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";

import { Theme } from "./components/colors";

import Welcome from "./screens/Welcome";
import Register from "./screens/Regsiter";
import LogIn from "./screens/LogIn";
import Tutorial from "./screens/Tutorial";
import Home from "./screens/Home";
import Alert from "./screens/Alert";
import AlertSending from "./screens/AlertSending";
import AlertState from "./screens/AlertState";
import Profile from "./screens/Profile";
import MedicalHistory from "./screens/MedicalHistory";
import api from "./api/api";
import Diary from "./screens/Diary";
import Appointment from "./screens/Appointment";

import { AuthProvider, useAuth, NotificationProvider } from "./context";

const DiarioScreen = () => <Diary />;
const CitasScreen = () => <Appointment />;

export type RootStackParamList = {
  Welcome: undefined;
  Register: undefined;
  LogIn: undefined;
  Tutorial: undefined;
  MainTabs: undefined;
  Alert: undefined;
  AlertSending: undefined;
  AlertState: undefined;
  Profile: undefined;
  MedicalHistory: undefined;
};

export type MainTabsParamList = {
  Home: undefined;
  Citas: undefined;
  Diario: undefined;
  Perfil: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();
const Tabs = createBottomTabNavigator<MainTabsParamList>();

const MainTabs: React.FC = () => {
  return (
    <Tabs.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarShowLabel: true,
        tabBarActiveTintColor: Theme.colors.primary,
        tabBarInactiveTintColor: Theme.colors.textSecondary,
        tabBarStyle: {
          height: 72,
          paddingBottom: 16,
          paddingTop: 8,
          borderTopWidth: 1,
          borderTopColor: Theme.colors.border,
          backgroundColor: Theme.colors.white,
        },
        tabBarLabelStyle: {
          fontSize: Theme.typography.fontSizeXs,
        },
        tabBarIcon: ({ color, size, focused }) => {
          let iconName: keyof typeof Ionicons.glyphMap = "home-outline";

          if (route.name === "Home") {
            iconName = focused ? "home" : "home-outline";
          } else if (route.name === "Citas") {
            iconName = focused ? "calendar" : "calendar-outline";
          } else if (route.name === "Diario") {
            iconName = focused ? "book" : "book-outline";
          } else if (route.name === "Perfil") {
            iconName = focused ? "person" : "person-outline";
          }

          return <Ionicons name={iconName} color={color} size={size} />;
        },
      })}
    >
      <Tabs.Screen name="Home" component={Home} options={{ title: "Inicio" }} />
      <Tabs.Screen name="Citas" component={CitasScreen} />
      <Tabs.Screen name="Diario" component={DiarioScreen} />
      <Tabs.Screen name="Perfil" component={Profile} />
    </Tabs.Navigator>
  );
};

const AppContent = () => {
  const { isAuthenticated, isLoading } = useAuth();

  if (isLoading) {
    return null; // Or a loading spinner
  }

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {!isAuthenticated ? (
          // Auth Stack
          <>
            <Stack.Screen name="Welcome" component={Welcome} />
            <Stack.Screen name="LogIn" component={LogIn} />
            <Stack.Screen name="Register" component={Register} />
            <Stack.Screen name="Tutorial" component={Tutorial} />
          </>
        ) : (
          // App Stack
          <>
            <Stack.Screen name="MainTabs" component={MainTabs} />
            <Stack.Screen name="Alert" component={Alert} />
            <Stack.Screen name="AlertSending" component={AlertSending} />
            <Stack.Screen name="AlertState" component={AlertState} />
            <Stack.Screen name="MedicalHistory" component={MedicalHistory} />
            <Stack.Screen name="Profile" component={Profile} />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default function App() {
  return (
    <AuthProvider>
      <NotificationProvider>
        <StatusBar style="dark" />
        <AppContent />
      </NotificationProvider>
    </AuthProvider>
  );
}