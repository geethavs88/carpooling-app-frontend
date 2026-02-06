import { apiFetch } from './client';


// const API_BASE_URL = 'http://10.0.2.2:8000/api';
// Search for rides

/* SEARCH RIDES */
export function searchRides({
    startLocation,
    endLocation,
    earliestDateTimeISO,
    latestDateTimeISO,
    rideType,
}) {
    const query = new URLSearchParams({
        start_location: startLocation,
        end_location: endLocation,
        earliest_datetime: earliestDateTimeISO,
        latest_datetime: latestDateTimeISO,
        ride_type: rideType,
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
    startDateTimeISO,
    endDateTimeISO,
    rideType,
    availableSeats = null, 
}) => {
    const person_id = 1; // Replace with actual person ID
    const response = await apiFetch(`/persons/${person_id}/rides/`, {
        method: 'POST',
        body: JSON.stringify({
            id: person_id,
            ride_type: rideType,
            start_location: startLocation,
            end_location: destination,
            earliest_time: startDateTimeISO,
            latest_time: endDateTimeISO,
            available_seats: availableSeats,

        }),
    });

    return response;
};


