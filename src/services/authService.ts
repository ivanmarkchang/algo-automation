import { API } from '../constants';

export async function authenticate(): Promise<string> {
    const response = await fetch(`${API.BASE_URL}${API.ENDPOINTS.SIGNIN}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            email: process.env.EMAIL,
            password: process.env.PASSWORD
        }),
    });

    if (!response.ok) {
        const text = await response.text();
        throw new Error(`Authentication failed: ${text}`);
    }

    const data = await response.json();
    return data.token;
} 