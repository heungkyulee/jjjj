import React,{useEffect,useState} from 'react'
import { Text, View, StatusBar,TextInput, Platform, FlatList, Image, TouchableOpacity } from 'react-native'
import { Container, Detail, Detail3, Header, StyledTouchableOpacity, windowWidth } from '../design/styledComponents'
import { getStatusBarHeight } from 'react-native-status-bar-height';
import  Icon  from 'react-native-vector-icons/Ionicons'
import axios from 'axios'
import BASE_URL from '../BASE_URL';
import AsyncStorage from '@react-native-async-storage/async-storage';


const FriendsScreen = ({ navigation }) => {
    const [user, setUser] = useState([])
    const [isSelectedFriends, setIsSelectedFriends] = useState([])
    const [friends, setFriends] = useState([])
    const StatusBarHeight = Platform.OS === 'ios' ? getStatusBarHeight(true) : StatusBar.currentHeight;
    
  useEffect(()=>{getDataFromAsyncStorage()},[])

  const handlePress = (id)=>{
    // setIsSelectedFriends()
    if (isSelectedFriends.includes(id)) {
        setIsSelectedFriends(preventSelected => preventSelected.filter((i)=> i!==id))
    } else {
        setIsSelectedFriends(preventSelected => [...preventSelected,id])
    }
  }

  
  const getDataFromAsyncStorage = async ()=>{
    try{
        const currentId = await AsyncStorage.getItem('currentId');
        const res = await axios.get(`${BASE_URL}/following-user`,{
            params:{
                followerId:currentId
            }
        })
          setUser(res.data)
          setIsSelectedFriends([])
          
    } catch(error){console.log(error.message)}
}

  return (
    <Container style = {{paddingTop:StatusBarHeight}}>
        <StatusBar translucent backgroundColor={'transparent'}/>
        <Header>
            <View style = {{flexDirection:'row',alignItems:'center',justifyContent:'space-between',flex:1}}>
                <View style = {{width:windowWidth-32-48*2, flexDirection:'row'}}>
                    <StyledTouchableOpacity onPress={()=>{navigation.goBack()}}>
                        <Icon name="md-chevron-back-outline" size={24} color = '#f8f9fa' />
                    </StyledTouchableOpacity>
                    <View style = {{flexDirection:'row'}}>
                        <TextInput placeholder='친구 검색' placeholderTextColor={'#f8f9fa'} style = {{ paddingHorizontal:20, textAlignVertical:'center', fontFamily:'NotoSansKR-Regular', color : '#adb5bd',borderColor:'#adb5bd',borderRadius:30, borderWidth:.3,height:48,width:windowWidth-48*3, fontSize:16,  lineHeight:40}}/>
                        <StyledTouchableOpacity onPress = {()=>{}} style = {{position:'absolute', right:10}}>
                            <Icon name="md-search" size={20} color = '#f8f9fa' />
                        </StyledTouchableOpacity>
                    </View>
                </View>
                <View style = {{flexDirection:'row'}}>
                    <StyledTouchableOpacity onPress = {()=>{navigation.navigate({
                        name:'WritingDetail',
                        params:{
                            isSelectedFriends
                        }
                    })}} style = {{}}>
                        <Detail>완료</Detail>
                    </StyledTouchableOpacity>
                </View>
            </View>
        </Header>
        <FlatList
        data = {user}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
            <TouchableOpacity onPress={()=>{handlePress(item)}} style = {{flexDirection:'row', marginHorizontal:16,marginVertical:8, alignItems:'center', justifyContent:'space-between'}}>
                <View style = {{flexDirection:'row', alignItems:'center'}}>
                    <Image source={{uri:item.profileImageUri}} style = {{width:30,height:30, borderRadius:20, marginRight:16}}/>
                    <Detail3 style = {{fontSize:16}}>{item.name}</Detail3>
                </View>
                <View>
                    {(isSelectedFriends.includes(item)) && (
                        <Icon name = "md-checkmark" color={'#f8f9fa'} size={16}/>
                    )}
                </View>
                {console.log(isSelectedFriends)}
            </TouchableOpacity>
        )}
        />
    </Container>
  )
}

export default FriendsScreen