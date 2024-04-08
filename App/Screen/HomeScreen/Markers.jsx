import { View, Tex,Image } from 'react-native';
import React from 'react';
import { Marker } from 'react-native-maps';

export default function Markers({place}) {
    return (
        <View>
            <Marker
                coordinate={{
                  latitude: place.location?.latitude,
                  longitude: place.location?.longitude
                }}
              >
                <Image source={require('./../../../assets/images/colortoi.png')} // person icon on map
                style={{height: 40, width: 40}}
                />

              </Marker>
        </View>
    )
}