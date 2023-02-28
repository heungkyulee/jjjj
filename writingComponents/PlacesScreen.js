import React,{useEffect,useState} from 'react'
import { Text, View, StatusBar,TextInput, Platform, FlatList, Image, TouchableOpacity } from 'react-native'
import { Container, Detail, Detail3, Header, StyledTouchableOpacity, windowWidth } from '../design/styledComponents'
import { getStatusBarHeight } from 'react-native-status-bar-height';
import  Icon  from 'react-native-vector-icons/Ionicons'
import axios from 'axios'
import BASE_URL from '../BASE_URL';
import AsyncStorage from '@react-native-async-storage/async-storage';


const PlacesScreen = ({ navigation}) => {
    const [user, setUser] = useState([])
    const StatusBarHeight = Platform.OS === 'ios' ? getStatusBarHeight(true) : StatusBar.currentHeight;
    
  useEffect(()=>{getDataFromAsyncStorage()},[])

  
  const getDataFromAsyncStorage = async ()=>{
    try{
        const currentId = await AsyncStorage.getItem('currentId');
        const res = await axios.get(`${BASE_URL}/following-user`,{
            params:{
                followerId:currentId
            }
        })
          setUser(res.data)
          
    } catch(error){console.log(error.message)}
}

  return (
    <Container style = {{paddingTop:StatusBarHeight}}>
        {console.log(user)}
        <StatusBar translucent backgroundColor={'transparent'}/>
        <Header>
            <View style = {{flexDirection:'row',alignItems:'center',justifyContent:'space-between',flex:1}}>
                <View style = {{width:windowWidth-32-48*2, flexDirection:'row'}}>
                    <StyledTouchableOpacity onPress={()=>{navigation.goBack()}}>
                        <Icon name="md-chevron-back-outline" size={24} color = '#f8f9fa' />
                    </StyledTouchableOpacity>
                    <View style = {{flexDirection:'row'}}>
                        <TextInput placeholder='장소 검색' placeholderTextColor={'#f8f9fa'} style = {{ paddingHorizontal:20, textAlignVertical:'center', fontFamily:'NotoSansKR-Regular', color : '#adb5bd',borderColor:'#adb5bd',borderRadius:30, borderWidth:.3,height:48,width:windowWidth-32-48*2, fontSize:16,  lineHeight:40}}/>
                        <StyledTouchableOpacity onPress = {()=>{}} style = {{position:'absolute', right:10}}>
                            <Icon name="md-search" size={20} color = '#f8f9fa' />
                        </StyledTouchableOpacity>
                    </View>
                </View>
                <View style = {{flexDirection:'row'}}>
                    <StyledTouchableOpacity onPress = {()=>{}}>
                        <Icon name="md-menu-outline" size={24} color = '#f8f9fa' />
                    </StyledTouchableOpacity>
                </View>
            </View>
        </Header>
        <FlatList
        data = {user}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
            <TouchableOpacity style = {{flexDirection:'row', margin:16, alignItems:'center'}}>
                <Image source={{uri:item.profileImageUri}} style = {{width:30,height:30, borderRadius:20, marginRight:16}}/>
                <Detail3 style = {{fontSize:16}}>{item.name}</Detail3>
            </TouchableOpacity>
        )}
        />
    </Container>
  )
}

export default PlacesScreen