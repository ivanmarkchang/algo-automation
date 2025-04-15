import { API } from '../constants';
import { AlgoConfig } from '../types';

export async function createAlgo(token: string, config: AlgoConfig): Promise<string> {
    const response = await fetch(`${API.BASE_URL}${API.ENDPOINTS.MODULES}`, {
        method: 'POST',
        headers: { 
            'Content-Type': 'application/json',
            'Authorization': `Token ${token}`
        },
        body: JSON.stringify(config)
    });

    if (!response.ok) {
        const text = await response.text();
        throw new Error(`Failed to create algo: ${text}`);
    }

    const data = await response.json();
    return data.id.toString();
}

export async function deleteAlgo(token: string, algoId: string): Promise<void> {
    const response = await fetch(`${API.BASE_URL}${API.ENDPOINTS.MODULES}${algoId}/`, {
        method: 'DELETE',
        headers: {
            'Authorization': `Token ${token}`
        }
    });

    if (!response.ok) {
        const text = await response.text();
        throw new Error(`Failed to delete algo: ${text}`);
    }
} 