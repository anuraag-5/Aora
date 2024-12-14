import { View, Text, FlatList, Image, RefreshControl, Alert } from 'react-native'
import { useEffect, useState } from "react"
import { SafeAreaView } from 'react-native-safe-area-context'
import { images } from "../../constants"
import SearchInput from '../../Components/SearchInput'
import Trending from '../../Components/Trending'
import EmptyState from '../../Components/EmptyState'
import VideoCard from '../../Components/VideoCard'
import { getAllPosts, getLatestPosts } from '../../lib/appwrite'
import useAppwrite from "../../lib/useAppwrite"

const Home = () => {
  const { data: posts, reFetch: refresh } = useAppwrite(getAllPosts);
  const { data: latestPosts } = useAppwrite(getLatestPosts);
  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = async () => {
    setRefreshing(true);
    await refresh()
    setRefreshing(false);
  }
  return (
    <SafeAreaView className="bg-primary h-full">
      <FlatList
      data={posts}
      keyExtractor={(item) => item.$id}
      renderItem={({item}) => (
        <VideoCard video={item}/>
      )}
      ListHeaderComponent={() => (
        <View className="my-6 px-4 space-y-6">
          <View className="justify-between items-start flex-row mb-6">
            <View>
              <Text className="font-pmedium text-sm text-gray-100">
                Welcome Back
              </Text>
              <Text className="text-2xl font-psemibold text-white">
                Anurag Bhoite
              </Text>
            </View>

            <View className="mt-1.5">
              <Image 
              source={images.logoSmall}
              className="w-9 h-10"
              resizeMode='contain'
              />
            </View>
          </View>

          <SearchInput placeholder="Seach for a video topic"/>
          <View className="w-full flex-1 pt-5 pb-8">
            <Text className="text-gray-100 text-lg font-pregular mb-3">
              Latest videos
            </Text>
            <Trending posts={latestPosts ?? []}/>
          </View>
        </View>
      )}
      ListEmptyComponent={() => (
        <EmptyState 
        title="No videos found"
        subTitle="Be the first one to upload a video"
        />
      )}
      refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh}/>}
      />
    </SafeAreaView>
  )
}

export default Home