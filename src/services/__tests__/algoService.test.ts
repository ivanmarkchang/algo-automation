import { createAlgo, deleteAlgo } from '../algoService';
import { AlgoConfig } from '../../types';
import { API } from '../../constants';

// Mock the global fetch
global.fetch = jest.fn();

describe('algoService', () => {
    const mockToken = 'mock-token-123';
    const mockAlgoId = '123';
    const mockConfig: AlgoConfig = {
        name: 'Test Algo',
        description: 'Test Description',
        team: 1,
        module_sources: [],
        permission_type: 'private'
    };

    beforeEach(() => {
        (global.fetch as jest.Mock).mockClear();
    });

    describe('createAlgo', () => {
        it('should create algo and return id on success', async () => {
            (global.fetch as jest.Mock).mockResolvedValueOnce({
                ok: true,
                json: () => Promise.resolve({ id: mockAlgoId })
            });

            const id = await createAlgo(mockToken, mockConfig);
            expect(id).toBe(mockAlgoId);
            expect(fetch).toHaveBeenCalledWith(
                `${API.BASE_URL}${API.ENDPOINTS.MODULES}`,
                expect.objectContaining({
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Token ${mockToken}`
                    },
                    body: JSON.stringify(mockConfig)
                })
            );
        });

        it('should throw error when API response is not ok', async () => {
            (global.fetch as jest.Mock).mockResolvedValueOnce({
                ok: false,
                text: () => Promise.resolve('Invalid config')
            });

            await expect(createAlgo(mockToken, mockConfig))
                .rejects.toThrow('Failed to create algo: Invalid config');
        });
    });

    describe('deleteAlgo', () => {
        it('should successfully delete algo', async () => {
            (global.fetch as jest.Mock).mockResolvedValueOnce({
                ok: true
            });

            await expect(deleteAlgo(mockToken, mockAlgoId)).resolves.not.toThrow();
            expect(fetch).toHaveBeenCalledWith(
                `${API.BASE_URL}${API.ENDPOINTS.MODULES}${mockAlgoId}/`,
                expect.objectContaining({
                    method: 'DELETE',
                    headers: {
                        'Authorization': `Token ${mockToken}`
                    }
                })
            );
        });

        it('should throw error when deletion fails', async () => {
            (global.fetch as jest.Mock).mockResolvedValueOnce({
                ok: false,
                text: () => Promise.resolve('Algo not found')
            });

            await expect(deleteAlgo(mockToken, mockAlgoId))
                .rejects.toThrow('Failed to delete algo: Algo not found');
        });
    });
}); 