import { View, Text, Image , ScrollView } from 'react-native'
import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import {images} from './../../constants'
import FormField from '../../Components/FormField'
import CustomButtons from '../../Components/CustomButtons'
import { Link, router } from 'expo-router'

const SignIn = () => {
  const [form , setForm] = useState({
    email:'',
    passwword:'' 
  })
  const submit = () =>{

  }
  const [isSubmitting, setisSubmitting] = useState(false)
  return (
    <SafeAreaView className = "bg-primary h-full">
      <ScrollView>
        <View className = 'justify-center w-full min-h-[80vh] px-4 my-6'>
          <Image
          source={images.logo}
          resizeMode='contain'
          className= 'w-[115px] h-[35px]'
          />
          <Text className='text-white text-2xl font-psemibold mt-10'>Log into Aura</Text>
          <FormField
          title='Email'
          value= {form.email}
          handleChangeText = {(e)=>setForm({...form , email:e})
          }
          otherStyles = "mt-7"
          keyboardType = "email-address"
          />
          <FormField
          title='Password'
          value= {form.passwword}
          handleChangeText = {(e)=>setForm({...form , passwword:e})
          }
          otherStyles = "mt-7" 
          />
          <CustomButtons
          title='Signin'
          handlePress={submit}
          isLoading={isSubmitting}
          />
          <View className='justify-center flex-row gap-3 mt-3  '>
            <Text className ='text-white'>
              Don't have and acoount?
            </Text>
            <Link href='/sign-up' className='font-psemibold text-secondary-100'>Sign Up</Link>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

export default SignIn