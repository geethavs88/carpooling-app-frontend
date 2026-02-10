const BASE_URL = 'https://carpooling-backend-application.onrender.com/api';
//const BASE_URL = 'http://10.0.2.2:8000/api';

export async function apiFetch(endpoint, options = {}) {
    const response = await fetch(`${BASE_URL}${endpoint}`, {
        headers: {
        'Content-Type': 'application/json',
        ...options.headers,
        },
        ...options,
    });

    if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.error || 'Something went wrong');
    }

    return response.status === 204 ? null : response.json();
}