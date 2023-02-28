import React,{useState, useEffect} from 'react'
import { Text, View, StatusBar, FlatList, Image, TouchableOpacity, TouchableOpacityBase, ScrollView } from 'react-native'
import { Container, Detail, Detail2, Detail3, Header, StyledTouchableOpacity, SubTitle, windowHeight, windowWidth } from '../design/styledComponents'
import { getStatusBarHeight } from 'react-native-status-bar-height';
import  Icon  from 'react-native-vector-icons/Ionicons'
import axios from 'axios'
import AsyncStorage from '@react-native-async-storage/async-storage';
import BASE_URL from '../BASE_URL';
import LinearGradient from 'react-native-linear-gradient';
import { priceToString } from '../functions';
import Modal from 'react-native-modal'

const ChallengeDetailScreen = ({route, navigation}) => {
    const [challenges, setChallenges] = useState([])
    const StatusBarHeight = Platform.OS === 'ios' ? getStatusBarHeight(true) : StatusBar.currentHeight;
    const [sort, setSort] = useState('인기')
    const [showModal, setShowModal] = useState(false)
    const [isSelectedChallenges, setIsSelectedChallenges] = useState([])

    
  useEffect(()=>{getDataFromAsyncStorage()},[sort])

  const challenge = route.params.item

  const footer = ()=>{
    return(
        <View style = {{position:'absolute', bottom:20, width:windowWidth, justifyContent:'space-evenly', flexDirection:'row'}}>
            <TouchableOpacity onPress={()=>{setShowModal(true)}} style = {{padding:12, alignItems:'center', justifyContent:'center',width:windowWidth-32, borderRadius:50, backgroundColor:'#DEE2E6',flexDirection:'row'}}>
                <SubTitle style = {{color:'#212529', fontSize:16,lineHeight:20}}>참여하기</SubTitle>
                <Icon name='md-flag-sharp' size={20} color='black' style = {{marginHorizontal:8}}/>
            </TouchableOpacity>
        </View>
    )
  }
  
  const getDataFromAsyncStorage = async ()=>{
    try{
        const currentId = await AsyncStorage.getItem('currentId');
        const res = await axios.get(`${BASE_URL}/challenge-detail`,{
            params:{
                followerId:currentId,
                cid:challenge.cid
            }
        })
          setChallenges(res.data)
        //   console.log(challenges)
          setIsSelectedChallenges([])
          
    } catch(error){console.log(error.message)}
}

const navigate = (item)=>{navigation.navigate('WritingThroughChallenge',item)}

  return (
    <ScrollView style = {{ backgroundColor:'black',flex:1}} StickyHeaderComponent={footer} invertStickyHeaders>
        <StatusBar translucent backgroundColor={'transparent'}/>
        <View style = {{height:56, position:'absolute', top:StatusBarHeight, left:0, zIndex:10}}>
            <LinearGradient colors={['black','transparent','black']} start={{x:0,y:1}} end={{x:0,y:0}} style = {{position:'absolute',top:0,left:0, width:windowWidth,height:windowWidth,justifyContent:'flex-end'}}/>
                <View style = {{flexDirection:'row',alignItems:'center',justifyContent:'flex-start',flex:1}}>
                    <View style = {{ flexDirection:'row'}}>
                        <StyledTouchableOpacity style = {{zIndex:12,margin:16}} onPress={()=>{navigation.goBack()}}>
                            <Icon name="md-chevron-back-outline" size={24} color = '#f8f9fa' />
                        </StyledTouchableOpacity>
                        <View style = {{flexDirection:'row'}}>
                        </View>
                    </View>
                    <View style = {{flexDirection:'row'}}>
                    </View>
                </View>
        </View>
                    <Image source={{uri: challenge.logoUri}} style = {{width:.35*windowWidth,height:.35*windowWidth, position:'absolute',top:.6*windowWidth,left:16,zIndex:11,elevation:10,shadowColor:'black',shadowOffset:{x:0,y:0},borderRadius:.3*windowWidth}}/>
        <Image source={{uri:challenge.thumbnailUri}} style = {{width:windowWidth,height:windowWidth}} resizeMode='contain'/>
        <View style = {{padding:16}}>
            <View style = {{flexDirection:'row', alignItems:'center', justifyContent:'space-between'}}>
                <Detail style = {{fontSize:30, lineHeight:36}}>{challenge.title}</Detail>
                <View style = {{alignItems:'flex-end',margin:12}}>
                    <Detail2 style = {{fontSize:16, lineHeight:24}}>{challenge.business_brand}</Detail2>
                </View>
            </View>
            <Detail3 style = {{fontSize:16,marginTop:20}}>{challenge.detail}</Detail3>
            <Detail style = {{fontSize:16,margin:12,marginBottom:0}}>참여중인 친구</Detail>
            <ScrollView horizontal>
                {challenges.map((item)=>(
                <TouchableOpacity key={item.username} style = {{backgroundColor:'#f8f9fa',marginHorizontal:8, padding:4, paddingHorizontal:12, borderRadius:50, marginTop:12,flexDirection:'row',alignItems:'center',justifyContent:'space-evenly'}}>
                    <Image source={{uri:item.profileImageUri}} style = {{width:20,height:20,borderRadius:15,marginRight:12}} resizeMode='contain'/>
                    <Detail3 style = {{lineHeight:36, color:'#191919', fontSize:12}}>{item.username}</Detail3>
                </TouchableOpacity>
                )
                )}
            </ScrollView>
            <Detail style = {{fontSize:16,margin:12,marginTop:20}}>수행과제</Detail>
            <View style = {{flexDirection:'row',alignItems:'center',width:windowWidth-32}}>
                <Icon name='md-checkmark-outline' size={20} color={'#f8f9fa'} style = {{marginRight:12}}/>
                <Detail3 style = {{fontSize:16}}>{challenge.mission1}</Detail3>
            </View>
            <View style = {{flexDirection:'row',alignItems:'center',width:windowWidth-32}}>
                <Icon name='md-checkmark-outline' size={20} color={'#f8f9fa'} style = {{marginRight:12}}/>
                <Detail3 style = {{fontSize:16}}>{challenge.mission2}</Detail3>
            </View>
            <View style = {{flexDirection:'row',alignItems:'center',width:windowWidth-32}}>
                <Icon name='md-checkmark-outline' size={20} color={'#f8f9fa'} style = {{marginRight:12}}/>
                <Detail3 style = {{fontSize:16}}>{challenge.mission3}</Detail3>
            </View>
            <Detail style = {{fontSize:16,margin:12,marginTop:20}}>보상</Detail>
            <View style = {{flexDirection:'row',alignItems:'center',width:windowWidth-32,marginBottom:40}}>
                <Image source={{uri:challenge.image_url}} style = {{width:20,height:20,borderRadius:15,marginRight:12}} resizeMode='contain'/>
                <Detail3 style = {{fontSize:16}}>{challenge.reward} 1조각</Detail3>
                <Detail3 style = {{fontSize:16}}> ({priceToString(challenge.piece_price)}원)</Detail3>
            </View>
            <View style = {{flexDirection:'row'}}>
                <Image source={{uri:challenge.profileImageUri}} style = {{width:30,height:30}} resizeMode='contain'/>
                <Detail3 style = {{fontSize:16,margin:12}}>{challenge.username}</Detail3>
            </View>
        </View>
        
        <View style = {{position:'absolute', bottom:20, width:windowWidth, justifyContent:'space-evenly', flexDirection:'row'}}>
            <TouchableOpacity onPress={()=>{navigate(challenge)}} style = {{padding:12, alignItems:'center', justifyContent:'center',width:windowWidth-32, borderRadius:50, backgroundColor:'#DEE2E6',flexDirection:'row'}}>
                <SubTitle style = {{color:'#212529', fontSize:16,lineHeight:20}}>참여하기</SubTitle>
                <Icon name='md-flag-sharp' size={20} color='black' style = {{marginHorizontal:8}}/>
            </TouchableOpacity>
        </View>
        
    </ScrollView>
  )
}

export default ChallengeDetailScreen