import { View, Text, SafeAreaView, ScrollView, Image, Alert } from 'react-native'
import React, { useState } from 'react'
import { images } from '../../constants'
import FormField from '../../Components/FormField'
import CustomButtons from '../../Components/CustomButtons'
import { Link, router } from 'expo-router'
import { createUser } from '../../lib/appwrite'

const SignUp = () => {
  const [form, setForm] = useState({
    username: '',
    email: '',
    password: ''
  })

  const [isSubmitting, setIsSubmitting] = useState(false);

  const submit = async () => {
    if (form.email==='' || form.username==='' || form.password==='') {
      Alert.alert('Error', 'Please fill in all fields');
      return; 
    }
    setIsSubmitting(true)

    try {
      const result = await createUser(form.email, form.password, form.username)
      setUser(result);
      setisLogged(true )
      router.replace('/home');
    } catch (error) {
      Alert.alert('Error', error.message)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <SafeAreaView className='bg-primary h-full '>
      <ScrollView>
        <View className='min-h-[80vh] flex my-6 px-6 w-full justify-center'>
          <Image
            source={images.logo}
            resizeMode='contain'
            className='w-[135px] h-[35px]'
          />
          <Text className='text-white text-lg font-psemibold mt-3'>Register To Auro</Text>
          
          <FormField
            value={form.username}
            placeholder='User Name'
            otherStyles='mt-7 mx-1'
            handleChangeText={(e) => setForm({ ...form, username: e })}
          />

          <FormField
            value={form.email}
            placeholder='Email'
            otherStyles='mt-2 mx-1'
            handleChangeText={(e) => setForm({ ...form, email: e })}
          />
          
          <FormField
            value={form.password}
            placeholder='Password'
            otherStyles='mt-2 mx-1'
            handleChangeText={(e) => setForm({ ...form, password: e })}
          />
          
          <CustomButtons
            title='Sign Up'
            handlePress={submit}
            isLoading={isSubmitting}
          />
          
          <View className='justify-center flex-row gap-3 mt-3'>
            <Text className='text-white'>
              Have an account already?
            </Text>
            <Link href='/sign-in' className='font-psemibold text-secondary-100'>Sign In</Link>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

export default SignUp
