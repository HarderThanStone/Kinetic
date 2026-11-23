import { useEffect, useState } from "react";
import { Pressable, ScrollView, Text, View } from "react-native";
import { router } from "expo-router";
import { api } from "@/services/api";
import { COLORS } from "@/constants/config";
import { Card, Title } from "@/components/Ui";
import { useSession } from "@/context/SessionContext";
import type { Resumo } from "@/types/kinetic";
export default function Home() {
  const { user } = useSession();
  const [r, setR] = useState<Resumo | null>(null);
  useEffect(() => {
    api<Resumo>("GET", "/progresso/resumo")
      .then(setR)
      .catch(() => {});
  }, []);
  return (
    <ScrollView
      style={{ flex: 1, backgroundColor: COLORS.cream }}
      contentContainerStyle={{ padding: 20, gap: 16, paddingTop: 60 }}
    >
      <View
        style={{
          backgroundColor: COLORS.yellow,
          borderRadius: 28,
          padding: 22,
        }}
      >
        <Text style={{ fontSize: 28, fontWeight: "900" }}>
          Olá, {user?.nome || "pessoa"}!
        </Text>
        <Text style={{ fontSize: 16, marginTop: 8 }}>
          Seu corpo, sua energia.
        </Text>
      </View>
      <Text style={{ color: COLORS.muted }}>Hoje</Text>
      <Card>
        <Text style={{ fontWeight: "800" }}>Tempo em movimento</Text>
        <Text style={{ fontSize: 36, fontWeight: "900" }}>
          {r?.minutosHoje || 0} <Text style={{ fontSize: 18 }}>min</Text>
        </Text>
        <Text>de {r?.metaMinutos || 30} min por dia</Text>
        <View style={{ height: 10, backgroundColor: "#DDD", borderRadius: 8 }}>
          <View
            style={{
              height: 10,
              width: `${r?.percentual || 0}%`,
              backgroundColor: COLORS.orange,
              borderRadius: 8,
            }}
          />
        </View>
      </Card>
      <View style={{ flexDirection: "row", gap: 12 }}>
        <Card color={COLORS.card}>
          <Text style={{ fontWeight: "800" }}>Pausas</Text>
          <Text style={{ fontSize: 26, fontWeight: "900" }}>
            {r?.pausas || 0} de {r?.pausasMeta || 4}
          </Text>
        </Card>
        <Card color={COLORS.cyan}>
          <Text style={{ fontWeight: "800" }}>Tela hoje</Text>
          <Text style={{ fontSize: 22, fontWeight: "900" }}>Registrar</Text>
        </Card>
      </View>
      <Pressable onPress={() => router.push("/metas")}>
        <Card color={COLORS.yellow}>
          <Text style={{ fontSize: 18, fontWeight: "900" }}>Suas metas ↗</Text>
          <Text>Atividade, pausas e limite de tela</Text>
        </Card>
      </Pressable>
      <View style={{ flexDirection: "row", flexWrap: "wrap", gap: 10 }}>
        {[
          ["Atividades", "/atividades"],
          ["Rotina", "/rotina"],
          ["Histórico", "/historico"],
          ["Perfil", "/perfil"],
        ].map(([t, p]) => (
          <Pressable
            key={p}
            onPress={() => router.push(p as any)}
            style={{
              borderWidth: 1,
              borderColor: COLORS.border,
              borderRadius: 16,
              padding: 14,
              backgroundColor: "#FFFDF5",
              minWidth: "46%",
            }}
          >
            <Text style={{ fontWeight: "800" }}>{t}</Text>
          </Pressable>
        ))}
      </View>
    </ScrollView>
  );
}
