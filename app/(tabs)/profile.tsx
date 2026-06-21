import { useColorScheme } from "nativewind";
import { Pressable, Text, View } from "react-native";

export default function ProfileScreen() {
  const { colorScheme, setColorScheme } = useColorScheme();

  const toggleTheme = () => {
    setColorScheme(colorScheme === "dark" ? "light" : "dark");
  };

  return (
    <View className="flex-1 items-center justify-center bg-white dark:bg-backgrounddark">
      <Text className="text-black dark:text-white mb-4">
        Current theme: {colorScheme}
      </Text>

      <Pressable
        onPress={toggleTheme}
        className="bg-primary px-4 py-3 rounded-lg"
      >
        <Text className="text-white">Toggle Dark Mode</Text>
      </Pressable>
    </View>
  );
}