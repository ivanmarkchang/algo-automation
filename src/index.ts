import dotenv from 'dotenv';
import { AlgoConfig } from './types';
import { config } from './config';
import { createAlgo, deleteAlgo } from './services/algoService';
import { authenticate } from './services/authService';

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