import { useState } from "react";
import { Alert, Pressable, ScrollView, Text } from "react-native";
import { api } from "@/services/api";
import { Button, Card, Title } from "@/components/Ui";
const options = [
  "Daltonismo",
  "Baixa visão",
  "Deficiência física",
  "Outra condição especial",
];
export default function Acessibilidade() {
  const [selected, setSelected] = useState<string[]>([]);
  function toggle(x: string) {
    setSelected((v) => (v.includes(x) ? v.filter((i) => i !== x) : [...v, x]));
  }
  async function save() {
    try {
      await api("PATCH", "/perfil", { acessibilidade: selected });
      Alert.alert("Preferências salvas");
    } catch {
      Alert.alert("Erro", "Não foi possível salvar.");
    }
  }
  return (
    <ScrollView
      style={{ flex: 1, backgroundColor: "#F8BE00" }}
      contentContainerStyle={{ padding: 20, paddingTop: 60, gap: 14 }}
    >
      <Text style={{ fontSize: 34, fontWeight: "900" }}>
        No seu ritmo{`\n`}sempre!
      </Text>
      <Card color="#FFFDF5">
        <Title>Acessibilidade</Title>
        <Text>O que se aplica a você?</Text>
        {options.map((x) => (
          <Pressable
            key={x}
            onPress={() => toggle(x)}
            style={{
              borderWidth: 1,
              borderRadius: 14,
              padding: 16,
              backgroundColor: selected.includes(x) ? "#FFF1BF" : "#FFFDF5",
            }}
          >
            <Text style={{ fontWeight: "800" }}>
              {selected.includes(x) ? "✓ " : "○ "}
              {x}
            </Text>
          </Pressable>
        ))}
        <Button title="Continuar" onPress={save} />
      </Card>
    </ScrollView>
  );
}
