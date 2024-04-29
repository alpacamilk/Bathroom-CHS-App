import axios from 'axios';

const BASE_URL = "https://places.googleapis.com/v1/places:searchText";
const API_KEY = "AIzaSyCgjOmPgkPijr32foY4oCLxjgnUzcHmWGo";

const config={
    headers:{
        'Content-Type': 'application/json',
        'X-Goog-Api-Key':API_KEY,
        'X-Goog-FieldMask': [
            'places.displayName',
            'places.photos',
            'places.formattedAddress',
            'places.accessibilityOptions',
            'places.location',
            'places.shortFormattedAddress',
            'places.id'
        ]
    }
}

const NewNearByPlace=(data)=>axios.post(BASE_URL,data,config);

export default {
    NewNearByPlace,
    API_KEY
}

