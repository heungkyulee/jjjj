import React, { useEffect, useState } from 'react'
import { StatusBar, Text, View } from 'react-native'
import Lottie from 'lottie-react-native'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { Container,StatusBarHeight } from '../design/styledComponents'

const SplashScreen = ({navigation}) => {
    const getUserId = async() =>{
        try {
            await AsyncStorage.getItem('currentId').then(res=>{
                // console.log(res)
                if(res===null){
                    navigation.reset({
                        index:0,
                        routes:[{name:'LogIn'}]
                    })} else {
                    navigation.reset({
                        index:0,
                        routes:[{name:'Tabs',params:res}]
                    })}
            })
        } catch (error) {
            console.error(error)
        }
    };
    useEffect(()=>{
        setTimeout(() => {
            getUserId()
        },1); 
    },[])
  return (
    <Container style = {{paddingTop:StatusBarHeight}}>
        <StatusBar translucent backgroundColor={'transparent'}/>
        <Lottie
        source = {require('../assets/lottie/splashAnimation.json')}
        autoPlay
        loop/>
    </Container>
  )
}

export default SplashScreen