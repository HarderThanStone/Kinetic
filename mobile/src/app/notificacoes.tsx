import { useState } from "react";
import { Alert, Text, View } from "react-native";
import { api } from "@/services/api";
import { Button, Card, Field, Title } from "@/components/Ui";
export default function Notificacoes() {
  const [titulo, setTitulo] = useState("Pausa de movimento");
  const [horario, setHorario] = useState("10:30");
  async function save() {
    try {
      await api("POST", "/notificacoes/lembretes", {
        titulo,
        horario,
        tipo: "pausa",
      });
      Alert.alert(
        "Lembrete salvo",
        "A entrega depende da permissão e da configuração de notificação do dispositivo.",
      );
    } catch (e) {
      Alert.alert("Erro", e instanceof Error ? e.message : "Falha");
    }
  }
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: "#FFFDF5",
        padding: 20,
        paddingTop: 60,
        gap: 16,
      }}
    >
      <Title>Lembretes</Title>
      <Card>
        <Text>Cadastre um lembrete de pausa.</Text>
        <Field label="Título" value={titulo} onChangeText={setTitulo} />
        <Field label="Horário" value={horario} onChangeText={setHorario} />
        <Button title="Salvar lembrete" onPress={save} />
      </Card>
    </View>
  );
}
