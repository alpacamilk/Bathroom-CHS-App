import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { useUser, useAuth } from '@clerk/clerk-expo'; 
import Colors from './../../Utils/Colors';

export default function ProfileScreen() {
    const { user } = useUser();
    const { signOut } = useAuth(); // Destructure signOut from useAuth

    const handleLogout = async () => {
        try {
            await signOut(); // Call signOut to log the user out
        } catch (error) {
            console.error('Logout error:', error);
        }
    };

    return (
        <View style={styles.container}>
            <Image 
                source={{ uri: user?.imageUrl }}
                style={{ width: 180, height: 180, borderRadius: 99 }}
            />
            <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
                <Text style={styles.buttonText}>Log Out</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    logoutButton: {
        backgroundColor: Colors.PRIMARY,
        padding: 16,
        borderRadius: 99,
        marginTop: 30,
    },
    buttonText: {
        color: Colors.WHITE,
        textAlign: 'center',
        fontFamily: 'Montserrat',
        fontSize: 17,
    },
});
