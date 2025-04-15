import { authenticate } from '../authService';

// Mock the global fetch
global.fetch = jest.fn();

describe('authenticate', () => {
    const originalEnv = process.env;

    beforeEach(() => {
        process.env = { ...originalEnv };
        process.env.EMAIL = 'test@example.com';
        process.env.PASSWORD = 'password123';
        (global.fetch as jest.Mock).mockClear();
    });

    afterEach(() => {
        process.env = originalEnv;
    });

    it('should return token on successful authentication', async () => {
        const mockToken = 'mock-token-123';
        (global.fetch as jest.Mock).mockResolvedValueOnce({
            ok: true,
            json: () => Promise.resolve({ token: mockToken })
        });

        const token = await authenticate();
        expect(token).toBe(mockToken);
        expect(fetch).toHaveBeenCalledWith(
            expect.stringContaining('/signin'),
            expect.objectContaining({
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    email: 'test@example.com',
                    password: 'password123'
                })
            })
        );
    });

    it('should throw error when API response is not ok', async () => {
        (global.fetch as jest.Mock).mockResolvedValueOnce({
            ok: false,
            text: () => Promise.resolve('Invalid credentials')
        });

        await expect(authenticate()).rejects.toThrow('Authentication failed: Invalid credentials');
    });

    it('should throw error when fetch fails', async () => {
        (global.fetch as jest.Mock).mockRejectedValueOnce(new Error('Network error'));

        await expect(authenticate()).rejects.toThrow('Network error');
    });
}); 