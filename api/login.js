import { apiFetch } from './client';

export async function login(username,password) {
    return apiFetch('/users/login/', {
        method: 'POST',
        body: JSON.stringify({ username, password }),
    });
}