import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator,TransitionPresets } from '@react-navigation/stack';
import SplashScreen from './screen/SplashScreen';
import HomeScreen from './screen/HomeScreen';
import PortfolioScreen from './screen/PortfolioScreen';
import LogInScreen from './screen/LogInScreen';
import SearchScreen from './screen/SearchScreen';
import ChallengeScreen from './screen/ChallengeScreen';
import GiftScreen from './screen/GiftScreen';
import NotificationScreen from './screen/NotificationScreen';

import Icon from 'react-native-vector-icons/Ionicons'
import WritingScreen from './screen/WritingScreen';
import ProductSearchScreen from './screen/ProductSearchScreen';
import SpecialProductDetailScreen from './screen/SpecialProductDetailScreen';
import WritingDetailScreen from './screen/WritingDetailScreen';
import FriendsScreen from './writingComponents/FriendsScreen';
import PlacesScreen from './writingComponents/PlacesScreen';
import ChallengesScreen from './writingComponents/ChallengesScreen';
import ProductDetailScreen from './screen/ProductDetailScreen';
import WishListScreen from './screen/WishListScreen';
import WishListDetailScreen from './screen/WishListDetailScreen';
import WishListSearchScreen from './screen/WishListSearchScreen';
import ChallengeDetailScreen from './screen/ChallengeDetailScreen';
import WritingThroughChallengeScreen from './screen/WritingThroughChallengeScreen';

const Stack = createStackNavigator();

export default function MyStack() {
  return (
    <NavigationContainer>
        <Stack.Navigator screenOptions={{...TransitionPresets.ModalTransition, headerShown:false}} initialRouteName='Splash'>
            <Stack.Screen name="Tabs" component={MyTabs} options={{}} />
            <Stack.Screen name="Splash" component={SplashScreen} />
            <Stack.Screen name="LogIn" component={LogInScreen} />
            <Stack.Screen name="Search" component={SearchScreen} />
            <Stack.Screen name="Notification" component={NotificationScreen} />
            <Stack.Screen name="Writing" component={WritingScreen} />
            <Stack.Screen name="WritingDetail" component={WritingDetailScreen} />
            <Stack.Screen name="ProductSearch" component={ProductSearchScreen} />
            <Stack.Screen name="ProductDetail" component={ProductDetailScreen} />
            <Stack.Screen name="WishList" component={WishListScreen} />
            <Stack.Screen name="WishListDetail" component={WishListDetailScreen} />
            <Stack.Screen name="WishListSearch" component={WishListSearchScreen} />
            <Stack.Screen name="SpecialProductDetail" component={SpecialProductDetailScreen} />
            <Stack.Screen name="Friends" component={FriendsScreen} />
            <Stack.Screen name="Places" component={PlacesScreen} />
            <Stack.Screen name="Challenges" component={ChallengesScreen} />
            <Stack.Screen name="ChallengeDetail" component={ChallengeDetailScreen} />
            <Stack.Screen name="WritingThroughChallenge" component={WritingThroughChallengeScreen} />
        </Stack.Navigator>
    </NavigationContainer>
  );
}

const Tab = createBottomTabNavigator();

function MyTabs() {
  return (
    <Tab.Navigator 
    // screenOptions={[({route})=>({
    //     tabBarIcon: ({focused,color,size})=>{
    //     let iconName;

    //     if (route.name==='Home') { iconName = focused ? 'md-home-outline':'md-home-outline'}
    //     else if (route.name === 'Gift') {iconName = focused? 'md-gift':'md-gift-outline'} 
    //     else if (route.name === 'Challenge') {iconName = focused? 'md-gift':'md-gift-outline'} 
    //     else if (route.name === 'Portfolio') {iconName = focused? 'md-gift':'md-gift-outline'} 
    //     return<Icon name={iconName} size={size} color={color}/>;
    // },}), { headerShown:false, tabBarStyle : {backgroundColor:'#212529',elevation:0,borderTopColor:'transparent'}}]} 
    screenOptions={{ headerShown:false,tabBarStyle:{ backgroundColor:'#212529',borderTopColor:'#212529'}}}
    
    initialRouteName='Home'>
        <Tab.Screen name="Home" component={HomeScreen} options={{title:'', tabBarIcon:({color,size})=>(<Icon style = {{ paddingTop:12,elevation:5, shadowOpacity:0, shadowOffset: {x:0,y:6}, shadowColor:'black',}} name = "md-home-outline" color = {color} size = {24}/>)}}/>
        <Tab.Screen name="Gift" component={GiftScreen}  options={{title:'', tabBarIcon:({color,size})=>(<Icon style = {{ paddingTop:12,elevation:5, shadowOpacity:0, shadowOffset: {x:0,y:6}, shadowColor:'black',}} name = "md-gift-outline" color = {color} size = {24}/>)}}/>
        <Tab.Screen name="Challenge" component={ChallengeScreen}  options={{title:'', tabBarIcon:({color,size})=>(<Icon style = {{ paddingTop:12,elevation:5, shadowOpacity:0, shadowOffset: {x:0,y:6}, shadowColor:'black',}} name = "md-flag-outline" color = {color} size = {24}/>)}}/>
        <Tab.Screen name="Portfolio" component={PortfolioScreen}  options={{title:'', tabBarIcon:({color,size})=>(<Icon style = {{ paddingTop:12,elevation:5, shadowOpacity:0, shadowOffset: {x:0,y:6}, shadowColor:'black',}} name = "md-person-circle-outline" color = {color} size = {24}/>)}}/>
    </Tab.Navigator>
  );
}
