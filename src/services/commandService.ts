import { AlgoConfig } from '../types';
import { createAlgo, deleteAlgo } from './algoService';

export async function handleCommand(command: string, token: string, algoConfig: AlgoConfig, args: string[]): Promise<void> {
    switch (command) {
        case 'create':
            const algoId = await createAlgo(token, algoConfig);
            console.log('Algo created with ID:', algoId);
            break;
        case 'delete':
            const id = args[0];
            if (!id) {
                throw new Error('Algo ID is required');
            }
            await deleteAlgo(token, id);
            console.log('Algo deleted successfully!');
            break;
        default:
            throw new Error('Please specify a command: create or delete');
    }
} 