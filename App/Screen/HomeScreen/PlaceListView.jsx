import { View, Text, FlatList, Dimensions, Animated } from 'react-native';
import React, { useEffect, useRef } from 'react';
import PlaceItem from './PlaceItem';

export default function PlaceListView({placeList}) {


    return (
        <View>
            <FlatList
            data={placeList}
            horizontal={true}
            pagingEnabled

            showsHorizontalScrollIndicator={false}
            renderItem={({item,index})=>(
                <View key={index}>
                    <PlaceItem place={item}/>
                </View>
            )}
            />
        </View>
    )
}