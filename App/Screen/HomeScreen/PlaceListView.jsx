import { View, Text, FlatList, Dimensions, Animated } from "react-native";
import React, { useContext, useEffect, useRef, useState } from "react";
import PlaceItem from "./PlaceItem";
import { SelectMarkerContext } from "../../Context/SelectMarkerContext";
import { app } from "../../Utils/FirebaseConfig";
import { collection, query, where, getDocs } from "firebase/firestore";
import { getFirestore } from "firebase/firestore";
import { useUser } from "@clerk/clerk-expo";

export default function PlaceListView({ placeList }) {
  const flatListRef = useRef(null);

  const { user } = useUser();
  const [favList, setFavList] = useState([]);
  const { selectedMarker, setSelectedMarker } = useContext(SelectMarkerContext);
  useEffect(() => {
    if (placeList && placeList.length > 0 && selectedMarker) {
      scrollToIndex(selectedMarker);
    }
  }, [placeList, selectedMarker]);

  const scrollToIndex = (index) => {
    flatListRef.current?.scrollToIndex({ animated: true, index });
  };
  const getItemLayout = (_, index) => ({
    length: Dimensions.get("window").width,
    offset: Dimensions.get("window").width * index,
    index,
  });

  // get data from firestore
  const db = getFirestore(app);
  useEffect(() => {
    user && getFav();
  }, [user]);

  const getFav = async () => {
    setFavList([]);
    const q = query(
      collection(db, "bathroom-fav-place"),
      where("email", "==", user?.primaryEmailAddress?.emailAddress)
    );

    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      // doc.data() is never undefined for query doc snapshots
      console.log(doc.id, " => ", doc.data());
      setFavList((favList) => [...favList, doc.data()]);
    });
  };

  const isFav = (place) => {
    const result = favList.find((item) => item.place.id == place.id);
    console.log(result);
    return result ? true : false;
  };

  return (
    <View>
      <FlatList
        data={placeList}
        horizontal={true}
        pagingEnabled
        ref={flatListRef}
        getItemLayout={getItemLayout}
        showsHorizontalScrollIndicator={false}
        renderItem={({ item, index }) => (
          <View key={index}>
            <PlaceItem
              place={item}
              isFav={isFav(item)}
              markedFav={() => getFav()}
            />
          </View>
        )}
      />
    </View>
  );
}
