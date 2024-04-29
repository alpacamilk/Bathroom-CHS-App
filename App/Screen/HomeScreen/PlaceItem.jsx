import {
  View,
  Text,
  Image,
  Dimensions,
  Pressable,
  ToastAndroid,
  Platform,
  Linking,
} from "react-native";
import React from "react";
import Colors from "../../Utils/Colors";
import GlobalApi from "../../Utils/GlobalApi";
import { Ionicons, FontAwesome } from "@expo/vector-icons";
import { deleteDoc, doc, getFirestore, setDoc } from "firebase/firestore";
import { app } from "../../Utils/FirebaseConfig";
import Toast from "react-native-root-toast";
import { useUser } from "@clerk/clerk-expo";

export default function PlaceItem({ place, isFav, markedFav }) {
  const PLACE_PHOTO_BASE_URL = "https://places.googleapis.com/v1/";
  const { user } = useUser();
  const db = getFirestore(app);
  const onSetFav = async (place) => {
    await setDoc(doc(db, "bathroom-fav-place", place.id.toString()), {
      place: place,
      email: user?.primaryEmailAddress?.emailAddress,
    });
    markedFav();
    Toast.show("Favorite Added:)", Toast.TOP);
  };

  const onRemoveFav = async (placeId) => {
    await deleteDoc(doc(db, "bathroom-fav-place", placeId.toString()));
    Toast.show("Favorite Removed:(", Toast.TOP);
    markedFav();
  };

  const onDirectionClick = () => {
    const url = Platform.select({
      ios:
        "maps:" +
        place.location.latitude +
        "," +
        place?.location?.longitude +
        "?q=" +
        place?.formattedAddress,
      android:
        "geo:" +
        place.location.latitude +
        "," +
        place?.location?.longitude +
        "?q=" +
        place?.formattedAddress,
    });

    Linking.openURL(url);
  };
  return (
    <View
      style={{
        backgroundColor: Colors.WHITE,
        margin: 5,
        borderRadius: 10,
        width: Dimensions.get("screen").width * 0.9,
        marginHorizontal: 21.35,
      }}
    >
      {!isFav ? (
        <Pressable
          style={{
            position: "absolute",
            margin: 5,
            right: 0,
          }}
          onPress={() => onSetFav(place)}
        >
          <Ionicons name="heart-outline" size={40} color="red" />
        </Pressable>
      ) : (
        <Pressable
          style={{
            position: "absolute",
            margin: 5,
            right: 0,
          }}
          onPress={() => onRemoveFav(place.id)}
        >
          <Ionicons name="heart" size={40} color="red" />
        </Pressable>
      )}
      <Image
        source={
          place?.photos
            ? {
                uri:
                  PLACE_PHOTO_BASE_URL +
                  place?.photos[0]?.name +
                  "/media?key=" +
                  GlobalApi?.API_KEY +
                  "&maxHeightPx=800&maxWidthPx=1200",
              }
            : require("./../../../assets/images/public-toilet.png")
        }
        style={{
          width: "100%",
          borderRadius: 10,
          height: 150,
          zIndex: -1,
        }}
      />
      <View style={{ padding: 15 }}>
        <Text
          style={{
            fontSize: 18,
            fontFamily: "Montserrat-medium",
          }}
        >
          {place.displayName?.text}
        </Text>
        <Text
          style={{
            color: Colors.GRAY,
            fontFamily: "Montserrat",
          }}
        >
          {place?.shortFormattedAddress}
        </Text>
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            marginTop: 10,
          }}
        >
          <View
            style={{
              marginTop: 5,
            }}
          >
            <Text
              style={{
                fontFamily: "Montserrat",
                fontSize: 17,
                color: Colors.GRAY,
              }}
            >
              Handicap Accessible:
            </Text>
            <Text
              style={{
                fontFamily: "Montserrat-medium",
                fontSize: 20,
                marginTop: 2,
              }}
            >
              {place?.accessibilityOptions?.wheelchairAccessibleEntrance
                ? "Yes"
                : "No"}
            </Text>
          </View>
          <Pressable
            onPress={() => onDirectionClick()}
            style={{
              padding: 12,
              backgroundColor: Colors.PRIMARY,
              borderRadius: 6,
              paddingHorizontal: 14,
            }}
          >
            <FontAwesome name="location-arrow" size={25} color="white" />
          </Pressable>
        </View>
      </View>
    </View>
  );
}
