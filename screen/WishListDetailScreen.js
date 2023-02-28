import React, {useEffect, useState} from 'react'
import { Text, View, StatusBar,TextInput,Image, TouchableOpacity } from 'react-native'
import { SubTitle, Container, Detail, Detail3, Header, StyledTouchableOpacity, windowHeight, windowWidth, Detail2 } from '../design/styledComponents'
import { getStatusBarHeight } from 'react-native-status-bar-height';
import  Icon  from 'react-native-vector-icons/Ionicons'
import axios from 'axios'
import BASE_URL from '../BASE_URL';
import Modal from 'react-native-modal'
import LinearGradient from 'react-native-linear-gradient';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { priceToString } from '../functions';

const WishListDetailScreen = ({route, navigation}) => {
    const [product,setProduct] = useState([])
    const [showSelectionModal, setShowSelectionModal] = useState(false)
    const [showPaymentModal, setShowPaymentModal] = useState(false)
    const [showCompletionModal, setShowCompletionModal] = useState(false)
    const [pieces, setPieces] = useState(1)
    // const [piece_price,setPiecePrice] = useState(0)
    const [currentId, setCurrentId] = useState('')
    let piece_price
    // const [results,setResults] = useState([])
    let results

    
    const getProductsData = async() =>{
        console.log(route.params.item)
      await axios.get(`${BASE_URL}/wishlist-products/${route.params.item}`)
      .then(res=> {
        console.log(res.data)
        setProduct(...res.data) })
      .catch(error=>console.log(error))
  }

  useEffect(()=>{getProductsData()},[])

  
  useEffect(()=>{   
    getCurrentId()     
},[])
const getCurrentId = async()=>{
    setCurrentId(await AsyncStorage.getItem('currentId'))
}

    const StatusBarHeight = Platform.OS === 'ios' ? getStatusBarHeight(true) : StatusBar.currentHeight;

    const onComplete = ()=>{
        results=pieces*product.piece_price
        console.log(results)
        setShowSelectionModal(false)
        setShowPaymentModal(true)
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
                <StyledTouchableOpacity onPress={()=>{setShowSelectionModal(false)}} style = {{position:'absolute',left:16,top:16}}>
                    <Icon name='md-close-outline' size={30} color={'white'}/>
                </StyledTouchableOpacity>
                
                <View style={{marginBottom:36,marginTop:36}}>
                    <View style = {{flexDirection:'row',justifyContent:'space-between', alignSelf:'center',width:'20%'}}>

                        <View style = {{width:10,height:10,borderRadius:5,backgroundColor:'#f8f9fa'}}/>
                        <View style = {{width:10,height:10,borderRadius:5,backgroundColor:'#6c757d'}}/>
                        <View style = {{width:10,height:10,borderRadius:5,backgroundColor:'#6c757d'}}/>
                    </View>
                </View>
                <View style = {{paddingHorizontal:16, backgroundColor:'transparent', width:'100%'}}>
                    <Detail>
                        몇 조각을 선물할까요?
                    </Detail>
                    <View style = {{backgroundColor:'#343A40', flexDirection:'row', alignItems:'center',  justifyContent:'space-evenly', marginVertical:16, borderRadius:100}}>
                        <StyledTouchableOpacity style = {{backgroundColor:pieces>1?'#495057':'transparent', borderRadius:100, justifyContent:'center', alignItems:'center',elevation:pieces>1?10:0, shadowColor:'black', shadowOffset:{x:0,y:6}}} onPress={()=>{pieces>1?setPieces(pieces-1):null}}>{pieces>1?(<Icon name='md-remove-sharp' size={24} color='#f8f9fa'/>):null}</StyledTouchableOpacity>
                        <StyledTouchableOpacity style = {{width:'30%', margin:16,alignItems:'center'}}>
                            <Detail>조각수</Detail>
                            <Detail3 style = {{lineHeight:32}}>{pieces}</Detail3>
                        </StyledTouchableOpacity>
                        <StyledTouchableOpacity style = {{width:'30%', margin:16,alignItems:'center'}}>
                            <Detail>가격</Detail>
                            <Detail3 style = {{lineHeight:32}}>{product.price!==undefined? priceToString(product.piece_price*pieces):null}</Detail3>
                        </StyledTouchableOpacity>
                        <StyledTouchableOpacity style = {{backgroundColor:'#495057', borderRadius:100, justifyContent:'center', alignItems:'center', elevation:10, shadowColor:'black', shadowOffset:{x:0,y:6}}} onPress={()=>{setPieces(pieces+1)}}><Icon name = 'md-add-sharp' size = {24} color = '#f8f9fa'/></StyledTouchableOpacity>
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
                    <View style = {{flexDirection:'row', justifyContent:'space-evenly'}}>
                        <StyledTouchableOpacity style = {{backgroundColor:'#6c757d', width:windowWidth-32, borderRadius:10, justifyContent:'center', alignItems:'center', flexDirection:'row', alignItems:'center', margin:16, elevation:10, shadowColor:'black', shadowOffset:{x:0,y:6}}} onPress={()=>{
                            onComplete()
                            }}>
                                <Detail>선물하기</Detail>
                                <Icon style = {{marginLeft:12}} name='md-gift-sharp' size={24} color={'#f8f9fa'}/>
                                </StyledTouchableOpacity>
                    </View>
                </View>
            </View>
        </Modal>

        <Modal style = {{margin:0}} useNativeDriver={true} isVisible={showPaymentModal} onBackButtonPress={()=>{
            setShowPaymentModal(false)
            setShowSelectionModal(true)
            }} >
            <View style = {{backgroundColor:'#212529', width:windowWidth-32, borderRadius:20, alignSelf:'center',elevation:10,shadowColor:'black',shadowOffset:{x:0,y:6}}}>
                <StyledTouchableOpacity onPress={()=>{
                    setShowSelectionModal(true)
                    setShowPaymentModal(false)
                }} style = {{position:'absolute',left:16,top:16}}>
                    <Icon name='md-chevron-back-sharp' size={24} color={'white'}/>
                </StyledTouchableOpacity>
                <View style = {{justifyContent:'center',margin:16, padding:16}}>
                    <View style={{flexDirection:'row',justifyContent:'space-between',alignSelf:'center',width:'20%',marginBottom:20}}>
                        <View style = {{width:10,height:10,borderRadius:5,backgroundColor:'#6c757d'}}/>
                        <View style = {{width:10,height:10,borderRadius:5,backgroundColor:'#f8f9fa'}}/>
                        <View style = {{width:10,height:10,borderRadius:5,backgroundColor:'#6c757d'}}/>
                    </View>
                    <View>
                        <Detail style = {{lineHeight:40,marginVertical:12,fontSize:20}}>상품 정보</Detail>
                        <View style = {{flexDirection:'row',borderBottomColor:'#f8f9fa', borderBottomWidth:.5, paddingVertical:12, width:windowWidth-96}}>
                            <Image source = {{uri:product.image_url}} style = {{width:'30%',height:(windowWidth-96)*.3}}/>
                            <View style = {{width:'70%', paddingHorizontal:8,justifyContent:'space-between'}}>
                                <View>
                                    <Detail style = {{lineHeight:24,fontSize:20}}>{product.name}</Detail>
                                    <Detail3 style = {{lineHeight:32,fontSize:16}}>{product.brand}</Detail3>
                                    <View style = {{flexDirection:'row', justifyContent:'space-between'}}>
                                        <Detail2 style = {{lineHeight:20,fontSize:14}}>총 {product.piece}조각</Detail2>
                                        <Detail2 style = {{lineHeight:20,fontSize:14}}>총 {priceToString(product.price)}원</Detail2>
                                    </View>
                                </View>
                                <View style = {{flexDirection:'row', justifyContent:'space-between'}}>
                                    <Detail2 style = {{lineHeight:20,fontSize:14}}>조각 당 가격</Detail2>
                                    <Detail2 style = {{lineHeight:20,fontSize:14}}>{priceToString(product.piece_price)}원</Detail2>
                                </View>
                            </View>
                        </View>
                        <View style = {{borderBottomColor:'#f8f9fa', borderBottomWidth:.5, paddingVertical:12, width:windowWidth-96,justifyContent:'flex-end'}}>
                            <View style = {{flexDirection:'row',width:'100%', justifyContent:'space-between',marginBottom:12}}>
                                    <Detail>받는 사람</Detail>
                                    <View style = {{flexDirection:'row'}}>
                                        <Detail style = {{}}>{product.username}</Detail>
                                        <Detail3 style = {{}}> 님</Detail3>
                                    </View>
                            </View>
                            <View style = {{flexDirection:'row',width:'100%', justifyContent:'space-between',marginBottom:12}}>
                                    <Detail>조각 수</Detail>
                                    <View style = {{flexDirection:'row'}}>
                                        <Detail style = {{}}>{pieces}</Detail>
                                        <Detail3 style = {{}}> 조각</Detail3>
                                    </View>
                            </View>
                            <View style = {{flexDirection:'row',width:'100%', justifyContent:'space-between'}}>
                                    <Detail>총 결제금액</Detail>
                                    <View style = {{flexDirection:'row'}}>
                                        <Detail style = {{color:'#3D83FF'}}>{priceToString(pieces*product.piece_price)}</Detail>
                                        <Detail3 style = {{color:'#3D83FF'}}>원</Detail3>
                                    </View>
                            </View>
                        </View>

                    </View>
                        <Detail style = {{lineHeight:40,marginVertical:12,fontSize:20}}>결제수단</Detail>
                        <Detail3 style = {{lineHeight:36,marginVertical:0,fontSize:14}}>토스페이</Detail3>
                        <Detail3 style = {{lineHeight:36,marginVertical:0,fontSize:14}}>카카오페이</Detail3>
                        <Detail3 style = {{lineHeight:36,marginVertical:0,fontSize:14}}>무통장입금</Detail3>
                </View>
                <View style = {{alignItems:'center', flexDirection:'row',justifyContent:'space-evenly',margin:16,marginTop:0}}>
                    <TouchableOpacity onPress={()=>{
                        setShowPaymentModal(false)
                        setShowCompletionModal(true)
                        }} style = {{backgroundColor:'#6c757d', padding:20,paddingVertical:12,borderRadius:10,width:'100%', alignItems:'center',justifyContent:'center'}}>
                        <Detail style = {{fontSize:20,lineHeight:32}}>결제하기</Detail>
                    </TouchableOpacity>
                </View>
            </View>
        </Modal>

        <Modal style = {{margin:0}} useNativeDriver={true} isVisible={showCompletionModal} onBackButtonPress={()=>{
            setShowPaymentModal(true)
            setShowCompletionModal(false)
            }} >
            <View style = {{backgroundColor:'#212529', width:windowWidth-32, borderRadius:20, alignSelf:'center',elevation:10,shadowColor:'black',shadowOffset:{x:0,y:6}}}>
                <View style = {{justifyContent:'center',margin:16, padding:16}}>
                    <View style={{flexDirection:'row',justifyContent:'space-between',alignSelf:'center',width:'20%',marginBottom:20}}>
                        <View style = {{width:10,height:10,borderRadius:5,backgroundColor:'#6c757d'}}/>
                        <View style = {{width:10,height:10,borderRadius:5,backgroundColor:'#6c757d'}}/>
                        <View style = {{width:10,height:10,borderRadius:5,backgroundColor:'#f8f9fa'}}/>
                    </View>
                    <View style = {{alignItems:'center',marginTop:20}}>
                        <Icon name='md-gift-sharp' size={60} color='#f8f9fa' style = {{elevation:10,shadowColor:'white',shadowOffset:{x:0,y:6}}}/>
                        <Detail2 style = {{lineHeight:40,marginTop:20,fontSize:24}}>마음을 전했어요</Detail2>
                        <Detail3 style = {{lineHeight:40,marginTop:12,fontSize:16}}>{product.username}님이 분명 좋아할 거예요!</Detail3>
                    </View>
                </View>
                <View style = {{alignItems:'center', flexDirection:'row',justifyContent:'space-evenly',margin:16,marginTop:0}}>
                    
                    <TouchableOpacity onPress={()=>{
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
            <TouchableOpacity onPress={()=>{setShowSelectionModal(true)}} style = {{padding:12, alignItems:'center', justifyContent:'center',width:windowWidth-32, borderRadius:10, backgroundColor:'#DEE2E6',flexDirection:'row'}}>
                <Image source={{uri:product.profileImageUri}} style = {{width:24,height:24,borderRadius:15, elevation:5,marginRight:8}}/>
                <SubTitle style = {{color:'#212529', fontSize:16,lineHeight:20}}>{product.username}에게 선물하기</SubTitle>
                <Icon name='md-gift-sharp' size={20} color='black' style = {{marginHorizontal:8}}/>
            </TouchableOpacity>
        </View>
    </Container>
  )
}

export default WishListDetailScreen