import React from 'react'
import { Text, View, StatusBar,TextInput } from 'react-native'
import { Container, Detail, Header, StyledTouchableOpacity, windowWidth } from '../design/styledComponents'
import { getStatusBarHeight } from 'react-native-status-bar-height';
import  Icon  from 'react-native-vector-icons/Ionicons'


const SpecialProductDetailScreen = ({ route, navigation}) => {
    const {itemData} = route.params
    console.log(itemData)
    const StatusBarHeight = Platform.OS === 'ios' ? getStatusBarHeight(true) : StatusBar.currentHeight;

  return (
    <Container style = {{paddingTop:StatusBarHeight}}>
        {console.log(itemData)}
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
                        <Icon name="md-menu-outline" size={24} color = '#f8f9fa' />
                    </StyledTouchableOpacity>
                </View>
            </View>
        </Header>
    </Container>
  )
}

export default SpecialProductDetailScreen