import { apiFetch } from './client';
import { AuthContext } from '../context/AuthContext';



// const API_BASE_URL = 'http://10.0.2.2:8000/api';
// Search for rides

/* SEARCH RIDES */
export function searchRides({
    startLocation,
    endLocation,
    startCoords,         // new
    destinationCoords,   // new
    earliestDateTimeISO,
    latestDateTimeISO,
    rideType,
    driverId    //new
}) {
    const query = new URLSearchParams({
        start_location: startLocation,
        end_location: endLocation,
        earliest_datetime: earliestDateTimeISO,
        latest_datetime: latestDateTimeISO,
        start_latitude: startCoords?.latitude,
        start_longitude: startCoords?.longitude,
        end_latitude: destinationCoords?.latitude,
        end_longitude: destinationCoords?.longitude,
        ride_type: rideType,
        // driver_id: driverId,   //new
    }).toString();
    console.log(`${query}`)

    return apiFetch(`/rides/search/?${query}`);
}


// Post Ride Request

// const addNewCardApi = (cardData, boardId) => {
//   const { cardMessage } = cardData;
//   return axios.post(`${VITE_APP_BACKEND_URL}/boards/${boardId}/cards`, {
//     message: cardMessage
//   })
//     .then(response => response.data)
//     .catch(error => {
//       console.log(error);
//       throw error;
//     });
// };

export const postRide = async ({
    startLocation,
    destination,
    startCoords,       // new
    destinationCoords, // new
    startDateTimeISO,
    endDateTimeISO,
    rideType,
    availableSeats = null,
    userId
}) => {
   
    const person_id = userId; // Replace with actual person ID
    const response = await apiFetch(`/users/persons/${person_id}/rides/`, {
        method: 'POST',
        body: JSON.stringify({
            id: person_id,

            ride_type: rideType,
            start_location: startLocation,
            end_location: destination,
            start_latitude: startCoords?.latitude,        // added
            start_longitude: startCoords?.longitude,      // added
            end_latitude: destinationCoords?.latitude,    // added
            end_longitude: destinationCoords?.longitude,  // added
            earliest_time: startDateTimeISO,
            latest_time: endDateTimeISO,
            available_seats: availableSeats,

        }),
    });

    return response;
};


export const bookRide = async (rideId, userId) => {
    const response = await apiFetch(`/rides/${rideId}/bookings/`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ userId }),
    });

    return response;
};



export const acceptRideRequest = async (requestId, userId) => {
    const response = await apiFetch(`/rides/ride-requests/${requestId}/accept/`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ userId }),
    });

    return response;
};

export const rejectRideRequest = async (requestId, userId) => {
    const response = await apiFetch(`/rides/ride-requests/${requestId}/reject/`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ userId }),
    });

    return response;
};

