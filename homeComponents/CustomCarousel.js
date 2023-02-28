import React, { useEffect, useState } from 'react'
import { FlatList, Text, View, Image, ScrollView } from 'react-native'
import axios from 'axios'
import BASE_URL from '../BASE_URL'
import { Detail3,Detail, windowWidth, windowHeight } from '../design/styledComponents'
import AsyncStorage from '@react-native-async-storage/async-storage'
import LinearGradient from 'react-native-linear-gradient'
import  Icon  from 'react-native-vector-icons/Ionicons'
import { TouchableOpacity } from 'react-native-gesture-handler'
import placeLikeOutline from '../assets/images/placeLikeOutline.png'
import placeLikeFilled from '../assets/images/placeLikeFilled.png'
import challengeLikeOutline from '../assets/images/challengeLikeOutline.png'
import challengeLikeFilled from '../assets/images/challengeLikeFilled.png'
import userLikeOutline from '../assets/images/userLikeOutline.png'
import userLikeFilled from '../assets/images/userLikeFilled.png'
import LookForFriends from './LookForFriends'

const CustomCarousel = () => {
    const [post, setPost] = useState([])
    const [loading, setLoading] = useState(true)
    const [placeLiked, setPlaceLike] = useState(0)
    const [challengeLiked, setChallengeLike] = useState(0)
    const [userLiked, setUserLike] = useState(0)
    
    const getDataFromAsyncStorage = async ()=>{
        try{

            const currentId = await AsyncStorage.getItem('currentId');
            const res = await axios.get(`${BASE_URL}/post`,{
                params:{
                    followerId:currentId
                }
            })
            setPost([...res.data])
            setLoading(false);
            // console.log(post)
        } catch(error){
            console.log(error.message)
        }
    }

    useEffect(()=>{
        getDataFromAsyncStorage()
    },[])
    // useEffect(()=>{getData()},[])

    const togglePlaceLike = ()=>{
        setPlaceLike(!placeLiked);
    }

    const toggleChallengeLike = ()=>{
        setChallengeLike(!challengeLiked);
    }

    const toggleUserLike = ()=>{
        setUserLike(!userLiked);
    }
    
    const renderItem = (itemData,index)=>{
        return(
            <View>
                    <View key={index} style = {{marginHorizontal:10, width:windowWidth-20,justifyContent:'flex-end', backgroundColor:'black',marginBottom:10,elevation:10, shadowColor:'white', shadowOffset:{x:0,y:10}, borderRadius:10}}>
                        <View  style = {{backgroundColor:'black', zIndex:2, width:'100%', padding:20,paddingVertical:16, borderTopLeftRadius:30, borderTopRightRadius:30}}>
                            <View style = {{backgroundColor:'black',flexDirection:'row', alignItems:'center',justifyContent:'space-between'}}>
                                    <TouchableOpacity style = {{flexDirection:'row'}}>
                                        <Image source = {{uri:`${itemData.item.profileImageUri}`}} style = {{width:28,height:28, borderRadius:15,zIndex:2}}/>
                                        <View style = {{alignSelf:'center', marginLeft:8}}>
                                            <Detail style = {{color:'white', fontSize:14, lineHeight:20}}>{itemData.item.username}</Detail>
                                        </View>
                                    </TouchableOpacity>
                                    <TouchableOpacity style = {{padding:4,flexDirection:'row',alignItems:'center'}}>
                                        <Icon name='md-flag-sharp' color={'#f8f9fa'} size={16} style = {{marginRight:4}}/>
                                        <Detail3 style = {{color:'white', fontSize:12, lineHeight:20}}>{itemData.item.challenge_name}</Detail3>
                                    </TouchableOpacity>
                                    <View style = {{flexDirection:'row',alignItems:'center'}}>
                                            <Detail3 style = {{color:'white', fontSize:12, lineHeight:20}}>{itemData.item.timeAgo}</Detail3>
                                            <TouchableOpacity style = {{marginLeft:8,padding:4}}>
                                                <Icon name='md-ellipsis-horizontal-sharp' color={'#f8f9fa'} size={20}/>
                                            </TouchableOpacity>
                                    </View>
                            </View>
                        </View>
                        {itemData.item.thumbnailUri!==null?(
                            <Image source={{uri:`${itemData.item.thumbnailUri}`}} style = {{width:windowWidth-60, height:windowWidth, alignSelf:'center',borderRadius:20}}/>
                        ):null}
                        <View  style = {{backgroundColor:'black', zIndex:2, width:'100%', padding:16, borderBottomLeftRadius:30, borderBottomRightRadius:30}}>

                            <View style = {{backgroundColor:'black',flexDirection:'row', alignItems:'center',justifyContent:'space-between'}}>
                                <View style = {{ backgroundColor:''}}>
                                    <Detail3 style = {{ fontSize:12, lineHeight:20 }}>함께한 친구 : {itemData.item.with_id}</Detail3>
                                    <Detail3 style = {{ fontSize:12, lineHeight:20 }}>챌린지 : {itemData.item.challenge_id}</Detail3>
                                </View>
                            </View>
                            <View style = {{padding:16}}>
                                {itemData.item.with_id!==null?(
                                    <Detail3 style = {{color:'white', fontSize:12, lineHeight:20}}>{itemData.item.detail_content}</Detail3>
                                    ):null}
                            </View>
                            <View style = {{backgroundColor:'',width:windowWidth-56}}>
                                <Detail3 style = {{fontSize:12}}>좋아요 : </Detail3>
                            </View>
                        <View style = {{width:'100%',backgroundColor:'', flexDirection:'row',justifyContent:'space-evenly'}}>
                            <TouchableOpacity onPress={toggleChallengeLike}>
                                <Image source = {challengeLiked? challengeLikeOutline:challengeLikeFilled} style = {{alignSelf:'center', width:20,height:20,resizeMode:'contain'}}/>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={togglePlaceLike}>
                                <Image source = {placeLiked? placeLikeOutline:placeLikeFilled} style = {{alignSelf:'center', width:20,height:20,resizeMode:'contain'}}/>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={toggleUserLike}>
                                <Image source = {userLiked? userLikeOutline:userLikeFilled} style = {{alignSelf:'center', width:20,height:20,resizeMode:'contain'}}/>
                            </TouchableOpacity>
                            
                        </View>
                        </View>
                    </View>
                
            </View>
        )
    }

  return (
    <View >
        <FlatList
        data = {post}
        renderItem = {(item,index)=>renderItem(item,index)}
        keyExtractor = {(item,index)=>{return index.toString()}}/>
    </View>
  )
}

export default CustomCarousel