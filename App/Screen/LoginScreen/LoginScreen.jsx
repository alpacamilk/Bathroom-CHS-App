import { View, Text, Image, StyleSheet } from 'react-native'
import React from 'react'
import Colors from './../../Utils/Colors'
import * as WebBrowser from "expo-web-browser";
import { useWarmUpBrowser } from '../../../hooks/useWarmUpBrowser';
import { TouchableOpacity } from 'react-native';
import { useOAuth } from '@clerk/clerk-expo';

WebBrowser.maybeCompleteAuthSession();
export default function LoginScreen() {
    useWarmUpBrowser();
 
  const { startOAuthFlow } = useOAuth({ strategy: "oauth_google" });
  
  const onPress=async()=>{
    try {
        const { createdSessionId, signIn, signUp, setActive } =
          await startOAuthFlow();
   
        if (createdSessionId) {
          setActive({ session: createdSessionId });
        } else {
          // Use signIn or signUp for next steps such as MFA
        }
      } catch (err) {
        console.error("OAuth error", err);
      }
  }
    return (
        <View style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            marginTop: 20
        }}>
            <Image source={require('./../../../assets/images/ph_logo.png')}
            style={styles.logoImage}
            />
            <Image source={require('./../../../assets/images/public-toilet.png')} 
            style={styles.bgImage}
            />
            <View style={{padding:20}}>
                <Text style={styles.heading}>Your Ultimate Public Bathroom Finder App</Text>
                <Text style={styles.desc}>Find a public bathroom near you</Text>
                <TouchableOpacity style={styles.button}
                onPress={onPress}
                >
                    <Text style={{
                        color: Colors.WHITE,
                        textAlign: 'center',
                        fontFamily: 'Montserrat',
                        fontSize:17
                    }}>Login With Google</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
  logoImage: {
    width: 200,
    height: 80,
    objectFit: 'contain'
  },
  bgImage: {
    width: '100%',
    height: 250,
    marginTop:20,
    objectFit: 'cover'
  },
  heading:{
    fontSize: 25,
    fontFamily: 'Montserrat-bold',
    textAlign: 'center',
    marginTop:20
  },
  desc:{
    fontSize: 17,
    fontFamily: 'Montserrat',
    marginTop: 15,
    textAlign: 'center',
    color: '#000',
    color:Colors.GRAY 
  },
  button:{
    backgroundColor: Colors.PRIMARY,
    padding:16,
    display: 'flex',
    borderRadius:99,
    marginTop:70
  }
})
