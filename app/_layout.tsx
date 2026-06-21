import { Stack } from "expo-router";

export default function RootLayout() {
  return (
    <Stack>
      <Stack.Screen name="index" options={{ headerShown: false }} />
      <Stack.Screen name="onboarding" options={{ headerShown: false }} />
      <Stack.Screen name="login" options={{ headerShown: false }} />
      <Stack.Screen name="nivel" options={{ headerShown: false }} />
      <Stack.Screen name="avatar" options={{ headerShown: false }} />
      <Stack.Screen name="leccion" options={{ headerShown: false }} />
      <Stack.Screen name="notificaciones" options={{ headerShown: false }} />
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
    </Stack>
  );
}