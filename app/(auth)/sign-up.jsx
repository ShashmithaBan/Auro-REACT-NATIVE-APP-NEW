import { View, Text, SafeAreaView, ScrollView, Image } from 'react-native'
import React, { useState } from 'react'
import {images} from '../../constants'
import FormField from '../../Components/FormField'
import CustomButtons from '../../Components/CustomButtons'
import { Link } from 'expo-router'

const SignUp = () => {
  const [form , setForm] = useState({
    firstName:'',
    lastName:'',
    email:'',
    password:''
  })
  const submit = () =>{

  }
  const[isSubmitting , setisSubmitting] = useState(false)
  return (
    <SafeAreaView className = 'bg-primary h-full '>
      <ScrollView >
        <View className='min-h-[80vh] flex my-6 px-6 w-full justify-center'>
          <Image 
          source={images.logo}
          resizeMode='contain'
          className ='w-[135px] h-[35px]'
          />
          <Text className='text-white text-lg font-psemibold mt-3'>Register To Auro</Text>
          <View className='flex flex-row space-x-3'>
          <FormField
          value={form.firstName}
          placeholder='First Name'
          otherStyles='mt-7 w-[165px] mx-1'
          handleChangeText={(e)=>setForm[{...form , firstName:e}]}
         
          />
           <FormField
          value={form.lastName}
          placeholder='Last Name'
          otherStyles='mt-7 w-[165px] mx-1'
          handleChangeText={(e)=>setForm[{...form , lastName:e}]}
       
          />
          </View>

          <FormField
          value={form.email}
          placeholder='Email'
          otherStyles='mt-2  mx-1'
          handleChangeText={(e)=>setForm[{...form , email:e}]}
          />
           <FormField
          value={form.password}
          placeholder='Password'
          otherStyles='mt-2  mx-1'
          handleChangeText={(e)=>setForm[{...form , password:e}]}
          />
           <CustomButtons
          title='Sign Up'
          handlePress={submit}
          isLoading={isSubmitting}
          />
          <View className='justify-center flex-row gap-3 mt-3  '>
            <Text className ='text-white'>
              Have an acoount already ?
            </Text>
            <Link href='/sign-in' className='font-psemibold text-secondary-100'>Sign In</Link>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

export default SignUp