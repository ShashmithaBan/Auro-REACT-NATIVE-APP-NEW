import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Link } from 'expo-router'

const index = () => {
  return (
    <View className = 'flex-1 text-4xl justify-center items-center'>
      <Text className= "text-4xl font-extrabold text-green-500">Auro</Text>
      <Link href = "home" style={{color:"blue"}}>Got to Home</Link>
    </View>
  )
}

export default index

const styles = StyleSheet.create({})