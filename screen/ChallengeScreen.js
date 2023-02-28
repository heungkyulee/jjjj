import React,{useState, useEffect} from 'react'
import { Text, View, StatusBar, FlatList, Image, TouchableOpacity, TouchableOpacityBase } from 'react-native'
import { Container, Detail, Header, StyledTouchableOpacity, windowWidth } from '../design/styledComponents'
import { getStatusBarHeight } from 'react-native-status-bar-height';
import  Icon  from 'react-native-vector-icons/Ionicons'
import axios from 'axios'
import AsyncStorage from '@react-native-async-storage/async-storage';
import BASE_URL from '../BASE_URL';
import LinearGradient from 'react-native-linear-gradient';

const ChallengeScreen = ({navigation}) => {
    const [challenges, setChallenges] = useState([])
    const StatusBarHeight = Platform.OS === 'ios' ? getStatusBarHeight(true) : StatusBar.currentHeight;
    const [sort, setSort] = useState('인기')
    const [isSelectedChallenges, setIsSelectedChallenges] = useState([])

    
  useEffect(()=>{getDataFromAsyncStorage()},[sort])

  const handlePress = (id)=>{
    // setIsSelectedChallenges()
    if (isSelectedChallenges.includes(id)) {
        setIsSelectedChallenges(preventSelected => preventSelected.filter((i)=> i!==id))
    } else {
        setIsSelectedChallenges(preventSelected => [...preventSelected,id])
    }
  }

  const handleItemPress = (item) =>{
    navigation.navigate('ChallengeDetail',{item})
  }

  
  const getDataFromAsyncStorage = async ()=>{
    try{
        const currentId = await AsyncStorage.getItem('currentId');
        const res = await axios.get(`${BASE_URL}/challenges-recommend`,{
            params:{
                followerId:currentId
            }
        })
          setChallenges(res.data)
          setIsSelectedChallenges([])
          
    } catch(error){console.log(error.message)}
}

  return (
    <Container style = {{paddingTop:StatusBarHeight}}>
        <StatusBar translucent backgroundColor={'transparent'}/>
        <Header>
            <View style = {{flexDirection:'row',alignItems:'center'}}>
                <Detail style = {{fontSize:24}}>챌린지</Detail>
            </View>
            <View style = {{flexDirection:'row',alignItems:'center'}}>
                {/* <TextInput placeholder='hihii' placeholderTextColor={'white'} style = {{ fontFamily:'NotoSansKR-Regular', textAlign:'center', color : 'white',borderColor:'white', borderBottomWidth:1,width:200}}/> */}
                <StyledTouchableOpacity onPress = {()=>{navigation.navigate('Search')}}>
                    <Icon name="md-search" size={24} color = '#f8f9fa' />
                </StyledTouchableOpacity>
                <StyledTouchableOpacity onPress = {()=>{navigation.navigate("LogIn")}}>
                    <Icon name="md-menu-outline" size={24} color = '#f8f9fa' />
                </StyledTouchableOpacity>
            </View>
        </Header>
        <FlatList
        data={challenges}
        renderItem={(itemData)=>(
            <TouchableOpacity onPress={()=>{handleItemPress(itemData.item)}} activeOpacity={.6} style = {{marginVertical:20,alignItems:'center', backgroundColor:'black', margin:16, borderRadius:10,elevation:10, shadowColor:'white',shadowOffset:{x:0,y:0}}}>
                <View style = {{width:windowWidth-32,height:(windowWidth-32)/2}}>
                    <Image source = {{uri:itemData.item.thumbnailUri}} resizeMode='cover' style = {{position:'absolute',top:0,left:0,right:0,bottom:0,borderTopLeftRadius:10,borderTopRightRadius:10}}/>
                    <LinearGradient colors={['transparent','black']} start={{x:0,y:0}} end={{x:0,y:1}} style = {{position:'absolute', bottom:0, left:0, zIndex:1,width:'100%',height:'100%',justifyContent:'flex-end',padding:12}}>
                    </LinearGradient>
                </View>
                <View style = {{zIndex:10,alignItems:'flex-start',padding:12}}>
                    <Detail style = {{fontSize:18, marginVertical:12}}>{itemData.item.title}</Detail>
                    <Detail style = {{fontSize:12}}>{itemData.item.detail}</Detail>
                    <Detail style = {{fontSize:12}}>{itemData.item.mission}</Detail>
                </View>
            </TouchableOpacity>
        )}/>
    </Container>
  )
}

export default ChallengeScreen