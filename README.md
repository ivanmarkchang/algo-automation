# Algo Automation

This project automates the creation and deletion of AvodMD algorithms using TypeScript.

## Setup

1. Install dependencies:
   ```bash
   npm install
   ```

2. Create a `.env` file with your credentials:
   ```
   EMAIL=your-email
   PASSWORD=your-password
   ```

## Usage

The project provides two main commands:

### Create an Algo
```bash
npm run create
```

### Delete an Algo
```bash
npm run delete <algo-id>
```

## Testing

The project uses Jest for testing. Tests are organized in `__tests__` directories next to their corresponding source files:

- `src/utils/__tests__/envUtils.test.ts` - Tests for environment validation
- `src/services/__tests__/authService.test.ts` - Tests for authentication
- `src/services/__tests__/algoService.test.ts` - Tests for algo operations
- `src/services/__tests__/commandService.test.ts` - Tests for command handling

### Running Tests

Run all tests:
```bash
npm test
```

Run tests in watch mode (useful during development):
```bash
npm test -- --watch
```

Run a specific test file:
```bash
npm test -- <path-to-test-file>
```

### Future Improvements

- Add more specific error types (AuthenticationError, ValidationError)
- Replace console.log with logging service
- Add support for different environments (dev, prod)