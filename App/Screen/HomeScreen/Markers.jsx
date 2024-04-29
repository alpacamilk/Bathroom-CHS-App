import { View, Text, Image, TouchableOpacity } from 'react-native';
import React, { useContext } from 'react';
import { Marker } from 'react-native-maps';
import Colors from '../../Utils/Colors';
import { SelectMarkerContext } from '../../Context/SelectMarkerContext';

export default function Markers({ index, place }) {
    const { selectedMarker, setSelectedMarker } = useContext(SelectMarkerContext);

    return place && (
        <Marker
            coordinate={{
                latitude: place.location?.latitude,
                longitude: place.location?.longitude
            }}
            onPress={() => setSelectedMarker(index)}
        >
            <Image
                source={require('./../../../assets/images/colortoi.png')} // toilet icon on map
                style={{
                    height: selectedMarker === index ? 60 : 40,
                    width: selectedMarker === index ? 60 : 40
                }}
            />
        </Marker>
    )
}
