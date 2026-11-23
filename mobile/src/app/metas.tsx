import { useEffect, useState } from "react";
import { Alert, ScrollView, Text, View } from "react-native";
import { api } from "@/services/api";
import { Button, Card, Field, Title } from "@/components/Ui";
import type { Meta } from "@/types/kinetic";
export default function Metas() {
  const [items, setItems] = useState<Meta[]>([]);
  const [titulo, setTitulo] = useState("Atividade física");
  const [alvo, setAlvo] = useState("30");
  const [unidade, setUnidade] = useState("min/dia");
  async function load() {
    try {
      setItems(await api<Meta[]>("GET", "/metas"));
    } catch {}
  }
  useEffect(() => {
    load();
  }, []);
  async function save() {
    try {
      await api("POST", "/metas", { titulo, alvo: Number(alvo), unidade });
      await load();
    } catch (e) {
      Alert.alert(
        "Erro",
        e instanceof Error ? e.message : "Não foi possível salvar.",
      );
    }
  }
  return (
    <ScrollView
      style={{ flex: 1, backgroundColor: "#FFFDF5" }}
      contentContainerStyle={{ padding: 20, paddingTop: 60, gap: 14 }}
    >
      <Title>Metas e rotina</Title>
      <Card color="#FFF1BF">
        <Text style={{ fontSize: 20, fontWeight: "900" }}>
          Rotina personalizada
        </Text>
        <Text>
          Atividade física · {alvo} {unidade}
        </Text>
        <Text>Pausas de movimento · 4 por dia</Text>
        <Text>Limite de tela · 3 h/dia</Text>
      </Card>
      <Field label="Título da meta" value={titulo} onChangeText={setTitulo} />
      <Field
        label="Alvo"
        value={alvo}
        onChangeText={setAlvo}
        keyboardType="numeric"
      />
      <Field label="Unidade" value={unidade} onChangeText={setUnidade} />
      <Button title="Salvar meta" onPress={save} />
      {items.map((x) => (
        <Card key={x._id}>
          <Text style={{ fontWeight: "900" }}>{x.titulo}</Text>
          <Text>
            {x.atual}/{x.alvo} {x.unidade}
          </Text>
        </Card>
      ))}
    </ScrollView>
  );
}
