import { Pressable, Text, View } from "react-native";
import { router } from "expo-router";
import { COLORS } from "@/constants/config";
export default function Welcome() {
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: COLORS.yellow,
        padding: 28,
        justifyContent: "center",
        gap: 18,
      }}
    >
      <Text
        style={{
          fontSize: 48,
          fontWeight: "900",
          color: COLORS.orange,
          textAlign: "center",
        }}
      >
        K
      </Text>
      <Text style={{ fontSize: 42, fontWeight: "900", textAlign: "center" }}>
        Bem-vindo{`\n`}ao Kinetic
      </Text>
      <Text style={{ fontSize: 18, textAlign: "center" }}>
        Seu corpo, sua energia
      </Text>
      <Pressable
        onPress={() => router.push("/login")}
        style={{
          backgroundColor: COLORS.orange,
          borderWidth: 1,
          borderRadius: 18,
          padding: 18,
          marginTop: 80,
        }}
      >
        <Text style={{ fontWeight: "900", fontSize: 18 }}>Entrar ›</Text>
      </Pressable>
      <Pressable
        onPress={() => router.push("/cadastro")}
        style={{
          backgroundColor: COLORS.card,
          borderWidth: 1,
          borderRadius: 18,
          padding: 18,
        }}
      >
        <Text style={{ fontWeight: "900", fontSize: 18 }}>Criar conta ›</Text>
      </Pressable>
    </View>
  );
}
