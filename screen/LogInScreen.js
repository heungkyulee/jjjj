import React from 'react'
import { Text, View,StatusBar, TouchableOpacity, Image, Alert } from 'react-native'
import { Container, StatusBarHeight,Detail3 } from '../design/styledComponents'
import {  KakaoAccessTokenInfo,  KakaoProfile,  getProfile as getKakaoProfile,  login,  logout,  unlink,  getProfile,} from '@react-native-seoul/kakao-login';
import AsyncStorage from '@react-native-async-storage/async-storage';
import BASE_URL from '../BASE_URL';
import axios from 'axios'

const LogInScreen = ({navigation}) => {

    const signIn = async () =>{
        const KakaoOAuthToken = await login();
        return JSON.stringify(KakaoOAuthToken);
    }

  const getKakaoProfile = async result => {
    const profile = await getProfile(result);
    return profile;
  };

  const sendProfileToServerAndAsyncStorage = async profile =>{
    await axios.post(`${BASE_URL}/user/login`,{
        uid:Number(profile.id),
        email:profile.email,
        gender : profile.gender,
        username : profile.nickname,
        ageRange : profile.ageRange,
        birthday : profile.birthday,
        birthdayType : profile.birthdayType
    }).then(async(res)=>{
        await AsyncStorage.setItem('currentId',`${res.data}`)
    }).then(async()=>{
        await AsyncStorage.getItem('currentId').then((res)=>{
            if(res!==null){
                navigate()
            } else { Alert('다시 시도하세요!')}
            console.log(res)})
    })
  }

    const navigate = ()=>{
        if(AsyncStorage.getItem('currentId')!==null){
            navigation.reset({ index:0, routes:[{name:'Tabs'}]})
        }
        else{
            console.warn('다시 시도해주세요!')
        }
    }
    
  return (
    <Container style = {{paddingTop:StatusBarHeight,}}>
        <StatusBar translucent backgroundColor={'transparent'}/>
        <TouchableOpacity onPress={()=>{ 
            signIn().then(result=>getKakaoProfile(result)).then(profile=>sendProfileToServerAndAsyncStorage(profile))
            }}>
            <Image source = {require('../assets/images/kakao_login_large_wide.png')} style = {{alignSelf:'center', width:'90%',height:100,resizeMode:'contain'}}/>
        </TouchableOpacity>
    </Container>
  )
}

export default LogInScreen