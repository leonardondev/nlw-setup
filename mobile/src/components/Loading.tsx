import { ActivityIndicator, View } from "react-native";

export function Loading() {
  return (
    <View className="flex-1 bg-background items-center justify-center">
      <ActivityIndicator color="#7c3aed" size="large" />
    </View>
  );
}
