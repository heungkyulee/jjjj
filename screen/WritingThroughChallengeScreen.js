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
import Modal from 'react-native-modal'


const WritingThroughChallengeScreen = ({route,navigation}) => {   

  const [data, setData] = useState('')
  const [selected,setSelected] = useState('')
  const [users, setUsers] = useState([])
  const [image, setImage] = useState('')
  const [friends, setFriends] = useState([])
  const [challenge, setChallenge] = useState([])
  const [places, setPlaces] = useState([])
  const [currentId, setCurrentId] = useState('')
  const [friendsModal,setFriendsModal] = useState(false)
  const [placesModal,setPlacesModal] = useState(false)
  const [challengesModal,setChallengesModal] = useState(false)
  
  // console.log(route)
  // const friendsParam = route.getParam('isSelected')

  useEffect(()=>{
    getDataFromAsyncStorage()
  },[])

//   useEffect(()=>{
//     if(image===''){
//       setImage(route.params.image)
//     }
//   },[])

useEffect(()=>{
    setChallenge(route.params)
})

  useEffect(()=>{
    if( route.params.isSelectedFriends!==undefined){
      setFriends(route.params.isSelectedFriends)
    }
  },[route.params.isSelectedFriends])
  useEffect(()=>{
    if ( route.params.isSelectedChallenges!==undefined)
      setChallenge(route.params.isSelectedChallenges)
  },[route.params.isSelectedChallenges])
  useEffect(()=>{
    if(route.params.isSelectedPlaces!==undefined)
      setPlaces(route.params.isSelectedPlaces)
  },[route.params.isSelectedPlaces])

  
  const getDataFromAsyncStorage = async ()=>{
    try{
        let currentId = await AsyncStorage.getItem('currentId');
        
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
          challenge_id:Number(challenge.map(item=>item.cid)),
          detail_content:data,
          thumbnailUri:image
      })
      .then(res=>console.log(res.data))
      .then(navigation.navigate('Tabs'))
      .catch(error=>console.log(error))
  }


  const isFriendSelected = (item)=>{
    if(friends.includes(item)){
        setFriends(friends.pop(item))
    } else {
        setFriends(friends.push(item))
    }
  }

  const StatusBarHeight = Platform.OS === 'ios' ? getStatusBarHeight(true) : StatusBar.currentHeight;

