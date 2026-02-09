import { apiFetch } from "./client";



export const fetchRiderBookings = async (userId) => {
    return apiFetch(`/bookings/rider/${userId}/`);
};
export const fetchDriverBookings = async (userId) => {
    return apiFetch(`/bookings/driver/${userId}/`);
};

export const confirmRide = async (bookingId, userId) => {
    const response = await apiFetch(`/bookings/${bookingId}/confirm/`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ userId }),
    });

    return response;
};

export const rejectRide = async (bookingId, userId) => {
    const response = await apiFetch(`/bookings/${bookingId}/reject/`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ userId }),
    });

    return response;
};