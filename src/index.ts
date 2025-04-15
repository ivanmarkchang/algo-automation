import dotenv from 'dotenv';
import { AlgoConfig } from './types';
import { API } from './constants';
import { config } from './config';
import { createAlgo, deleteAlgo } from './services/algoService';

dotenv.config();

function validateEnvironment() {
    const requiredEnvVars = ['EMAIL', 'PASSWORD'];
    const missingVars = requiredEnvVars.filter(envVar => !process.env[envVar]);

    if (missingVars.length > 0) {
        throw new Error(
            `Missing required environment variables: ${missingVars.join(', ')}\n` +
            'Please check your .env file and ensure all required variables are set.'
        );
    }
}

async function authenticate(): Promise<string> {
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

async function main() {
    try {
        validateEnvironment();

        const command = process.argv[2];
        const token = await authenticate();
        console.log('Authentication successful!');

        const algoConfig: AlgoConfig = config.defaults.algo;
        
        switch (command) {
            case 'create':
                const algoId = await createAlgo(token, algoConfig);
                console.log('Algo created with ID:', algoId);
                break;
            case 'delete':
                const id = process.argv[3];
                if (!id) {
                    throw new Error('Algo ID is required');
                }
                await deleteAlgo(token, id);
                console.log('Algo deleted successfully!');
                break;
            default:
                console.log('Please specify a command: create or delete');
                process.exit(1);
        }
    } catch (error) {
        console.error('Error:', error);
        process.exit(1);
    }
}

main();