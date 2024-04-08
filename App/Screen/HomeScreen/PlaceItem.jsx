import { View, Text, Image, Dimensions } from 'react-native';
import React from 'react';
import Colors from '../../Utils/Colors';
import GlobalApi from '../../Utils/GlobalApi';
import { LinearGradient } from 'expo-linear-gradient';
import { FontAwesome } from '@expo/vector-icons';

export default function PlaceItem({place}) {
        const PLACE_PHOTO_BASE_URL = "https://places.googleapis.com/v1/";
    return (
        <View
        style={{
            backgroundColor: Colors.WHITE,
            margin:5,
            borderRadius:10,
            width:Dimensions.get('screen').width*0.9,
            marginHorizontal: 21.35
        }}
        >
            <LinearGradient
            colors={['transparent', '#ffffffff', '#ffffff']}            
            >
            <Image source={
                place?.photos? 
                {uri:PLACE_PHOTO_BASE_URL + place?.photos[0]?.name+
                "/media?key="+GlobalApi?.API_KEY+"&maxHeightPx=800&maxWidthPx=1200"}
                :require('./../../../assets/images/public-toilet.png')}
            style={{width: '100%', borderRadius:10,
             height: 150, zIndex: -1}}
            />
            <View style={{padding:15}}>
                <Text style={{
                    fontSize:18,
                    fontFamily: 'Montserrat-medium'
                }}>{place.displayName?.text}</Text>
                <Text style={{
                    color: Colors.GRAY,
                    fontFamily: 'Montserrat'
                }}>{place?.shortFormattedAddress}</Text>
                <View style={{
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    marginTop: 10
                }}>
                <View style={{
                marginTop:5,
            }}>
                <Text style={{
                    fontFamily: 'Montserrat',
                    fontSize: 17,
                    color: Colors.GRAY
                }}>Handicap Accessible:</Text>
                <Text style={{
                    fontFamily: 'Montserrat-medium',
                    fontSize: 20,
                    marginTop: 2,
                
                }}>{place?.accessibilityOptions?.wheelchairAccessibleEntrance?"Yes":"No"}</Text>
            </View>
                <View style={{padding:12,backgroundColor:Colors.PRIMARY,
                borderRadius:6,paddingHorizontal:14}}>
                    <FontAwesome name="location-arrow" size={25} color="white"/>
                </View>
            </View>
            </View>
            </LinearGradient>
        </View>
    )
}