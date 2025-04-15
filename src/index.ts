import dotenv from 'dotenv';
import { config } from './config';
import { authenticate } from './services/authService';
import { validateEnvironment } from './utils/envUtils';
import { handleCommand } from './services/commandService';

dotenv.config();

async function main() {
    try {
        validateEnvironment();
        const token = await authenticate();
        console.log('Authentication successful!');

        const command = process.argv[2];
        const args = process.argv.slice(3);
        const algoConfig = config.defaults.algo;

        await handleCommand(command, token, algoConfig, args);
    } catch (error) {
        console.error('Error:', error);
        process.exit(1);
    }
}

main();