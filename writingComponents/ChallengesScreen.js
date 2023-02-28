import React,{useEffect,useState} from 'react'
import { Text, View, StatusBar,TextInput, Platform, FlatList, Image, TouchableOpacity, ScrollView } from 'react-native'
import { Container, Detail, Detail3, Header, StyledTouchableOpacity, windowWidth } from '../design/styledComponents'
import { getStatusBarHeight } from 'react-native-status-bar-height';
import  Icon  from 'react-native-vector-icons/Ionicons'
import axios from 'axios'
import BASE_URL from '../BASE_URL';
import AsyncStorage from '@react-native-async-storage/async-storage';


const ChallengesScreen = ({ navigation}) => {
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
    <Container style = {{paddingTop:StatusBarHeight, }}>
        {console.log(challenges)}
        <StatusBar translucent backgroundColor={'transparent'}/>
        <Header>
            <View style = {{flexDirection:'row',alignItems:'center',justifyContent:'space-between',flex:1}}>
                <View style = {{width:windowWidth-32-48*2, flexDirection:'row'}}>
                    <StyledTouchableOpacity onPress={()=>{navigation.goBack()}}>
                        <Icon name="md-chevron-back-outline" size={24} color = '#f8f9fa' />
                    </StyledTouchableOpacity>
                    <View style = {{flexDirection:'row'}}>
                        <TextInput placeholder='챌린지 검색' placeholderTextColor={'#f8f9fa'} style = {{ paddingHorizontal:20, textAlignVertical:'center', fontFamily:'NotoSansKR-Regular', color : '#adb5bd',borderColor:'#adb5bd',borderRadius:30, borderWidth:.3,height:48,width:windowWidth-32-48*2, fontSize:16,  lineHeight:40}}/>
                        <StyledTouchableOpacity onPress = {()=>{}} style = {{position:'absolute', right:10}}>
                            <Icon name="md-search" size={20} color = '#f8f9fa' />
                        </StyledTouchableOpacity>
                    </View>
                </View>
                <View style = {{flexDirection:'row'}}>
                    <StyledTouchableOpacity onPress = {()=>{navigation.navigate({
                        name:'WritingDetail',
                        params:{
                            isSelectedChallenges
                        }
                    })}} style = {{}}>
                        <Detail>완료</Detail>
                    </StyledTouchableOpacity>
                </View>
            </View>
        </Header>
        <View>
            <ScrollView horizontal style = {{padding:16,marginBottom:0}}>
            <TouchableOpacity id='친구' onPress={()=>{setSort('인기')}} style = {{backgroundColor:sort==='인기'?'#f8f9fa':'#495057',paddingHorizontal:20, borderRadius:20, marginHorizontal:8, height:30, marginVertical:0}}>
                <Detail3 style = {{fontSize:12, color: sort ==='인기'?'#495057':'#f8f9fa',}}>인기</Detail3>
            </TouchableOpacity>
            <TouchableOpacity id='장소' onPress={()=>{setSort('참여중')}} style = {{backgroundColor:sort==='참여중'?'#f8f9fa':'#495057',paddingHorizontal:20, borderRadius:20, marginHorizontal:8, height:30, marginVertical:0}}>
                <Detail3 style = {{fontSize:12, color: sort ==='참여중'?'#495057':'#f8f9fa'}}>참여중</Detail3>
            </TouchableOpacity>
            </ScrollView>
        </View>
        <FlatList
        data = {challenges}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
            <TouchableOpacity onPress={()=>{handlePress(item)}} style = {{ backgroundColor:isSelectedChallenges.includes(item)?'#343A40':'transparent', flexDirection:'row', padding:16, alignItems:'center'}}>
                <Image source={{uri:item.thumbnailUri}} style = {{width:30,height:30, borderRadius:20, marginRight:16}}/>
                <View style = {{width:windowWidth-80}}>
                    <Detail style = {{fontSize:16, lineHeight:20}}>{item.title}</Detail>
                    <Detail style = {{fontSize:16, lineHeight:20}}>{item.cid}</Detail>
                    <Detail3 style = {{fontSize:12, lineHeight:20}}>{item.detail}</Detail3>
                </View>
                {console.log(isSelectedChallenges)}
            </TouchableOpacity>
        )}
        />
    </Container>
  )
}

export default ChallengesScreen