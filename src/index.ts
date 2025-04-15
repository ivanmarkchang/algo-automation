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

async function createAlgo(token: string): Promise<string> {
    const response = await fetch(`${API_BASE_URL}/v1/modules/`, {
        method: 'POST',
        headers: { 
            'Content-Type': 'application/json',
            'Authorization': `Token ${token}`
        },
        body: JSON.stringify({
            name: "test2",
            description: "test2",
            tags: [],
            hidden_tags: [],
            is_google_searchable: false,
            featured_by_admin_at: null,
            permission_type: "can_view",
            is_auto_tagged: false,
            module_sources: [],
            is_universal: false,
            members: [{
                team_member_id: 2684,
                name: "Ivan Chang",
                permission_type: "owner"
            }],
            team: 1321,
            authors: [],
            reviewer: null,
            review_interval: null,
            review_expire_at: null
        })
    });

    if (!response.ok) {
        const text = await response.text();
        throw new Error(`Failed to create algo: ${text}`);
    }

    const data = await response.json();
    return data.id.toString();
}

async function main() {
    try {
        const token = await authenticate();
        console.log('Authentication successful!');
        
        const algoId = await createAlgo(token);
        console.log('Algo created with ID:', algoId);
    } catch (error) {
        console.error('Error:', error);
    }
}

main();