import { useVideoPlayer, VideoView } from "expo-video";
import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  Image,
} from "react-native";
import { CustomButton, FormField } from "../../Components/index";
import { useState } from "react";
import { icons } from "../../constants";
import { useEffect } from "react";

const styles = StyleSheet.create({
  video: {
    width: "100%",
    height: 256,
    borderRadius: 12,
    marginTop: 12,
  },
});

const Create = () => {
  let videoSource =
    "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4";
  const player = useVideoPlayer(videoSource, (player) => {
    player.loop = false;
    player.play();
  });
  const [uploading, setUploading] = useState(false);
  const [form, setForm] = useState({
    title: "",
    video: "",
    thumbnail: "",
    prompt: "",
  });

  useEffect(() => {
    videoSource = form.video.uri;
  }, [form]);

  const submit = () => {};
  return (
    <SafeAreaView className="bg-primary h-full">
      <ScrollView className="px-4 my-6">
        <Text className="text-2xl font-psemibold text-white">Upload Video</Text>

        <FormField
          title="Video Title"
          value={form.title}
          placeholder={"Give your video a catchy title..."}
          handleChangeText={(e) => setForm({ ...form, title: e })}
          otherStyles={"mt-10"}
        />

        <View className="mt-7 space-y-2">
          <Text className="text-base text-gray-100 font-pmedium">
            Upload Video
          </Text>
          <TouchableOpacity>
            {form.video ? (
              <VideoView
                style={styles.video}
                player={player}
                allowsFullscreen
                allowsPictureInPicture
              />
            ) : (
              <View className="w-full h-40 px-4 bg-black-100 rounded-2xl justify-center items-center">
                <View className="w-14 h-14 border border-dashed border-secondary-100 justify-center items-center">
                  <Image
                    source={icons.upload}
                    resizeMode="contain"
                    className="w-1/2 h-1/2"
                  />
                </View>
              </View>
            )}
          </TouchableOpacity>
        </View>
        <View className="mt-7 space-y-2">
          <Text className="text-base text-gray-100 font-pmedium">
            Thumbnail Image
          </Text>
          <TouchableOpacity>
            {form.thumbnail ? (
              <Image
                source={{ uri: form.thumbnail.uri }}
                resizeMode="cover"
                className="w-full h-64 rounded-2xl"
              />
            ) : (
              <View className="w-full h-16 px-4 bg-black-100 rounded-2xl justify-center items-center border-2 border-black-200 flex-row space-x-2">
                <Image
                  source={icons.upload}
                  resizeMode="contain"
                  className="w-5 h-5"
                />
                <Text className="text-sm text-gray-100 font-pmedium">
                  {" "}
                  Choose a file
                </Text>
              </View>
            )}
          </TouchableOpacity>
        </View>
        <FormField
          title="AI Prompt"
          value={form.prompt}
          placeholder={"The prompt you used to create this video"}
          handleChangeText={(e) => setForm({ ...form, prompt: e })}
          otherStyles={"mt-7"}
        />
        <CustomButton
          title={"Submit & Publish"}
          handlePress={submit}
          containerStyles={"mt-7"}
          isLoading={uploading}
        />
      </ScrollView>
    </SafeAreaView>
  );
};

export default Create;
