import { Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function HomeScreen() {
  return (
    <SafeAreaView className="flex-1 justify-center items-center bg-gray-50 p-5">
      <Text className="text-xl font-bold text-gray-800">Home Screen</Text>
      <Text className="text-orange-500 text-xl my-7 font-bold" > 3D Objects Printing Store</Text>
      <Text className="border border-orange-500 text-xl my-7 px-14 py-4 rounded-[10px]  ">Sign In</Text>
    </SafeAreaView>
  );
}