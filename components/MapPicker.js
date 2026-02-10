import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import { GOOGLE_MAPS_API_KEY } from '../config'; // Make sure to export this from your config.js
import MapViewDirections from 'react-native-maps-directions';


const GOOGLE_API_KEY = GOOGLE_MAPS_API_KEY;

export default function MapPicker({ navigation, route }) {
  const { type } = route.params; // 'start' or 'destination'
  const [selectedLoc, setSelectedLoc] = useState(null); // { name, latitude, longitude }

    return (
        <View style={{ flex: 1 }}>
        <MapView
            style={{ flex: 1 }}
            initialRegion={{
            latitude: 37.78825,
            longitude: -122.4324,
            latitudeDelta: 0.05,
            longitudeDelta: 0.05,
            }}
            onPress={(e) => {
            setSelectedLoc({
                name: `Lat: ${e.nativeEvent.coordinate.latitude.toFixed(4)}, Lng: ${e.nativeEvent.coordinate.longitude.toFixed(4)}`,
                latitude: e.nativeEvent.coordinate.latitude,
                longitude: e.nativeEvent.coordinate.longitude,
            });
            }}
        >
            {selectedLoc && <Marker coordinate={selectedLoc} title={selectedLoc.name} />}
        </MapView>

        <GooglePlacesAutocomplete
            placeholder="Search location"
            fetchDetails={true}
            onPress={(data, details = null) => {
            const loc = {
                name: data.description,
                latitude: details.geometry.location.lat,
                longitude: details.geometry.location.lng,
            };
            setSelectedLoc(loc);
            }}
            query={{ key: GOOGLE_API_KEY, language: 'en' }}
            styles={{
            container: { position: 'absolute', top: 10, width: '90%', alignSelf: 'center' },
            }}
        />

        {selectedLoc && (
            <TouchableOpacity
            style={styles.confirmButton}
            onPress={() => {
                navigation.navigate('RideSchedule', {
                type, // 'start' or 'destination'
                name: selectedLoc.name,
                latitude: selectedLoc.latitude,
                longitude: selectedLoc.longitude,
                });
            }}
            >
            <Text style={styles.confirmText}>Use this location</Text>
            </TouchableOpacity>
        )}
        </View>
    );
    }

    const styles = StyleSheet.create({
    confirmButton: {
        position: 'absolute',
        bottom: 20,
        width: '90%',
        alignSelf: 'center',
        backgroundColor: '#1E90FF',
        padding: 12,
        borderRadius: 8,
    },
    confirmText: { color: '#fff', textAlign: 'center', fontWeight: 'bold' },
    });