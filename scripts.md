
# Available Scripts

This document provides a detailed explanation of all available npm scripts in the project. Each script is described with its purpose and usage examples.

## Development Scripts

### `npm run dev`

Starts the development server with hot-reloading enabled.

**Usage:**
```bash
npm run dev
```

This command launches the application in development mode, making it available at `http://localhost:5173` by default. The page will automatically reload if you make changes to the code.

**When to use:**
- During active development
- Testing new features locally
- Debugging issues in a development environment

### `npm run build`

Builds the application for production deployment.

**Usage:**
```bash
npm run build
```

This command compiles and bundles the application for production deployment, optimizing for performance. The built files will be stored in the `dist` folder.

**When to use:**
- Before deploying to production
- To verify that the application builds successfully
- To analyze the size of the production bundle

### `npm run preview`

Previews the production build locally.

**Usage:**
```bash
npm run build
npm run preview
```

This command serves the production build locally so you can test it before deployment. It's useful for verifying that the production build works as expected.

**When to use:**
- After running `npm run build`
- To test the production build locally
- To verify optimizations and performance

## Linting and Type Checking

### `npm run lint`

Runs ESLint to check for code quality issues.

**Usage:**
```bash
npm run lint
```

This command analyzes your code for potential errors and style violations according to the project's ESLint configuration.

**When to use:**
- Before committing code
- During CI/CD pipeline execution
- To maintain code quality standards

### `npm run lint:fix`

Automatically fixes ESLint issues where possible.

**Usage:**
```bash
npm run lint:fix
```

This command attempts to automatically fix ESLint issues that can be resolved programmatically.

**When to use:**
- After running `npm run lint` and finding issues
- Before code reviews
- To quickly clean up code style

### `npm run type-check`

Runs TypeScript compiler to check for type errors.

**Usage:**
```bash
npm run type-check
```

This command verifies that your TypeScript code is type-safe without generating output files.

**When to use:**
- To check for type errors before building
- During CI/CD pipeline execution
- After making significant changes to type definitions

## Testing

### `npm test` or `npm run test`

Runs the test suite.

**Usage:**
```bash
npm test
```

This command executes the test suite using Vitest, providing feedback on test results.

**When to use:**
- After making changes to verify functionality
- Before submitting a pull request
- During CI/CD pipeline execution

### `npm run test:watch`

Runs tests in watch mode, automatically re-running when files change.

**Usage:**
```bash
npm run test:watch
```

This command is useful during active development as it reruns affected tests whenever you make changes.

**When to use:**
- During test-driven development
- When fixing bugs or implementing features with existing tests
- When writing new tests

### `npm run test:coverage`

Runs tests and generates a coverage report.

**Usage:**
```bash
npm run test:coverage
```

This command executes the test suite and produces a detailed report showing which parts of your code are covered by tests.

**When to use:**
- To identify areas lacking test coverage
- As part of code quality assessment
- Before major releases

## Utility Scripts

### `npm run format`

Formats code using Prettier.

**Usage:**
```bash
npm run format
```

This command automatically formats all code files according to the project's Prettier configuration.

**When to use:**
- Before committing code
- After large refactoring
- To ensure consistent code style

### `npm run clean`

Cleans build artifacts and cache.

**Usage:**
```bash
npm run clean
```

This command removes generated files and caches, ensuring a clean state for your next build.

**When to use:**
- When experiencing build issues
- Before a fresh installation
- After switching branches

## Combined Scripts

### `npm run validate`

Runs linting, type checking, and tests in sequence.

**Usage:**
```bash
npm run validate
```

This command runs multiple validation steps in sequence to ensure code quality and correctness.

**When to use:**
- Before pushing code
- As a comprehensive check during CI/CD
- After completing a feature or fix

### `npm run prepare`

Sets up Git hooks using Husky.

**Usage:**
```bash
npm run prepare
```

This command is automatically run after `npm install` and sets up Git hooks to ensure code quality checks run before commits.

**When to use:**
- This runs automatically after installation
- When setting up the project for the first time
- After updating Husky configuration
