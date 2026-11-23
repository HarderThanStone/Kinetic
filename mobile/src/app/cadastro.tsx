import { useState } from "react";
import { Alert, Text, View } from "react-native";
import { router } from "expo-router";
import { api } from "@/services/api";
import { Button, Field, Title } from "@/components/Ui";
export default function Cadastro() {
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [busy, setBusy] = useState(false);
  async function go() {
    try {
      setBusy(true);
      await api("POST", "/auth/cadastro", { nome, email, senha });
      Alert.alert("Conta criada", "Agora entre com seus dados.");
      router.replace("/login");
    } catch (e) {
      Alert.alert(
        "Não foi possível criar conta",
        e instanceof Error ? e.message : "Confira seus dados.",
      );
    } finally {
      setBusy(false);
    }
  }
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: "#FFFDF5",
        padding: 28,
        justifyContent: "center",
        gap: 18,
      }}
    >
      <Text style={{ fontWeight: "800", color: "#555" }}>CRIAR CONTA</Text>
      <Title>Comece no{`\n`}seu ritmo</Title>
      <Field
        label="Nome"
        value={nome}
        onChangeText={setNome}
        placeholder="Seu nome"
      />
      <Field
        label="E-mail"
        value={email}
        onChangeText={setEmail}
        placeholder="voce@exemplo.com"
      />
      <Field
        label="Senha"
        value={senha}
        onChangeText={setSenha}
        secure
        placeholder="Mínimo de 6 caracteres"
      />
      <Button
        title={busy ? "Criando..." : "Criar conta ›"}
        onPress={go}
        disabled={busy}
      />
    </View>
  );
}
