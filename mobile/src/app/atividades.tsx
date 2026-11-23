import { useEffect, useState } from "react";
import { Alert, FlatList, Text, View } from "react-native";
import { api } from "@/services/api";
import { Button, Card, Field, Title } from "@/components/Ui";
import type { Atividade } from "@/types/kinetic";
export default function Atividades() {
  const [items, setItems] = useState<Atividade[]>([]);
  const [tipo, setTipo] = useState("Caminhada");
  const [duracao, setDuracao] = useState("");
  const [busy, setBusy] = useState(false);
  async function load() {
    try {
      setItems(await api<Atividade[]>("GET", "/atividades"));
    } catch {
      Alert.alert("Erro", "Não foi possível carregar atividades.");
    }
  }
  useEffect(() => {
    load();
  }, []);
  async function save() {
    try {
      setBusy(true);
      await api("POST", "/atividades", {
        tipo,
        duracaoMin: Number(duracao),
        data: new Date().toISOString(),
      });
      setDuracao("");
      await load();
    } catch (e) {
      Alert.alert(
        "Não foi possível salvar",
        e instanceof Error ? e.message : "Duração inválida.",
      );
    } finally {
      setBusy(false);
    }
  }
  return (
    <View
      style={{
        flex: 1,
        padding: 20,
        paddingTop: 60,
        gap: 14,
        backgroundColor: "#FFFDF5",
      }}
    >
      <Title>Atividades</Title>
      <Field label="Tipo" value={tipo} onChangeText={setTipo} />
      <Field
        label="Duração em minutos"
        value={duracao}
        onChangeText={setDuracao}
        keyboardType="numeric"
      />
      <Button
        title={busy ? "Salvando..." : "Registrar atividade"}
        onPress={save}
        disabled={busy}
      />
      <Text style={{ fontSize: 20, fontWeight: "900", marginTop: 10 }}>
        Histórico
      </Text>
      <FlatList
        data={items}
        keyExtractor={(x) => x._id}
        ListEmptyComponent={<Text>Nenhuma atividade registrada.</Text>}
        renderItem={({ item }) => (
          <Card>
            <Text style={{ fontWeight: "900" }}>{item.tipo}</Text>
            <Text>
              {item.duracaoMin} min · {new Date(item.data).toLocaleDateString()}
            </Text>
          </Card>
        )}
      />
    </View>
  );
}
