import { useState } from "react";
import { Alert, Text, View } from "react-native";
import { router } from "expo-router";
import { Button, Field, Title } from "@/components/Ui";
import { useSession } from "@/context/SessionContext";
export default function Login() {
  const { login } = useSession();
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [busy, setBusy] = useState(false);
  async function go() {
    try {
      setBusy(true);
      await login(email.trim().toLowerCase(), senha);
      router.replace("/home");
    } catch (e) {
      Alert.alert(
        "Erro ao entrar",
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
      <Text style={{ fontWeight: "800", color: "#555" }}>SUA CONTA</Text>
      <Title>É bom ter{`\n`}você de volta!</Title>
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
        placeholder="Digite sua senha"
      />
      <Button
        title={busy ? "Entrando..." : "Entrar ›"}
        onPress={go}
        disabled={busy}
      />
      <Button
        title="Criar conta"
        secondary
        onPress={() => router.push("/cadastro")}
      />
    </View>
  );
}
