import { View, Text, ActivityIndicator, FlatList } from "react-native";
import React, { useEffect, useState } from "react";
import Colors from "../../Utils/Colors";
import { getFirestore } from "firebase/firestore";
import { app } from "../../Utils/FirebaseConfig";
import { collection, query, where, getDocs } from "firebase/firestore";
import { useUser } from "@clerk/clerk-expo";
import PlaceItem from "../HomeScreen/PlaceItem";

export default function FavoriteScreen() {
  const db = getFirestore(app);
  const [favList, setFavList] = useState([]);
  const { user } = useUser();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    user && getFav();
  }, [user]);
  const getFav = async () => {
    setLoading(true);
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
      setLoading(false);
    });
  };

  return (
    <View
      style={{
        marginTop: 50,
      }}
    >
      

      <FlatList
        data={favList}
        onRefresh={() => getFav()}
        refreshing={loading}
        renderItem={({ item, index }) => (
          <PlaceItem
            place={item.place}
            isFav={true}
            markedFav={() => getFav()}
          />
        )}
      />
    </View>
  );
}
