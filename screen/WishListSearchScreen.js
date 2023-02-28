import React,{useState, useEffect} from 'react'
import { Text, View, StatusBar,TextInput, FlatList, Image, TouchableOpacity } from 'react-native'
import { Container, Detail, Detail2, Detail3, Header, StyledTouchableOpacity, windowWidth } from '../design/styledComponents'
import { getStatusBarHeight } from 'react-native-status-bar-height';
import  Icon  from 'react-native-vector-icons/Ionicons'
import axios from 'axios';
import BASE_URL from '../BASE_URL';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { priceToString } from '../functions';

const WishListSearchScreen = ({navigation}) => {
    const [products,setProducts] = useState([])
    const [currentId, setCurrentId] = useState(0)
    const [post, setPost] = useState([])
    const StatusBarHeight = Platform.OS === 'ios' ? getStatusBarHeight(true) : StatusBar.currentHeight;

    const getDataFromAsyncStorage = async ()=>{
        try{
            const currentId = await AsyncStorage.getItem('currentId');
            const res = await axios.get(`${BASE_URL}/friends-wishlist`,{
                params:{
                    followerId:currentId
                }
            })
            setProducts(res.data)
        } catch(error){
            console.log(error.message)
        }
    }

    useEffect(()=>{
        getDataFromAsyncStorage()
    },[])

    const handleItemPress = (item) =>{
        navigation.navigate('WishListDetail',{item})
    }


  return (
    <Container style = {{paddingTop:StatusBarHeight}}>
        <StatusBar translucent backgroundColor={'transparent'}/>
        {console.log(products)}
        <Header>
            <View style = {{flexDirection:'row',alignItems:'center',justifyContent:'space-between',flex:1}}>
                <View style = {{width:windowWidth-32-48*2, flexDirection:'row'}}>
                    <StyledTouchableOpacity onPress={()=>{navigation.goBack()}}>
                        <Icon name="md-chevron-back-outline" size={24} color = '#f8f9fa' />
                    </StyledTouchableOpacity>
                    <View style = {{flexDirection:'row', alignItems:'center'}}>
                        <Detail style = {{lineHeight:36}}>내 주변의 위시리스트</Detail>
                    </View>
                </View>
                <View style = {{flexDirection:'row'}}>
                    <StyledTouchableOpacity onPress = {()=>{}}>
                        <Icon name="md-menu-outline" size={24} color = '#f8f9fa' />
                    </StyledTouchableOpacity>
                </View>
            </View>
        </Header>
        <Header>
            <View style = {{flexDirection:'row',alignItems:'center',justifyContent:'center',flex:1}}>
                <View style = {{width:windowWidth-32, flexDirection:'row'}}>
                    <View style = {{flexDirection:'row',width:windowWidth-32}}>
                        <TextInput placeholder='친구 검색' placeholderTextColor={'#f8f9fa'} style = {{ paddingHorizontal:20, textAlignVertical:'center', fontFamily:'NotoSansKR-Regular', color : '#adb5bd',borderColor:'#adb5bd',borderRadius:30, borderWidth:.3,height:48,width:'100%', fontSize:16,  lineHeight:40}}/>
                        <StyledTouchableOpacity onPress = {()=>{}} style = {{position:'absolute', right:10}}>
                            <Icon name="md-search" size={20} color = '#f8f9fa' />
                        </StyledTouchableOpacity>
                    </View>
                </View>
            </View>
        </Header>
        <FlatList
        data = {products}
        keyExtractor={(item,index)=>{return index.toString()}}
        renderItem={(itemData,index)=>(
            <View style = {{width:windowWidth-32, paddingBottom:16,borderColor:'#f8f9fa', borderTopColor:.5, borderBottomWidth:.5,alignSelf:'center'}}>
                <TouchableOpacity style = {{flexDirection:'row', marginTop:16,alignItems:'center',margin:12}}>
                    <Image source = {{uri:itemData.item.profileImageUri}} style = {{width:30,height:30,borderRadius:15,marginRight:12}}/>
                    <Detail style = {{fontSize:16, lineHeight:20}}>{itemData.item.username}</Detail>
                </TouchableOpacity>
                <TouchableOpacity onPress={()=>{
                    handleItemPress(itemData.item.id)
                }} style = {{flexDirection:'row',alignSelf:'center' }}>
                    <Image source = {{uri:itemData.item.image_url}} style = {{width:'20%',height:.2*windowWidth}}/>
                    <View style = {{marginLeft:12, justifyContent:'space-between'}}>
                        <View>
                            <Detail2 style = {{fontSize:18, lineHeight:32}}>{itemData.item.name}</Detail2>
                            <View style = {{flexDirection:'row', justifyContent:'space-between', width:windowWidth-48-windowWidth*.2}}>
                                <Detail3 style = {{fontSize:14}}>{itemData.item.category}</Detail3>
                                <Detail3 style = {{fontSize:14}}>{priceToString(itemData.item.piece)} 조각</Detail3>
                            </View>
                        </View>
                        <View style = {{flexDirection:'row', justifyContent:'space-between', width:windowWidth-48-windowWidth*.2}}>
                            <Detail3 style = {{fontSize:14}}>{priceToString(itemData.item.piece_price)} 원/조각</Detail3>
                            <Detail3 style = {{fontSize:14}}>{priceToString(itemData.item.price)} 원</Detail3>
                        </View>
                    </View>
                </TouchableOpacity>
            </View>
        )}/>
    </Container>
  )
}

export default WishListSearchScreen