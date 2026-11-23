import { useEffect, useState } from "react";
import { ScrollView, Text, View } from "react-native";
import { api } from "@/services/api";
import { Card, Title } from "@/components/Ui";
import type { Atividade } from "@/types/kinetic";
export default function Historico() {
  const [items, setItems] = useState<Atividade[]>([]);
  useEffect(() => {
    api<Atividade[]>("GET", "/progresso/historico")
      .then(setItems)
      .catch(() => {});
  }, []);
  return (
    <ScrollView
      style={{ flex: 1, backgroundColor: "#FFFDF5" }}
      contentContainerStyle={{ padding: 20, paddingTop: 60, gap: 14 }}
    >
      <Title>Histórico e evolução</Title>
      <Card>
        <Text style={{ fontWeight: "900", fontSize: 20 }}>
          Tempo em movimento
        </Text>
        <Text>
          Os registros abaixo mostram as atividades confirmadas pela API.
        </Text>
        {items.map((x) => (
          <View
            key={x._id}
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              paddingVertical: 8,
            }}
          >
            <Text>{new Date(x.data).toLocaleDateString()}</Text>
            <Text style={{ fontWeight: "900" }}>{x.duracaoMin} min</Text>
          </View>
        ))}
      </Card>
      <Card>
        <Text style={{ fontWeight: "900", fontSize: 20 }}>
          Conquistas desbloqueadas
        </Text>
        <Text>As conquistas serão calculadas pelo progresso do backend.</Text>
      </Card>
    </ScrollView>
  );
}
