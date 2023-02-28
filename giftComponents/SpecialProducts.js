import React, { useEffect, useState } from 'react'
import { FlatList, Text, View, Image, ScrollView, TouchableOpacity } from 'react-native'
import axios from 'axios'
import BASE_URL from '../BASE_URL'
import { Card, Detail, Detail3, SubTitle, windowHeight, windowWidth } from '../design/styledComponents'
import { useNavigation } from '@react-navigation/native'
import LinearGradient from 'react-native-linear-gradient'

const SpecialProducts = () => {
    const [specialProduct,setSpecialProduct] = useState([
        {id:1, title:'유럽여행 선물받기', image_url:'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTqrpjSBrD0fgwIcCPwYEDPEv6nDvDa0B87Rg&usqp=CAU'},
        {id:2, title:'아이패드 선물받기', image_url:'https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NHx8aXBhZHxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=1000&q=60'},
        {id:3, title:'자동차 선물받기', image_url:'https://images.unsplash.com/photo-1494976388531-d1058494cdd8?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NHx8Y2FyfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=1000&q=60'},
        {id:4, title:'가구 선물받기', image_url:'https://images.unsplash.com/photo-1592078615290-033ee584e267?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8M3x8ZnVybml0dXJlfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=1000&q=60'},
        {id:5, title:'명품 선물받기',image_url:'https://images.unsplash.com/photo-1549439602-43ebca2327af?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8M3x8bHV4dXJ5fGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=1000&q=60'},
    ])
    
    const getDataFromAsyncStorage = async ()=>{try{const currentId = await AsyncStorage.getItem('currentId')} catch(error){console.log(error.message)}}

    useEffect(()=>{getDataFromAsyncStorage},[])

    
  const getSpecialProductsData = async() =>{
    await axios.get(`${BASE_URL}/special-products`)
    .then(res=>setSpecialProduct(res.data))
    .catch(error=>console.log(error))
}
useEffect(()=>{getSpecialProductsData()},[])


    const navigation = useNavigation()

    const handleItemPress = (item) =>{
        navigation.navigate('ProductDetail',{item})
        console.log(item)
    }

  return (
    <View style = {{margin:0}}>
        <Detail style = {{margin:16}}>스페셜</Detail>
        <ScrollView horizontal pagingEnabled showsHorizontalScrollIndicator={false} style = {{height:windowHeight/3}}>
            {specialProduct.map((item)=>(
                <Card key = {item.id} style = {{width:windowWidth-32,elevation:10}}>
                    <TouchableOpacity onPress={()=>{handleItemPress(item)}} activeOpacity={.6} style = {{backgroundColor:'transparent',width:'100%',height:'100%',borderRadius:8}}>
                        <View>
                            <Image source={{uri : item.image_url}} style = {{width:'100%',height:'100%',borderRadius:8}}/>
                        </View>
                        <LinearGradient colors={['transparent','#343a40']} start={{x:0,y:0}} end={{x:0,y:1}} style = {{position:'absolute', bottom:0, left:0, zIndex:1,width:'100%',height:'70%', borderBottomLeftRadius:8,borderBottomRightRadius:8,opacity:.6,justifyContent:'flex-end',padding:12}}>
                            <Detail style = {{color:'white',zIndex:2}}>{item.title}</Detail>
                        </LinearGradient>
                    </TouchableOpacity>
                </Card>
            ))}
        </ScrollView>
    </View>
  )
}

export default SpecialProducts