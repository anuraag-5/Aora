import { useState } from "react";
import { View, Text, ScrollView, Image, Alert } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { images } from "../../constants";
import FormField from "../../Components/FormField";
import CustomButton from "../../Components/CustomButton"
import { Link, router } from "expo-router";
import { getCurrrentUser, signIn } from "../../lib/appwrite";
import { useGlobalContext } from "../../context/GlobalProvider";

const SignIn = () => {
  const { setUser, setIsLoggedIn } = useGlobalContext();
  const [ isSubmitting, setIsSubmitting ] = useState(false);
  const [form, setform] = useState({
    email: "",
    password: "",
  });

  const submit = async () => {
    if(!form.email || !form.password){
      Alert.alert("Error","Please fill in all details")
    }

    setIsSubmitting(true);

    try {
      await signIn( form.email, form.password );
      const result = await getCurrrentUser();
      setUser(result);
      setIsLoggedIn(true)

      Alert.alert("Success","User signed in successfully")
      router.replace('/home');
    } catch (error) {
      Alert.alert('Error',error.message)
    } finally {
      setIsSubmitting(false);
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
            Log in to Aora
          </Text>
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
          title={"Signin"}
          handlePress={submit}
          containerStyles="mt-7"
          isLoading={isSubmitting}
          />
          <View className="justify-center pt-5 flex-row gap-2">
            <Text className="text-lg text-gray-100 font-pregular">Don't have an account?</Text>
            <Link href={"/SignUp"}
            className="text-lg font-psemibold text-secondary"
            >Sign Up</Link>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default SignIn;
