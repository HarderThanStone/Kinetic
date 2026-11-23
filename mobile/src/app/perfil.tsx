import { useState } from "react";
import { Alert, ScrollView, Text } from "react-native";
import { router } from "expo-router";
import { api } from "@/services/api";
import { Button, Card, Field, Title } from "@/components/Ui";
import { useSession } from "@/context/SessionContext";
export default function Perfil() {
  const { user, logout } = useSession();
  const [nome, setNome] = useState(user?.nome || "");
  async function save() {
    try {
      await api("PATCH", "/perfil", { nome });
      Alert.alert("Perfil atualizado");
    } catch (e) {
      Alert.alert("Erro", e instanceof Error ? e.message : "Falha");
    }
  }
  return (
    <ScrollView
      style={{ flex: 1, backgroundColor: "#FFFDF5" }}
      contentContainerStyle={{ padding: 20, paddingTop: 60, gap: 14 }}
    >
      <Title>Perfil</Title>
      <Card>
        <Text style={{ fontWeight: "900" }}>{user?.email}</Text>
        <Field label="Nome" value={nome} onChangeText={setNome} />
        <Button title="Salvar alterações" onPress={save} />
      </Card>
      <Button
        title="Acessibilidade"
        secondary
        onPress={() => router.push("/acessibilidade")}
      />
      <Button
        title="Tempo de tela"
        secondary
        onPress={() => router.push("/tempo-tela")}
      />
      <Button
        title="Notificações"
        secondary
        onPress={() => router.push("/notificacoes")}
      />
      <Button
        title="Sair"
        secondary
        onPress={async () => {
          await logout();
          router.replace("/");
        }}
      />
    </ScrollView>
  );
}
