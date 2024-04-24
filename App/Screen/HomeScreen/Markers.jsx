import { View, Tex,Image, TouchableOpacity } from 'react-native';
import React, { useContext } from 'react';
import { Marker } from 'react-native-maps';
import Colors from '../../Utils/Colors';
import { SelectMarkerContext } from '../../Context/SelectMarkerContext';

export default function Markers({index, place}) {
    
  const {selectedMarker, setSelectedMarker}=useContext(SelectMarkerContext);
  return place&&(
            <Marker
                coordinate={{
                  latitude: place.location?.latitude,
                  longitude: place.location?.longitude
                }}
                onPress={()=>setSelectedMarker(index)}
              >
                <Image source={require('./../../../assets/images/colortoi.png')} // person icon on map
                style={{height: 40, width: 40}}
                />
              </Marker>
    )
} 