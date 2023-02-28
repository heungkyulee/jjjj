import React, { useEffect } from 'react'
import { Text, View, StatusBar,TextInput, PermissionsAndroid,Platform, Image, ScrollView, TouchableOpacity, FlatList } from 'react-native'
import { Container, Detail, Detail3, Header, StyledTouchableOpacity, windowHeight, windowWidth } from '../design/styledComponents'
import { getStatusBarHeight } from 'react-native-status-bar-height';
import  Icon  from 'react-native-vector-icons/Ionicons'
import { useState } from 'react';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import axios from 'axios';
import ViewShot from 'react-native-view-shot';
import Share from 'react-native-share'
import AsyncStorage from '@react-native-async-storage/async-storage';
import BASE_URL from '../BASE_URL';



const WritingDetailScreen = ({route,navigation}) => {   

  const [data, setData] = useState('')
  const [selected,setSelected] = useState('')
  const [users, setUsers] = useState([])
  const [image, setImage] = useState('')
  const [friends, setFriends] = useState([])
  const [challenges, setChallenges] = useState([])
  const [places, setPlaces] = useState([])
  const [currentId, setCurrentId] = useState('')
  
  // console.log(route)
  // const friendsParam = route.getParam('isSelected')

  useEffect(()=>{
    getDataFromAsyncStorage()
  },[])

  useEffect(()=>{
    if(image===''){
      setImage(route.params.image)
    }
  },[])

  useEffect(()=>{
    if( route.params.isSelectedFriends!==undefined){
      setFriends(route.params.isSelectedFriends)
    }
  },[route.params.isSelectedFriends])
  useEffect(()=>{
    if ( route.params.isSelectedChallenges!==undefined)
      setChallenges(route.params.isSelectedChallenges)
  },[route.params.isSelectedChallenges])
  useEffect(()=>{
    if(route.params.isSelectedPlaces!==undefined)
      setPlaces(route.params.isSelectedPlaces)
  },[route.params.isSelectedPlaces])

  
  const getDataFromAsyncStorage = async ()=>{
    try{
        setCurrentId(await AsyncStorage.getItem('currentId'));
        const res = await axios.get(`${BASE_URL}/following-user`,{
            params:{
                followerId:currentId
            }
        })
          setUsers(res.data)
    } catch(error){console.log(error.message)}
}

  const postPostToServer = async() =>{
      await axios.post(`${BASE_URL}/post`, {
          writer_id:currentId,
          place_id:null,
          with_id:friends.map(item=>item.uid),
          challenge_id:Number(challenges.map(item=>item.cid)),
          detail_content:data,
          thumbnailUri:image
      })
      .then(res=>console.log(res.data))
      .then(navigation.navigate('Tabs'))
      .catch(error=>console.log(error))
  }


  const StatusBarHeight = Platform.OS === 'ios' ? getStatusBarHeight(true) : StatusBar.currentHeight;

return (
  <Container style = {{paddingTop:StatusBarHeight}}>
  {console.log(route.params)}
    {/* {console.log(navigation.getParam('isSelected'))} */}
      <StatusBar translucent backgroundColor={'transparent'}/>
      <Header>
          <View style = {{flexDirection:'row',alignItems:'center',justifyContent:'space-between',flex:1}}>
              <View style = {{width:windowWidth-32-48*2, flexDirection:'row',alignItems:'center'}}>
                  <StyledTouchableOpacity onPress={()=>{navigation.goBack()}}>
                      <Icon name="md-chevron-back-outline" size={24} color = '#f8f9fa' />
                  </StyledTouchableOpacity>
              <Detail style = {{lineHeight:36}}>게시글 작성하기</Detail>
                  
              </View>
              <View style = {{flexDirection:'row'}}>
                  <StyledTouchableOpacity onPress={()=>{postPostToServer()}}>
                    <Detail style = {{lineHeight:36,color:'#1E88E5'}}>완료</Detail>
                  </StyledTouchableOpacity>
              </View>
          </View>
      </Header>
      <KeyboardAwareScrollView>
        <View style = {{}}>
          {image!==''?(
            <Image source = {{uri:image}} style = {{width:windowWidth,height:windowWidth}}/>
          ):null}
        </View>
        <ScrollView horizontal style = {{margin:16,marginBottom:0}}>
          <TouchableOpacity id='친구' onPress={()=>{navigation.navigate('Friends')}} style = {{backgroundColor:'#495057',paddingHorizontal:20, borderRadius:20, marginHorizontal:8}}>
            <Detail3 style = {{fontSize:12}}>친구</Detail3>
          </TouchableOpacity>
          <TouchableOpacity id='장소' onPress={()=>{navigation.navigate('Places')}} style = {{backgroundColor:'#495057',paddingHorizontal:20, borderRadius:20, marginHorizontal:8}}>
            <Detail3 style = {{fontSize:12}}>장소</Detail3>
          </TouchableOpacity>
          <TouchableOpacity id='챌린지' onPress={()=>{navigation.navigate('Challenges')}} style = {{backgroundColor:'#495057',paddingHorizontal:20, borderRadius:20, marginHorizontal:8}}>
            <Detail3 style = {{fontSize:12}}>챌린지</Detail3>
          </TouchableOpacity>
          <TouchableOpacity id='공개범위' onPress={()=>{navigation.navigate('Friends')}} style = {{backgroundColor:'#495057',paddingHorizontal:20, borderRadius:20, marginHorizontal:8}}>
            <Detail3 style = {{fontSize:12}}>공개범위</Detail3>
            {/* {console.log(selected)} */}
          </TouchableOpacity>
        </ScrollView>
        <View>
        {friends!==undefined?(
          
          <View>
          <ScrollView
          horizontal>
              {friends.map(item=>(
            <TouchableOpacity key={item.id} style = {{backgroundColor:'#f8f9fa',marginHorizontal:8, borderRadius:20, paddingHorizontal:20, marginTop:16}}>
                  <Detail3 style = {{lineHeight:36, color:'#191919', fontSize:12}}>{item.name}</Detail3>
            </TouchableOpacity>
              ))}
          </ScrollView>
          </View>
        ):null}
        </View>
        <View>
        {places!==undefined?(
          <View>
          {/* {console.log(friends[0].name)} */}
            <FlatList
            data={places}
            renderItem={({item})=>(
            <TouchableOpacity key={item.id} style = {{backgroundColor:'#f8f9fa',marginHorizontal:8, borderRadius:20, paddingHorizontal:20, marginTop:16}}>
              <Detail3 style = {{lineHeight:36, color:'#191919', fontSize:12}}>{item.name}</Detail3>
            </TouchableOpacity>
            )}
            keyExtractor={item=>item.key}
            horizontal
            />
            {/* <ScrollView>
              <TouchableOpacity style = {{backgroundColor:'green', padding:10}}>
                <Detail3 style = {{lineHeight:36,fontSize:12}}>{friends[0].name}</Detail3>
              </TouchableOpacity>
            </ScrollView> */}
          </View>
            // <ScrollView>
            //   <View style = {{backgroundColor:'red', marginBottom:0}}>
            //     <Detail3 style = {{lineHeight:36}}>{places}</Detail3>
            //   </View>
            // </ScrollView>
        ):null}
        </View>
        <View>
        {challenges!==undefined?(
          <View>
          {console.log(challenges)}
            <ScrollView
            horizontal>
                {challenges.map(item=>(
              <TouchableOpacity style = {{backgroundColor:'#f8f9fa',marginHorizontal:8, borderRadius:20, paddingHorizontal:20, marginTop:16}}>
                    <Detail3 style = {{lineHeight:36, color:'#191919', fontSize:12}}>{item.title}</Detail3>
              </TouchableOpacity>
                ))}
            </ScrollView>
          </View>
        ):null}
        </View>
        {console.log(challenges)}
        <View style = {{width:windowWidth}}>
          <TextInput multiline onChangeText={(item)=>{setData(item)}} placeholder='내용을 작성해주세요' placeholderTextColor={'white'} style = {{borderColor:'#dee2e6', elevation : 10, backgroundColor:'#212529', borderWidth:.5 , borderBottomWidth:1 ,margin:16, alignContent:'flex-start',justifyContent:'flex-start',padding:20,color:'white'}}/>
        </View>
        {/* <TextareaAutosize a minRows={1}/> */}
      </KeyboardAwareScrollView>
  </Container>
)
}

export default WritingDetailScreen