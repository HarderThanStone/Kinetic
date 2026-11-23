import { Pressable, Text, TextInput, View } from "react-native";
import { COLORS } from "@/constants/config";
export function Button({
  title,
  onPress,
  secondary = false,
  disabled = false,
}: {
  title: string;
  onPress: () => void;
  secondary?: boolean;
  disabled?: boolean;
}) {
  return (
    <Pressable
      disabled={disabled}
      onPress={onPress}
      style={{
        backgroundColor: secondary ? COLORS.card : COLORS.orange,
        borderWidth: 1,
        borderColor: COLORS.border,
        borderRadius: 16,
        padding: 16,
        opacity: disabled ? 0.5 : 1,
      }}
    >
      <Text
        style={{ textAlign: "center", fontWeight: "800", color: COLORS.ink }}
      >
        {title}
      </Text>
    </Pressable>
  );
}
type FieldProps = React.ComponentProps<typeof TextInput> & {
  label: string;
  erro?: string;
  secure?: boolean;
};
export function Field({ label, erro, secure, ...props }: FieldProps) {
  return (
    <View style={{ gap: 6 }}>
      <Text style={{ fontWeight: "700" }}>{label}</Text>
      <TextInput
        {...props}
        secureTextEntry={secure}
        accessibilityLabel={label}
        style={[
          {
            borderWidth: 1,
            borderColor: COLORS.border,
            borderRadius: 14,
            padding: 14,
            backgroundColor: "#FFFDF5",
          },
          props.style,
        ]}
      />
      {erro ? (
        <Text accessibilityRole="alert" style={{ color: "#B42318" }}>
          {erro}
        </Text>
      ) : null}
    </View>
  );
}
export function Card({
  children,
  color = COLORS.card,
}: {
  children: React.ReactNode;
  color?: string;
}) {
  return (
    <View
      style={{
        backgroundColor: color,
        borderWidth: 1,
        borderColor: COLORS.border,
        borderRadius: 22,
        padding: 18,
        gap: 8,
      }}
    >
      {children}
    </View>
  );
}
export function Title({ children }: { children: React.ReactNode }) {
  return (
    <Text style={{ fontSize: 30, fontWeight: "900", color: COLORS.ink }}>
      {children}
    </Text>
  );
}
export function ErrorText({ children }: { children: React.ReactNode }) {
  return (
    <Text style={{ color: "#B42318", fontWeight: "700" }}>{children}</Text>
  );
}
