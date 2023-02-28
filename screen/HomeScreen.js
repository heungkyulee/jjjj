import AsyncStorage from '@react-native-async-storage/async-storage';
import React from 'react'
import { Text, TextInput, View,Dimensions, StatusBar, FlatList } from 'react-native'
import  Icon  from 'react-native-vector-icons/Ionicons'
import { Container, Detail, Header, StatusBarHeight, StyledTouchableOpacity, SubTitle2 } from '../design/styledComponents'
import CustomCarousel from '../homeComponents/CustomCarousel';
import LookForFriends from '../homeComponents/LookForFriends';

const HomeScreen = ({navigation}) => {
    const windowWidth = Dimensions.get('window').width;
    const windowHeight = Dimensions.get('window').height;
    const removeItemValue = async(key) => {
        try {
            await AsyncStorage.removeItem(key);
            return true;
        }
        catch(exception) {
            return false;
        }
    }
  return (
    <Container style = {{paddingTop:StatusBarHeight}}>
        <StatusBar translucent backgroundColor={'transparent'}/>
        <Header style = {{backgroundColor:'transparent'}}>
            <View style = {{flexDirection:'row',alignItems:'center'}}>
                <Detail style = {{fontSize:30, lineHeight:36}}>LiFoli</Detail>
            </View>
            <View style = {{flexDirection:'row',alignItems:'center'}}>
                <StyledTouchableOpacity onPress = {()=>{navigation.navigate('Writing')}}>
                    <Icon name="md-add" size={24} color = '#f8f9fa' />
                </StyledTouchableOpacity>
                <StyledTouchableOpacity onPress = {()=>{navigation.navigate('Search')}}>
                    <Icon name="md-search" size={24} color = '#f8f9fa' />
                </StyledTouchableOpacity>
                <StyledTouchableOpacity onPress = {()=>{navigation.navigate('Notification')}}>
                    <Icon name="md-notifications-outline" size={24} color = '#f8f9fa' />
                </StyledTouchableOpacity>
                <StyledTouchableOpacity onPress = {()=>{
                    navigation.navigate("LogIn")
                    removeItemValue('currentId')
                    }}>
                    <Icon name="md-menu-outline" size={24} color = '#f8f9fa' />
                </StyledTouchableOpacity>
            </View>
        </Header>
        <FlatList
        ListHeaderComponent={LookForFriends}
        ListFooterComponent={CustomCarousel}/>
            {/* <LookForFriends/>
            <CustomCarousel/> */}
    </Container>
  )
}

export default HomeScreen