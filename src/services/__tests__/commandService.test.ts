import { handleCommand } from '../commandService';
import { AlgoConfig } from '../../types';
import * as algoService from '../algoService';

// Mock console.log to prevent actual logging during tests
const originalConsoleLog = console.log;
console.log = jest.fn();

// Mock the algoService functions
jest.mock('../algoService', () => ({
    createAlgo: jest.fn(),
    deleteAlgo: jest.fn()
}));

describe('handleCommand', () => {
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
        jest.clearAllMocks();
    });

    afterAll(() => {
        console.log = originalConsoleLog;
    });

    it('should handle create command successfully', async () => {
        (algoService.createAlgo as jest.Mock).mockResolvedValueOnce(mockAlgoId);
        
        await handleCommand('create', mockToken, mockConfig, []);
        
        expect(algoService.createAlgo).toHaveBeenCalledWith(mockToken, mockConfig);
        expect(console.log).toHaveBeenCalledWith('Algo created with ID:', mockAlgoId);
    });

    it('should handle delete command successfully', async () => {
        (algoService.deleteAlgo as jest.Mock).mockResolvedValueOnce(undefined);
        
        await handleCommand('delete', mockToken, mockConfig, [mockAlgoId]);
        
        expect(algoService.deleteAlgo).toHaveBeenCalledWith(mockToken, mockAlgoId);
        expect(console.log).toHaveBeenCalledWith('Algo deleted successfully!');
    });

    it('should throw error when delete command is missing algo ID', async () => {
        await expect(handleCommand('delete', mockToken, mockConfig, []))
            .rejects.toThrow('Algo ID is required');
        expect(algoService.deleteAlgo).not.toHaveBeenCalled();
    });

    it('should throw error for invalid command', async () => {
        await expect(handleCommand('invalid', mockToken, mockConfig, []))
            .rejects.toThrow('Please specify a command: create or delete');
        expect(algoService.createAlgo).not.toHaveBeenCalled();
        expect(algoService.deleteAlgo).not.toHaveBeenCalled();
    });
}); 