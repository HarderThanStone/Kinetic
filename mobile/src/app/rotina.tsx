import { useEffect, useState } from "react";
import { Alert, ScrollView, Text } from "react-native";
import { api } from "@/services/api";
import { Button, Card, Field, Title } from "@/components/Ui";
import type { Rotina } from "@/types/kinetic";
export default function Rotina() {
  const [items, setItems] = useState<Rotina[]>([]);
  const [nome, setNome] = useState("Rotina da semana");
  const [busy, setBusy] = useState(false);
  async function load() {
    try {
      setItems(await api<Rotina[]>("GET", "/rotinas"));
    } catch {}
  }
  useEffect(() => {
    load();
  }, []);
  async function save() {
    try {
      setBusy(true);
      await api("POST", "/rotinas", {
        nome,
        frequencia: ["segunda", "quarta", "sexta"],
        itens: [{ nome: "Caminhada", duracaoMin: 30, horario: "08:10" }],
      });
      await load();
    } catch (e) {
      Alert.alert("Erro", e instanceof Error ? e.message : "Falha");
    } finally {
      setBusy(false);
    }
  }
  return (
    <ScrollView
      style={{ flex: 1, backgroundColor: "#FFFDF5" }}
      contentContainerStyle={{ padding: 20, paddingTop: 60, gap: 14 }}
    >
      <Title>Rotina</Title>
      <Card color="#FFF1BF">
        <Text style={{ fontSize: 20, fontWeight: "900" }}>
          Sugestão de rotina
        </Text>
        <Text>Caminhada · 08:10</Text>
        <Text>Pausa 1 · 10:30</Text>
        <Text>Pausa 2 · 14:00</Text>
      </Card>
      <Field label="Nome" value={nome} onChangeText={setNome} />
      <Button
        title={busy ? "Salvando..." : "Salvar rotina"}
        onPress={save}
        disabled={busy}
      />
      {items.map((x) => (
        <Card key={x._id}>
          <Text style={{ fontWeight: "900" }}>{x.nome}</Text>
          <Text>{x.frequencia.join(", ")}</Text>
        </Card>
      ))}
    </ScrollView>
  );
}
