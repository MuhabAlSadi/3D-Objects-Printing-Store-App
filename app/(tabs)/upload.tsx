import { Text, View } from 'react-native';

export default function UploadScreen() {
  return (
    <View className="flex-1 justify-center items-center bg-gray-50">
      <View className="flex justify-center items-center  bg-secondary px-6 py-8 border rounded-[8px] mb-6 w-80 " >
        <Text className="text-primary text-xl font-extrabold ">Order a Model</Text>
      </View>
      <View className="flex justify-center items-center  bg-secondary px-6 py-8 border rounded-[8px] mb-6 w-80 " >
        <Text className="text-primary text-xl font-extrabold ">Upload a Model</Text>
      </View>
      <View className="flex justify-center items-center  bg-secondary px-6 py-8 border rounded-[8px] mb-6 w-80 " >
        <Text className="text-primary text-xl font-extrabold ">Sell a Model</Text>
      </View>
      <View className="flex justify-center items-center  bg-secondary px-6 py-8 border rounded-[8px] mb-6 w-80 " >
        <Text className="text-primary text-xl font-extrabold ">Request Scanning</Text>
      </View>
      <View className="flex justify-center items-center  bg-secondary px-6 py-8 border rounded-[8px] mb-6 w-80 " >
        <Text className="text-primary text-xl font-extrabold ">Rcycling Service</Text>
      </View>
      
    </View>
  );
}