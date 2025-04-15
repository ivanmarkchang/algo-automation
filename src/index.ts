import dotenv from 'dotenv';

dotenv.config();

const API_BASE_URL = 'https://betaapi.avomd.io/api';

async function authenticate(): Promise<string> {
    const response = await fetch(`${API_BASE_URL}/v2/users/signin/`, {
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

interface AlgoConfig {
    name: string;
    description: string;
    team: number;
    module_sources: any[];
    permission_type: string;
    tags?: string[];
    hidden_tags?: string[];
    is_google_searchable?: boolean;
    featured_by_admin_at?: null;
    is_auto_tagged?: boolean;
    is_universal?: boolean;
    members?: {
        team_member_id: number;
        name: string;
        permission_type: string;
    }[];
    authors?: any[];
    reviewer?: null;
    review_interval?: null;
    review_expire_at?: null;
}

async function createAlgo(token: string, config: AlgoConfig): Promise<string> {
    const response = await fetch(`${API_BASE_URL}/v1/modules/`, {
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

async function deleteAlgo(token: string, algoId: string): Promise<void> {
    const response = await fetch(`${API_BASE_URL}/v1/modules/${algoId}/`, {
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

async function main() {
    try {
        const command = process.argv[2];
        const token = await authenticate();
        console.log('Authentication successful!');

        const config: AlgoConfig = {
            name: "test name",
            description: "test description",
            team: 1321,
            module_sources: [],
            permission_type: "can_view",
        };
        
        switch (command) {
            case 'create':
                const algoId = await createAlgo(token, config);
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
    }
}

main();