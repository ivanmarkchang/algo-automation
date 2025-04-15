import dotenv from 'dotenv';

dotenv.config();

const API_BASE_URL = 'https://betaapi.avomd.io/api/v2';

async function authenticate(): Promise<string> {
    const response = await fetch(`${API_BASE_URL}/users/signin/`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            email: process.env.EMAIL,
            password: process.env.PASSWORD
        }),
    });

    const data = await response.json();
    
    return data.token;
}

async function main() {
    try {
        const token = await authenticate();
        console.log('Authentication successful!');
    } catch (error) {
        console.error('Error during authentication:', error);
    }
}

main();