import { useState } from "react";
import { Alert, Text, View } from "react-native";
import { api } from "@/services/api";
import { Button, Card, Field, Title } from "@/components/Ui";
export default function TempoTela() {
  const [minutos, setMinutos] = useState("");
  async function save() {
    try {
      await api("POST", "/tempo-tela", {
        minutos: Number(minutos),
        origem: "manual",
      });
      Alert.alert(
        "Registro salvo",
        "Este registro é manual e não mede o aparelho inteiro.",
      );
    } catch (e) {
      Alert.alert(
        "Erro",
        e instanceof Error ? e.message : "Minutos inválidos.",
      );
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
      <Title>Tempo de tela</Title>
      <Card>
        <Text style={{ fontWeight: "900" }}>Registro manual</Text>
        <Text>
          Informe o tempo estimado. O Kinetic não consulta todos os aplicativos
          do aparelho nesta versão.
        </Text>
        <Field
          label="Minutos hoje"
          value={minutos}
          onChangeText={setMinutos}
          keyboardType="numeric"
        />
        <Button title="Salvar registro" onPress={save} />
      </Card>
    </View>
  );
}
