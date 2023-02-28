import React, { useEffect } from 'react'
import { Text, View, StatusBar,TextInput, PermissionsAndroid,Platform } from 'react-native'
import { Container, Detail, Header, StyledTouchableOpacity, windowWidth } from '../design/styledComponents'
import { getStatusBarHeight } from 'react-native-status-bar-height';
import  Icon  from 'react-native-vector-icons/Ionicons'
import { launchImageLibrary } from 'react-native-image-picker';
import CameraRoll from '@react-native-community/cameraroll';
import RNFS from 'react-native-fs';
import OpenGallery from '../writingComponents/OpenGallery';


const WritingScreen = ({navigation}) => {


  //*********************************************************** */
  const hasAndroidPermission = async () => {
    //외부 스토리지를 읽고 쓰는 권한 가져오기
    const permission = PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE;

    const hasPermission = await PermissionsAndroid.check(permission);
    if (hasPermission) {
      return true;
    };

    const status = await PermissionsAndroid.request(permission);
    return status === 'granted';
  };


  const getPhotoWithPermission = async () => {
    if (Platform.OS === 'android' && !(await hasAndroidPermission())) {
      return;
    };
  };

  useEffect(() => {
    getPhotoWithPermission();
  }, []);

  //***************************************************************************************** */

  //************************************************************************************** */




  //******************************************************************************************************** */
  
  const StatusBarHeight = Platform.OS === 'ios' ? getStatusBarHeight(true) : StatusBar.currentHeight;

  let options = {
    saveToPhotos: true,
    mediaType: 'photo',
  }
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
                  <StyledTouchableOpacity onPress = {()=>{navigation.navigate({
                    name: 'WritingDetail',
                    params:{
                      image:''
                    }})}}>
                    <Detail style = {{width:100,lineHeight:36,color:'#1E88E5'}}>건너뛰기</Detail>
                  </StyledTouchableOpacity>
              </View>
          </View>
      </Header>
      <OpenGallery/>
  </Container>
)
}

export default WritingScreen