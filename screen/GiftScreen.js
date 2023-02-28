import React from 'react'
import { Text, View, StatusBar, TouchableOpacity } from 'react-native'
import { Container, Detail, Header, StyledTouchableOpacity, windowHeight, windowWidth } from '../design/styledComponents'
import { getStatusBarHeight } from 'react-native-status-bar-height';
import  Icon  from 'react-native-vector-icons/Ionicons'
import Headline from '../giftComponents/Headline';
import SpecialProducts from '../giftComponents/SpecialProducts';


const GiftScreen = ({navigation}) => {
    const StatusBarHeight = Platform.OS === 'ios' ? getStatusBarHeight(true) : StatusBar.currentHeight;

  return (
    <Container style = {{paddingTop:StatusBarHeight}}>
        <StatusBar translucent backgroundColor={'transparent'}/>
        <Header>
            <View style = {{flexDirection:'row',alignItems:'center'}}>
                <Detail style = {{fontSize:24,lineHeight:36}}>선물 펀딩</Detail>
            </View>
            <View style = {{flexDirection:'row',alignItems:'center'}}>
                {/* <TextInput placeholder='hihii' placeholderTextColor={'white'} style = {{ fontFamily:'NotoSansKR-Regular', textAlign:'center', color : 'white',borderColor:'white', borderBottomWidth:1,width:200}}/> */}
                <StyledTouchableOpacity onPress = {()=>{navigation.navigate('ProductSearch')}}>
                    <Icon name="md-search" size={24} color = '#f8f9fa' />
                </StyledTouchableOpacity>
                <StyledTouchableOpacity onPress = {()=>{navigation.navigate("WishList")}}>
                    <Icon name="md-cart-outline" size={24} color = '#f8f9fa' />
                </StyledTouchableOpacity>
            </View>
        </Header>
        <Headline/>
        <SpecialProducts/>
        <View style = {{flexDirection:'row', justifyContent:'space-evenly',position:'absolute',bottom:10}}>
            <StyledTouchableOpacity style = {{backgroundColor:'#343A40', width:windowWidth-32, borderRadius:100, justifyContent:'center', alignItems:'center', flexDirection:'row', alignItems:'center', margin:16, elevation:10, shadowColor:'black', shadowOffset:{x:0,y:6}}} onPress={()=>{navigation.navigate('WishListSearch')}}>
                <Detail>선물하기</Detail>
                <Icon style = {{marginLeft:12}} name='md-gift-sharp' size={24} color={'#f8f9fa'}/>
            </StyledTouchableOpacity>
        </View>
    </Container>
  )
}

export default GiftScreen