return (
  <Container style = {{paddingTop:StatusBarHeight}}>
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
      {console.log(users)}
      <KeyboardAwareScrollView>
        <View style = {{}}>
          {image===''?(
              null
              ):(
              <Image source = {{uri:image}} style = {{width:windowWidth,height:windowWidth}}/>
          )}
        </View>

        <Modal style = {{margin:0}} useNativeDriver={true} isVisible={friendsModal} onBackButtonPress={()=>{setFriendsModal(false)}}>
            <View style = {{backgroundColor:'#212529', position:'absolute',bottom:0,left:0,right:0,marginHorizontal:0, borderTopLeftRadius:30, borderTopRightRadius:30, elevation:10, shadowColor:'white', shadowOffset:{x:0,y:-6}, padding:16}}>
                <View style = {{flexDirection:'row', justifyContent:'space-between',alignItems:'center'}}>
                    <StyledTouchableOpacity onPress={()=>{setFriendsModal(false)}}>
                        <Icon name = 'md-close-outline' size={24} color={'#f8f9fa'}/>
                    </StyledTouchableOpacity>
                    <Detail>어떤 친구와 함께하나요?</Detail>
                    <View style = {{width:48}}></View>
                </View>     
                <View style = {{flexDirection:'row',alignItems:'center',justifyContent:'center',flex:1, marginVertical:12}}>
                    <View style = {{width:windowWidth-32, flexDirection:'row'}}>
                        <View style = {{flexDirection:'row',width:windowWidth-32}}>
                            <TextInput placeholder='친구 찾기' placeholderTextColor={'#f8f9fa'} style = {{ paddingHorizontal:20, textAlignVertical:'center', fontFamily:'NotoSansKR-Regular', color : '#adb5bd',borderColor:'#adb5bd',borderRadius:30, borderWidth:.3,height:48,width:'100%', fontSize:16,  lineHeight:40}}/>
                            <StyledTouchableOpacity onPress = {()=>{}} style = {{position:'absolute', right:10}}>
                                <Icon name="md-search" size={20} color = '#f8f9fa' />
                            </StyledTouchableOpacity>
                        </View>
                    </View>
                </View>
                {console.log(friends)}
                <View style = {{flexDirection:'row'}}>
                {users.map(item=>(
                        <TouchableOpacity onPress={()=>{isFriendSelected(item.username)}} key={item.uid} style = {{backgroundColor:'#f8f9fa',margin:8,padding:12,paddingVertical:4, borderRadius:20, flexDirection:'row',justifyContent:'space-between'}}>
                            <Image source={{uri:item.profileImageUri}} style = {{width:30,height:30,borderRadius:15,marginRight:8}}/>
                            <Detail3 style = {{lineHeight:36, color:'#191919', fontSize:12}}>{item.username}</Detail3>
                        </TouchableOpacity>
              ))}            
              </View>
              </View>
        </Modal>
        <Modal style = {{margin:0}} useNativeDriver={true} isVisible={placesModal} onBackButtonPress={()=>{setPlacesModal(false)}}>
            <View style = {{backgroundColor:'#212529', position:'absolute',bottom:0,left:0,right:0,marginHorizontal:0, borderTopLeftRadius:30, borderTopRightRadius:30, elevation:10, shadowColor:'black', shadowOffset:{x:0,y:6}}}>
            </View>
        </Modal>
        <Modal style = {{margin:0}} useNativeDriver={true} isVisible={challengesModal} onBackButtonPress={()=>{setChallengesModal(false)}}>
            <View style = {{backgroundColor:'#212529', position:'absolute',bottom:0,left:0,right:0,marginHorizontal:0, borderTopLeftRadius:30, borderTopRightRadius:30, elevation:10, shadowColor:'black', shadowOffset:{x:0,y:6}}}>
            </View>
        </Modal>

        <ScrollView horizontal style = {{margin:16,marginBottom:0}}>
          <TouchableOpacity id='친구' onPress={()=>{setFriendsModal(true)}} style = {{backgroundColor:'#495057',paddingHorizontal:20, borderRadius:20, marginHorizontal:8}}>
            <Detail3 style = {{fontSize:12}}>친구</Detail3>
          </TouchableOpacity>
          <TouchableOpacity id='장소' onPress={()=>{setPlacesModal(true)}} style = {{backgroundColor:'#495057',paddingHorizontal:20, borderRadius:20, marginHorizontal:8}}>
            <Detail3 style = {{fontSize:12}}>장소</Detail3>
          </TouchableOpacity>
          <TouchableOpacity id='챌린지' onPress={()=>{setChallengesModal(true)}} style = {{backgroundColor:challenge===undefined?'#495057':'#343a40',paddingHorizontal:20, borderRadius:20, marginHorizontal:8}}>
            <Detail3 style = {{fontSize:12}}>챌린지</Detail3>
          </TouchableOpacity>
          <TouchableOpacity id='공개범위' onPress={()=>{navigation.navigate('Friends')}} style = {{backgroundColor:'#495057',paddingHorizontal:20, borderRadius:20, marginHorizontal:8}}>
            <Detail3 style = {{fontSize:12}}>공개범위</Detail3>
            {/* {console.log(selected)} */}
          </TouchableOpacity>
        </ScrollView>
        <View>
        {/* {friends!==undefined?(
          
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
        ):null} */}
        </View>
        <View>
        {places!==undefined?(
          <View>
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
          </View>
        ):null}
        </View>
        <View>
        {challenge!==undefined?(
          <View>
            <ScrollView
            horizontal>
              <TouchableOpacity style = {{backgroundColor:'#f8f9fa',marginHorizontal:8, borderRadius:20, paddingHorizontal:20, marginTop:16}}>
                    <Detail3 style = {{lineHeight:36, color:'#191919', fontSize:12}}>{challenge.title}</Detail3>
              </TouchableOpacity>
            </ScrollView>
          </View>
        ):null}
        </View>
        <View style = {{width:windowWidth}}>
          <TextInput multiline onChangeText={(item)=>{setData(item)}} placeholder='내용을 작성해주세요' placeholderTextColor={'white'} style = {{borderColor:'#dee2e6', elevation : 10, backgroundColor:'#212529', borderWidth:.5 , borderBottomWidth:1 ,margin:16, alignContent:'flex-start',justifyContent:'flex-start',padding:20,color:'white'}}/>
        </View>
      </KeyboardAwareScrollView>
  </Container>
)
}

export default WritingThroughChallengeScreen