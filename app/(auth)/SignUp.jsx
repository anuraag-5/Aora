import { useState } from "react";
import { View, Text, ScrollView, Image, Alert } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { images } from "../../constants";
import FormField from "../../Components/FormField";
import CustomButton from "../../Components/CustomButton"
import { Link, router } from "expo-router";
import { createAccount } from "../../lib/appwrite.js"
import { useGlobalContext } from "../../context/GlobalProvider.js";

const SignUp = () => {
  const { setUser, setIsLoggedIn } = useGlobalContext();
  const [ isSubmitting, setIsSubmitting ] = useState(false)
  const [form, setform] = useState({
    username:'',
    email: "",
    password: "",
  });

  const submit = async () => {
    if(!form.email || !form.password || !form.username){
      Alert.alert("Credentials","Please fill in all details")
    }

    setIsSubmitting(true);

    try {
      const newUser = await createAccount( form.email, form.password, form.username );
      setUser(newUser);
      setIsLoggedIn(true);

      router.replace('/home');
    } catch (error) {
      Alert.alert('Error',error.message)
    } finally {
      setIsSubmitting(fasle);
    }
  };
  return (
    <SafeAreaView className="bg-primary h-full">
      <ScrollView>
        <View className="w-full justify-center min-h-[85vh] px-4 my-6">
          <Image
            source={images.logo}
            resizeMode="contain"
            className="w-[115px] h-[35px]"
          />
          <Text className="text-2xl text-white text-semibold mt-10 font-psemibold">
            Sign Up in to Aora
          </Text>
          <FormField
            title="Username"
            value={form.username}
            handleChangeText={(e) => setform({ ...form, username: e })}
            otherStyles="mt-10"
          />
          <FormField
            title="Email"
            value={form.email}
            handleChangeText={(e) => setform({ ...form, email: e })}
            otherStyles="mt-7"
            keyboardType="email-address"
          />
          <FormField
            title="Password"
            value={form.password}
            handleChangeText={(e) => setform({ ...form, password: e })}
            otherStyles="mt-7"
          />
          <CustomButton 
          title={"SignUp"}
          handlePress={submit}
          containerStyles="mt-7"
          isLoading={isSubmitting}
          />
          <View className="justify-center pt-5 flex-row gap-2">
            <Text className="text-lg text-gray-100 font-pregular">Already have an account?</Text>
            <Link href={"/SignIn"}
            className="text-lg font-psemibold text-secondary"
            >Sign In</Link>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default SignUp;
