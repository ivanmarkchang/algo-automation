import { validateEnvironment } from '../envUtils';

describe('validateEnvironment', () => {
    const originalEnv = process.env;

    beforeEach(() => {
        process.env = { ...originalEnv };
    });

    afterEach(() => {
        process.env = originalEnv;
    });

    it('should not throw when all required environment variables are present', () => {
        process.env.EMAIL = 'test@example.com';
        process.env.PASSWORD = 'password123';

        expect(() => validateEnvironment()).not.toThrow();
    });

    it('should throw when EMAIL is missing', () => {
        process.env.PASSWORD = 'password123';
        delete process.env.EMAIL;

        expect(() => validateEnvironment()).toThrow('Missing required environment variables: EMAIL');
    });

    it('should throw when PASSWORD is missing', () => {
        process.env.EMAIL = 'test@example.com';
        delete process.env.PASSWORD;

        expect(() => validateEnvironment()).toThrow('Missing required environment variables: PASSWORD');
    });

    it('should throw when both EMAIL and PASSWORD are missing', () => {
        delete process.env.EMAIL;
        delete process.env.PASSWORD;

        expect(() => validateEnvironment()).toThrow('Missing required environment variables: EMAIL, PASSWORD');
    });
}); 