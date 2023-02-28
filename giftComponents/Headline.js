import React, { useEffect, useState } from 'react'
import { FlatList, Text, View, Image } from 'react-native'
import axios from 'axios'
import BASE_URL from '../BASE_URL'
import { Detail, Detail3, SubTitle } from '../design/styledComponents'

const Headline = () => {

  return (
    <View style = {{margin:16}}>
        <Detail3 style = {{lineHeight:40}}>LiFoli 선물 펀딩으로</Detail3>
        <SubTitle style = {{lineHeight:48, fontSize:30}}>비싼 선물도 받아보세요!</SubTitle>
    </View>
  )
}

export default Headline