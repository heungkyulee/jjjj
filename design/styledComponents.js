import React from 'react'
import styled from 'styled-components/native'
import { getStatusBarHeight } from 'react-native-status-bar-height';
import { Platform, StatusBar,Dimensions } from 'react-native'



export const Title = styled.Text`
font-family:'NotoSansKR-Black';
font-size:20px;
color:#f8f9fa;
line-height:20px;
/* background-color:red; */
`
export const SubTitle = styled.Text`
font-family:'NotoSansKR-Bold';
font-size:20px;
color:#f8f9fa;
line-height:30px;
/* background-color:red; */
`
export const SubTitle2 = styled.Text`
font-family:'NotoSansKR-Medium';
font-size:20px;
color:#f8f9fa;
line-height:30px;
/* background-color:red; */
`
export const Detail = styled.Text`
font-family:'NotoSansKR-Regular';
font-size:20px;
color:#f8f9fa;
line-height:30px;
/* background-color:red; */
`
export const Detail2 = styled.Text`
font-family:'NotoSansKR-Light';
font-size:20px;
color:#f8f9fa;
line-height:30px;
/* background-color:red; */
`
export const Detail3 = styled.Text`
font-family:'NotoSansKR-Thin';
font-size:20px;
color:#f8f9fa;
line-height:30px;
/* background-color:red; */
`
export const Container = styled.View`
background-color:#212529;
flex:1;
`
export const Header = styled.View`
background-color:#212529;
height:56px;
align-items:center;
text-align:center;
justify-content:space-between;
flex-direction:row;
padding-left:16px;
padding-right:16px;
`
export const Card = styled.View`
background-color:#f8f9fa;
height:100%;
width:50%;
margin-right:16px;
margin-left:16px;
align-items:center;
text-align:center;
justify-content:center;
flex-direction:column;
border-radius:8px;
`
export const StyledTouchableOpacity = styled.TouchableOpacity`
height:48px;
width:48px;
align-items:center;
justify-content:center;
`
export const StyledStatusBar = styled.FlatList`
background-color:transparent;
`

export const StatusBarHeight = Platform.OS === 'ios' ? getStatusBarHeight(true) : StatusBar.currentHeight;

export const windowWidth = Dimensions.get('window').width;
export const windowHeight = Dimensions.get('window').height;