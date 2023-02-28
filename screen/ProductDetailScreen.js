import React, {useEffect, useState} from 'react'
import { Text, View, StatusBar,TextInput,Image, TouchableOpacity } from 'react-native'
import { SubTitle, Container, Detail, Detail3, Header, StyledTouchableOpacity, windowHeight, windowWidth } from '../design/styledComponents'
import { getStatusBarHeight } from 'react-native-status-bar-height';
import  Icon  from 'react-native-vector-icons/Ionicons'
import axios from 'axios'
import BASE_URL from '../BASE_URL';
import Modal from 'react-native-modal'
import LinearGradient from 'react-native-linear-gradient';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { priceToString } from '../functions';

const ProductDetailScreen = ({route, navigation}) => {
    const [product,setProduct] = useState([])
    const [showSelectionModal, setShowSelectionModal] = useState(false)
    const [showCompletionModal, setShowCompletionModal] = useState(false)
    const [pieces, setPieces] = useState(1)
    // const [piece_price,setPiecePrice] = useState(0)
    const [currentId, setCurrentId] = useState('')
    let piece_price
    // const [results,setResults] = useState([])
    let results

    
    const getProductsData = async() =>{
      await axios.get(`${BASE_URL}/products/${route.params.item.product_id}`)
      .then(res=> {setProduct(...res.data) })
      .catch(error=>console.log(error))
  }

  useEffect(()=>{getProductsData()},[])

  
  useEffect(()=>{   
    getCurrentId()     
},[])
const getCurrentId = async()=>{
    setCurrentId(await AsyncStorage.getItem('currentId'))
}

  const postToWishList = async()=>{
    await axios.post(`${BASE_URL}/wishlist`,{
        currentId:currentId,
        product_id:product.id,
        piece : results,
        piece_price : piece_price
    }).then(res=>console.log(res.data))
  }

    const StatusBarHeight = Platform.OS === 'ios' ? getStatusBarHeight(true) : StatusBar.currentHeight;

    const onComplete = ()=>{
        results=pieces
        piece_price = Math.ceil((product.price/results)/10)*10
        console.log(piece_price)
        setShowSelectionModal(false)
        setShowCompletionModal(true)
    }

  return (
    <Container style = {{paddingTop:StatusBarHeight}}>
        <StatusBar translucent backgroundColor={'transparent'}/>
        <View style = {{height:56, position:'absolute', top:StatusBarHeight, left:0, zIndex:10, backgroundColor:'transparent'}}>
            <LinearGradient colors={['transparent','#212529']} start={{x:0,y:1}} end={{x:0,y:0}} style = {{position:'absolute',top:0,left:0, width:windowWidth,height:'100%', borderBottomLeftRadius:8,borderBottomRightRadius:8,justifyContent:'flex-end'}}/>
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
        <Image source={{uri:product.image_url}} style = {{width:windowWidth,height:windowWidth}}/>
        <View style = {{padding:16}}>
            <View style = {{flexDirection:'row', alignItems:'center', justifyContent:'space-between'}}>
                <Detail style = {{fontSize:30, lineHeight:36}}>{product.name}</Detail>
                <View style = {{alignItems:'flex-end'}}>
                    <Detail3 style = {{fontSize:16, lineHeight:24}}>{product.brand}</Detail3>
                    <Detail3 style = {{fontSize:16, lineHeight:24}}>{product.category}</Detail3>
                </View>
            </View>
            <Detail3 style = {{fontSize:12}}>{product.description}</Detail3>
            <Detail3 style = {{fontSize:14}}>{product.price!==undefined? priceToString(product.price):null}원</Detail3>
        </View>
        <Modal style = {{margin:0}} useNativeDriver={true} isVisible={showSelectionModal} onBackButtonPress={()=>{setShowSelectionModal(false)}}>
            <View style = {{backgroundColor:'#212529', position:'absolute',bottom:0,left:0,right:0,marginHorizontal:0, borderTopLeftRadius:30, borderTopRightRadius:30, elevation:10, shadowColor:'black', shadowOffset:{x:0,y:6}}}>
                <StyledTouchableOpacity onPress={()=>{setShowSelectionModal(false)}} style = {{ margin:16}}>
                    <Icon name='md-close-outline' size={30} color={'white'}/>
                </StyledTouchableOpacity>
                <View style = {{paddingHorizontal:16, backgroundColor:'transparent', width:'100%'}}>
                    <Detail>
                        몇 조각으로 나누겠습니까?
                    </Detail>
                    <View style = {{backgroundColor:'#343A40', flexDirection:'row', alignItems:'center',  justifyContent:'space-evenly', marginVertical:16, borderRadius:100}}>
                        <StyledTouchableOpacity style = {{backgroundColor:pieces>1?'#495057':'transparent', borderRadius:100, justifyContent:'center', alignItems:'center',elevation:pieces>1?10:0, shadowColor:'black', shadowOffset:{x:0,y:6}}} onPress={()=>{pieces>1?setPieces(pieces-1):null}}>{pieces>1?(<Icon name='md-remove-sharp' size={24} color='#f8f9fa'/>):null}</StyledTouchableOpacity>
                        <StyledTouchableOpacity style = {{width:'30%', margin:16,alignItems:'center'}}>
                            <Detail>조각수</Detail>
                            <Detail3 style = {{lineHeight:32}}>{pieces}</Detail3>
                        </StyledTouchableOpacity>
                        <StyledTouchableOpacity style = {{width:'30%', margin:16,alignItems:'center'}}>
                            <Detail>가격</Detail>
                            <Detail3 style = {{lineHeight:32}}>{product.price!==undefined? priceToString(Math.ceil((product.price/pieces)/10)*10):null}</Detail3>
                        </StyledTouchableOpacity>
                        <StyledTouchableOpacity style = {{backgroundColor:'#495057', borderRadius:100, justifyContent:'center', alignItems:'center', elevation:10, shadowColor:'black', shadowOffset:{x:0,y:6}}} onPress={()=>{setPieces(pieces+1)}}><Icon name = 'md-add-sharp' size={24} color='#f8f9fa'/></StyledTouchableOpacity>
                    </View>
                    <View>
                        <Detail>조각 수</Detail>
                        <View style = {{flexDirection:'row', justifyContent:'space-evenly'}}>
                            <StyledTouchableOpacity style = {{width:'20%', backgroundColor:'#343A40', borderRadius:100, justifyContent:'center', alignItems:'center', margin:16, elevation:10, shadowColor:'black', shadowOffset:{x:0,y:6}}} onPress={()=>{setPieces(10)}}><Detail3 style = {{fontSize:16}}>10</Detail3></StyledTouchableOpacity>
                            <StyledTouchableOpacity style = {{width:'20%', backgroundColor:'#343A40', borderRadius:100, justifyContent:'center', alignItems:'center', margin:16, elevation:10, shadowColor:'black', shadowOffset:{x:0,y:6}}} onPress={()=>{setPieces(30)}}><Detail3 style = {{fontSize:16}}>30</Detail3></StyledTouchableOpacity>
                            <StyledTouchableOpacity style = {{width:'20%', backgroundColor:'#343A40', borderRadius:100, justifyContent:'center', alignItems:'center', margin:16, elevation:10, shadowColor:'black', shadowOffset:{x:0,y:6}}} onPress={()=>{setPieces(50)}}><Detail3 style = {{fontSize:16}}>50</Detail3></StyledTouchableOpacity>
                            <StyledTouchableOpacity style = {{width:'20%', backgroundColor:'#343A40', borderRadius:100, justifyContent:'center', alignItems:'center', margin:16, elevation:10, shadowColor:'black', shadowOffset:{x:0,y:6}}} onPress={()=>{setPieces(100)}}><Detail3 style = {{fontSize:16}}l>100</Detail3></StyledTouchableOpacity>
                        </View>
                    </View>
                    <View>
                        <Detail>가격</Detail>
                        <View style = {{flexDirection:'row', justifyContent:'space-evenly'}}>
                            <StyledTouchableOpacity style = {{width:'20%', backgroundColor:'#343A40', borderRadius:100, justifyContent:'center', alignItems:'center', margin:16, elevation:10, shadowColor:'black', shadowOffset:{x:0,y:6}}} onPress={()=>{setPieces(Math.ceil(product.price/1000))}}><Detail3 style = {{fontSize:16}}>1천원</Detail3></StyledTouchableOpacity>
                            <StyledTouchableOpacity style = {{width:'20%', backgroundColor:'#343A40', borderRadius:100, justifyContent:'center', alignItems:'center', margin:16, elevation:10, shadowColor:'black', shadowOffset:{x:0,y:6}}} onPress={()=>{setPieces(Math.ceil(product.price/5000))}}><Detail3 style = {{fontSize:16}}>5천원</Detail3></StyledTouchableOpacity>
                            <StyledTouchableOpacity style = {{width:'20%', backgroundColor:'#343A40', borderRadius:100, justifyContent:'center', alignItems:'center', margin:16, elevation:10, shadowColor:'black', shadowOffset:{x:0,y:6}}} onPress={()=>{setPieces(Math.ceil(product.price/10000))}}><Detail3 style = {{fontSize:16}}>1만원</Detail3></StyledTouchableOpacity>
                            <StyledTouchableOpacity style = {{width:'20%', backgroundColor:'#343A40', borderRadius:100, justifyContent:'center', alignItems:'center', margin:16, elevation:10, shadowColor:'black', shadowOffset:{x:0,y:6}}} onPress={()=>{setPieces(Math.ceil(product.price/50000))}}><Detail3 style = {{fontSize:16}}l>5만원</Detail3></StyledTouchableOpacity>
                        </View>
                    </View>
                    <View style = {{flexDirection:'row', justifyContent:'space-evenly'}}>
                        <StyledTouchableOpacity style = {{backgroundColor:'#343A40', width:windowWidth-32, borderRadius:100, justifyContent:'center', alignItems:'center', flexDirection:'row', alignItems:'center', margin:16, elevation:10, shadowColor:'black', shadowOffset:{x:0,y:6}}} onPress={()=>{
                            onComplete()
                            postToWishList()
                            }}>
                                <Detail>위시리스트 등록</Detail>
                                <Icon style = {{marginLeft:12}} name='md-cart-outline' size={24} color={'#f8f9fa'}/>
                                </StyledTouchableOpacity>
                    </View>
                </View>
            </View>
        </Modal>

        <Modal style = {{margin:0}} useNativeDriver={true} isVisible={showCompletionModal} onBackButtonPress={()=>{setShowCompletionModal(false)}} >
            <View style = {{backgroundColor:'#212529', width:windowWidth-32, borderRadius:20, alignSelf:'center',elevation:10,shadowColor:'black',shadowOffset:{x:0,y:6}}}>
                {/* <StyledTouchableOpacity onPress={()=>{setShowCompletionModal(false)}} style = {{ margin:16,marginBottom:0}}>
                    <Icon name='md-close-outline' size={30} color={'white'}/>
                </StyledTouchableOpacity> */}
                <View style = {{alignItems:'center',justifyContent:'center',margin:16}}>
                    <Detail style = {{lineHeight:40,marginVertical:12,fontSize:30}}>조각 완료!</Detail>
                    <Detail3 style = {{lineHeight:36,marginVertical:0,fontSize:14}}>{product.name}을 {pieces}조각으로 나눴습니다!</Detail3>
                    <Detail3 style = {{lineHeight:36,marginVertical:0,fontSize:14}}>위시리스트로 이동할까요?</Detail3>
                </View>
                <View style = {{alignItems:'center', flexDirection:'row',justifyContent:'space-evenly',margin:16,marginTop:0}}>
                    <TouchableOpacity onPress={()=>{
                        navigation.navigate('WishList')
                        setShowCompletionModal(false)
                        }} style = {{backgroundColor:'#343a40', padding:20,paddingVertical:12,borderRadius:100,width:'30%',alignItems:'center',justifyContent:'center'}}>
                        <Detail style = {{fontSize:16,lineHeight:24}}>네</Detail>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={()=>{setShowCompletionModal(false)}} style = {{backgroundColor:'#343a40', padding:20,paddingVertical:12,borderRadius:100,width:'30%', alignItems:'center',justifyContent:'center'}}>
                        <Detail style = {{fontSize:16,lineHeight:24}}>아니요</Detail>
                    </TouchableOpacity>
                </View>
            </View>
        </Modal>
        <View style = {{position:'absolute', bottom:20, width:windowWidth, justifyContent:'space-evenly', flexDirection:'row'}}>
            <TouchableOpacity onPress={()=>{setShowSelectionModal(true)}} style = {{padding:12, alignItems:'center', justifyContent:'center',width:windowWidth-32, borderRadius:50, backgroundColor:'#DEE2E6',flexDirection:'row'}}>
                <SubTitle style = {{color:'#212529', fontSize:16,lineHeight:20}}>조각내기</SubTitle>
                <Icon name='md-square' size={20} color='black' style = {{marginHorizontal:8}}/>
            </TouchableOpacity>
        </View>
    </Container>
  )
}

export default ProductDetailScreen