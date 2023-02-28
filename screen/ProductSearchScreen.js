import React,{useState, useEffect} from 'react'
import { Text, View, StatusBar,TextInput, FlatList, Image } from 'react-native'
import { Container, Detail, Detail2, Detail3, Header, StyledTouchableOpacity, windowWidth } from '../design/styledComponents'
import { getStatusBarHeight } from 'react-native-status-bar-height';
import  Icon  from 'react-native-vector-icons/Ionicons'
import axios from 'axios';
import BASE_URL from '../BASE_URL';
import { priceToString } from '../functions';

const ProductSearchScreen = ({navigation}) => {
    const [products,setProducts] = useState([])
    const StatusBarHeight = Platform.OS === 'ios' ? getStatusBarHeight(true) : StatusBar.currentHeight;

    
  const getProductsData = async() =>{
    await axios.get(`${BASE_URL}/products`)
    .then(res=>{
        setProducts(res.data)
    })
    .catch(error=>console.log(error))
    }

    useEffect(()=>{getProductsData()},[])

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
                        <TextInput placeholder='상품 검색' placeholderTextColor={'#f8f9fa'} style = {{ paddingHorizontal:20, textAlignVertical:'center', fontFamily:'NotoSansKR-Regular', color : '#adb5bd',borderColor:'#adb5bd',borderRadius:30, borderWidth:.3,height:48,width:windowWidth-32-48*2, fontSize:16,  lineHeight:40}}/>
                        <StyledTouchableOpacity onPress = {()=>{}} style = {{position:'absolute', right:10}}>
                            <Icon name="md-search" size={20} color = '#f8f9fa' />
                        </StyledTouchableOpacity>
                    </View>
                </View>
                <View style = {{flexDirection:'row'}}>
                    <StyledTouchableOpacity onPress = {()=>{}}>
                        <Icon name="md-cart-outline" size={24} color = '#f8f9fa' />
                    </StyledTouchableOpacity>
                </View>
            </View>
        </Header>
        <FlatList
        data = {products}
        renderItem={(itemData)=>(
            <View style = {{flexDirection:'row',borderBottomColor:'#f8f9fa', borderBottomWidth:.5, paddingVertical:12, alignSelf:'center', width:windowWidth-32}}>
                <Image source = {{uri:itemData.item.image_url}} style = {{width:'30%',height:(windowWidth-32)*.3}}/>
                <View style = {{width:'70%', paddingHorizontal:8,justifyContent:'space-evenly'}}>
                        <Detail style = {{lineHeight:24,fontSize:20}}>{itemData.item.name}</Detail>
                        <Detail3 style = {{lineHeight:32,fontSize:16}}>{itemData.item.brand}</Detail3>
                        <Detail2 style = {{lineHeight:20,fontSize:14}}>{priceToString(itemData.item.price)}원</Detail2>
                </View>
            </View>
        )}/>
    </Container>
  )
}

export default ProductSearchScreen