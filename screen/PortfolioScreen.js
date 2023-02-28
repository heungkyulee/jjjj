import React from 'react'
import { Text, View, StatusBar, Image } from 'react-native'
import { Container, Detail, Header, StyledTouchableOpacity, windowWidth } from '../design/styledComponents'
import { getStatusBarHeight } from 'react-native-status-bar-height';
import  Icon  from 'react-native-vector-icons/Ionicons'
import { useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios'
import BASE_URL from '../BASE_URL';
import { useState } from 'react';


const PortfolioScreen = ({navigation}) => {
    const StatusBarHeight = Platform.OS === 'ios' ? getStatusBarHeight(true) : StatusBar.currentHeight;
    const [userInfo,setUserInfo] = useState([])
    const [dataLoaded, setDataLoaded] = useState(false)
    
  const getDataFromAsyncStorage = async ()=>{
        let currentId = await AsyncStorage.getItem('currentId')
        const response = await axios.get(`${BASE_URL}/current-user-info/${currentId}`)
        setUserInfo(...response.data);
        setDataLoaded(true)
}

useEffect(()=>{
    if(!dataLoaded){
        getDataFromAsyncStorage()
    }
    },[dataLoaded])

  return (
    <Container style = {{paddingTop:StatusBarHeight}}>
        <StatusBar translucent backgroundColor={'transparent'}/>
        <Header style = {{position:'absolute',top:StatusBarHeight,left:0,right:0,zIndex:12,backgroundColor:'transparent'}}>
            {console.log(userInfo)}
            <Detail style = {{fontSize:24}}>포트폴리오</Detail>
            <View style = {{flexDirection:'row',alignItems:'center'}}>
                {/* <TextInput placeholder='hihii' placeholderTextColor={'white'} style = {{ fontFamily:'NotoSansKR-Regular', textAlign:'center', color : 'white',borderColor:'white', borderBottomWidth:1,width:200}}/> */}
                <StyledTouchableOpacity onPress = {()=>{navigation.navigate('Search')}}>
                    <Icon name="md-search" size={24} color = '#f8f9fa' />
                </StyledTouchableOpacity>
                <StyledTouchableOpacity onPress = {()=>{navigation.navigate("Notification")}}>
                    <Icon name="md-notifications-outline" size={24} color = '#f8f9fa' />
                </StyledTouchableOpacity>
                <StyledTouchableOpacity onPress = {()=>{navigation.navigate("LogIn")}}>
                    <Icon name="md-menu-outline" size={24} color = '#f8f9fa' />
                </StyledTouchableOpacity>
            </View>
        </Header>

        <View style = {{padding:16}}>
            <Image source={{uri:userInfo.coverImageUri}} style = {{width:windowWidth,height:windowWidth}}/>
            {console.log(userInfo)}
            <View style = {{flexDirection:'row',alignItems:'center'}}>
                <Image source={{uri:userInfo.profileImageUri}} style = {{width:30,height:30,borderRadius:15,marginRight:12}}/>
                <Detail style = {{fontSize:20}}>{userInfo.username}</Detail>
            </View>
        </View>
            
    </Container>
  )
}

export default PortfolioScreen