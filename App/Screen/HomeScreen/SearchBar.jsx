import { View, Text } from 'react-native';
import React from 'react';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import Colors from '../../Utils/Colors';
import { Ionicons } from '@expo/vector-icons';


export default function SearchBar({searchedLocation}) {
    return (
        <View style={{
            display: 'flex',
            flexDirection: 'row',
            marginTop:5,
            paddingHorizontal:15,
            backgroundColor: Colors.WHITE,
            borderRadius:6,
        }}>
            <Ionicons name='location-sharp' size={24}
            color={Colors.GRAY} style={{paddingTop:12}}/>
            <GooglePlacesAutocomplete
            placeholder='Search Public Restrooms'
            enablePoweredByContainer={false}
            fetchDetails={true}
            onPress={(data, details = null) => {
            // 'details' is provided when fetchDetails = true

            searchedLocation(details?.geometry?.location)
            }}
            query={{
                key: 'AIzaSyCgjOmPgkPijr32foY4oCLxjgnUzcHmWGo',
                language: 'en',
            }}
    />
        </View>
    )
}