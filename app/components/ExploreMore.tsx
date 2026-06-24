import { Feather } from '@expo/vector-icons';
import { Link } from 'expo-router';
import { Text, TouchableOpacity, View } from 'react-native';


export default function ExploreMore() {
    return (
        <Link href="/explore" asChild>
        <TouchableOpacity className='flex-row items-center justify-center bg-[#334155] dark:border-2 dark:border-primary rounded-[10px] px-6 py-10 mx-6 my-10'>
          <View>
            <Text className="text-primary text-[25px] text-center font-black">Explore More</Text>
            <Text className="text-primary text-[25px] text-center font-black">Models</Text>
          </View>
          <Feather className="ml-8" name="compass" size={72} color='#FF7518' />
        </TouchableOpacity>
      </Link>
    );
}