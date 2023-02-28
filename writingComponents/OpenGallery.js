import React, { useState, useEffect } from 'react';
import { View, Text, Image, ScrollView, TouchableOpacity, FlatList } from 'react-native';
import CameraRoll from '@react-native-community/cameraroll';
import { windowWidth } from '../design/styledComponents';
import { useCallback } from 'react';
import { useNavigation } from '@react-navigation/native';


const OpenGallery = () => {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [pageInfo, setPageInfo] = useState(null);
  const navigation = useNavigation()
  const navigateToDetail = (image)=>{
    navigation.navigate('WritingDetail',{image})
  }

  useEffect(() => {
    CameraRoll.getPhotos({
      first: 200,
      assetType: 'Photos',
    })
      .then(r => {
        setImages(r.edges);
        setPageInfo(r.page_info);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const handleLoadMore = useCallback(() => {
    if (loading || !pageInfo || !pageInfo.has_next_page) {
      return;
    }
    setLoading(true);
    CameraRoll.getPhotos({
      first: 60,
      assetType: 'Photos',
      after: pageInfo.end_cursor,
    })
      .then(r => {
        setImages(prevImages => [...prevImages, ...r.edges]);
        setPageInfo(r.page_info);
        setLoading(false);
      })
      .catch(err => {
        console.log(err);
        setLoading(false);
      });
  }, [loading, pageInfo]);

  return (
    <View style={{flex:1, alignItems:'center'}}>
      <FlatList
        data={images}
        onEndReached={()=>{
            handleLoadMore
        }}
        onEndReachedThreshold={0.5}
        keyExtractor={(item, index) => index.toString()}
        numColumns={4}
        renderItem={({ item }) => (
            <TouchableOpacity onPress={()=>{navigateToDetail(item.node.image.uri)}}>
                <Image
                    source={{ uri: item.node.image.uri }}
                    style={{
                        width:(windowWidth-32)/4,
                        height:(windowWidth-32)/4,
                        margin:32/10
                    }}
                    />
            </TouchableOpacity>
        )}
      />
    </View>
  );
};

export default OpenGallery;