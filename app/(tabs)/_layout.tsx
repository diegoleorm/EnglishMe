import { Tabs } from 'expo-router';
import { Text } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useTema } from '../theme/ThemeContext';

export default function TabsLayout() {
  const insets = useSafeAreaInsets();
  const { colores } = useTema();

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: colores.primario,
        tabBarInactiveTintColor: colores.textoTerciario,
        tabBarStyle: {
          backgroundColor: colores.fondoTarjeta,
          borderTopColor: colores.borde,
          borderTopWidth: 1,
          height: 56 + insets.bottom,
          paddingTop: 8,
          paddingBottom: insets.bottom > 0 ? insets.bottom : 10,
        },
        tabBarLabelStyle: {
          fontSize: 11,
          fontWeight: '600',
        },
      }}
    >
      <Tabs.Screen
        name="temas"
        options={{
          title: 'Inicio',
          tabBarIcon: ({ color }) => <Text style={{ fontSize: 22, color }}>🏠</Text>,
        }}
      />
      <Tabs.Screen
        name="progreso"
        options={{
          title: 'Progreso',
          tabBarIcon: ({ color }) => <Text style={{ fontSize: 22, color }}>📊</Text>,
        }}
      />
      <Tabs.Screen
        name="perfil"
        options={{
          title: 'Perfil',
          tabBarIcon: ({ color }) => <Text style={{ fontSize: 22, color }}>👤</Text>,
        }}
      />
    </Tabs>
  );
}