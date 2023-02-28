import React, { useEffect, useState } from 'react'
import { FlatList, Text, View, Image, TouchableOpacity } from 'react-native'
import axios from 'axios'
import BASE_URL from '../BASE_URL'
import { Detail, Detail3,SubTitle2 } from '../design/styledComponents'
import  Icon  from 'react-native-vector-icons/Ionicons'
import AsyncStorage from '@react-native-async-storage/async-storage'



const LookForFriends = ({navigation}) => {
    const [users, setUsers] = useState([])
    const [willBeFollowed,setWillBeFollowed] = useState('')
    const [currentId, setCurrentId] = useState(null)
    const [loading, setLoading] = useState(true)

    const getDataFromAsyncStorage = async ()=>{
        try{
            let currentId = await AsyncStorage.getItem('currentId');
            const res = await axios.get(`${BASE_URL}/unfollowing-user`,{
                params:{
                    followerId:currentId
                }
            })
            // console.log(currentId)
            setUsers(res.data)
        } catch(error){console.log(error.message)}
    }

    useEffect(()=>{
        getDataFromAsyncStorage()
        followCheck()
    },[])


    const follow = async(followedId)=>{

        let currentId = await AsyncStorage.getItem('currentId');

        axios.post(`${BASE_URL}/follow`,{
            followerId:Number(currentId),
            followedId:followedId
        })
        .then((res)=>{
            // console.log(res.data)
        })
    }

    
    const followCheck = (currentId, followedId)=>{
        axios.get(`${BASE_URL}/follow-check`,{
            params:{
                followerId:currentId,
                followedId:followedId
            }
        })
    }


    const renderItem = (itemData,index)=>{
        return(
            <View key={index} style = {{margin:16,width:100,backgroundColor:'black',alignItems:'center',justifyContent:'center',paddingVertical:12,marginBottom:20, elevation:10, shadowColor:'white',shadowOffset:{x:0,y:0},borderRadius:8}}>
                <TouchableOpacity style = {{position:'absolute',top:'3%',left:'3%',height:24, width:24,backgroundColor:'',alignItems:'center',justifyContent:'center'}}>
                    <Icon name='md-close-outline' size={16} color='#f8f9fa'/>
                </TouchableOpacity>
                <View style = {{alignItems:'center', marginTop:10}}>
                    <Image source = {{uri:`${itemData.item.profileImageUri}`}} style = {{width:48,height:48, borderRadius:20,zIndex:2}}/>
                    <Detail style = {{color:'white', fontSize:14,margin:8}}>{itemData.item.username}</Detail>
                </View>
                <TouchableOpacity onPress = {()=>{follow( itemData.item.uid)}} style = {{backgroundColor:'#6c757d',width:'80%',padding:6,alignItems:'center',elevation:11, borderRadius:8,shadowColor:'white',shadowOffset:{x:0,y:0}}}>
                    <Detail3 style = {{fontSize:12,lineHeight:16}}>팔로우</Detail3>
                </TouchableOpacity>
                <Text style = {{color:'black', fontSize:20,position:'absolute',bottom:0 }}>{itemData.item.detail_content}</Text>
            </View>            
        )
    }

  return (
    users.length===0? null :(
    <View >
        <SubTitle2 style = {{marginHorizontal:16,marginVertical:12,lineHeight:36}}>친구를 찾아보세요.</SubTitle2>

        <FlatList
        data = {users}
        renderItem = {(item,index)=>renderItem(item,index)}
        keyExtractor = {(item,index)=>{return index.toString()}}
        horizontal={true}/>
    </View>
    )
  )
}

export default LookForFriends