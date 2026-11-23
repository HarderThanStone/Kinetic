import * as SecureStore from "expo-secure-store";
import { API_URL } from "@/constants/config";
const KEY = "kinetic_token";
export class ApiError extends Error {
  constructor(
    public status: number,
    message: string,
  ) {
    super(message);
  }
}
export async function token() {
  return SecureStore.getItemAsync(KEY);
}
export async function guardarToken(value: string) {
  return SecureStore.setItemAsync(KEY, value);
}
export async function limparToken() {
  return SecureStore.deleteItemAsync(KEY);
}
export async function api<T>(
  method: string,
  path: string,
  body?: unknown,
): Promise<T> {
  const t = await token();
  const r = await fetch(`${API_URL}${path}`, {
    method,
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      ...(t ? { Authorization: `Bearer ${t}` } : {}),
    },
    body: body === undefined ? undefined : JSON.stringify(body),
  });
  const raw = await r.text();
  let data: any = null;
  try {
    data = raw ? JSON.parse(raw) : null;
  } catch {}
  if (!r.ok) {
    if (r.status === 401) await limparToken();
    throw new ApiError(r.status, data?.erro || "Falha na comunicação.");
  }
  return data as T;
}
export async function login(email: string, senha: string) {
  const d = await api<{ token: string; usuario: any }>("POST", "/auth/login", {
    email,
    senha,
  });
  await guardarToken(d.token);
  return d.usuario;
}
export async function cadastro(nome: string, email: string, senha: string) {
  return api("POST", "/auth/cadastro", { nome, email, senha });
}
export async function logout() {
  await limparToken();
}
