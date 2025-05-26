// jest.config.js
module.exports = {
  // Use jsdom for a browser-like environment (needed for React components)
  testEnvironment: 'jsdom',

  // Use SWC for transforming JavaScript/JSX/TypeScript files.
  // This replaces babel-jest for faster compilation.
  transform: {
    '^.+\\.(js|jsx|ts|tsx)$': ['@swc/jest'],
  },

  // Files that are run once before all tests.
  // We'll create src/setupTests.js for @testing-library/jest-dom setup.
  setupFilesAfterEnv: ['<rootDir>/src/setupTests.js'],

  // Where to look for test files. Adjust if your test files are elsewhere.
  // This regex matches files ending in .test.js, .spec.js, or .test.jsx/.spec.jsx
  testRegex: '(/__tests__/.*|(\\.|/)(test|spec))\\.(jsx?|tsx?)$',

  // Directories that Jest should not scan for tests or modules
  testPathIgnorePatterns: [
    '/node_modules/',
    '/dist/',
    // If you have Cypress or other e2e tests, you might add:
    // '/cypress/',
  ],

  // This maps module paths based on your webpack config's aliases (if any).
  // You had `moduleDirectories: ["node_modules", "src/"]` in your old config.
  // We'll mimic the 'src' mapping here.
  moduleNameMapper: {
    '^src/(.*)$': '<rootDir>/src/$1', // This maps 'src/foo' to the actual path
    // For CSS/image imports in tests:
    '\\.(css|less|scss|sass)$': 'identity-obj-proxy',
    '\\.(gif|ttf|eot|svg|png)$': '<rootDir>/test/__mocks__/fileMock.js',
  },

  // To collect code coverage
  collectCoverage: true,
  collectCoverageFrom: [
    'src/**/*.{js,jsx}',
    '!src/**/*.d.ts', // Exclude TypeScript declaration files
    '!src/index.js', // Or your main entry file if it's mostly setup
    '!src/reportWebVitals.js', // If present (from Create React App)
  ],
  coverageDirectory: 'coverage',
  coverageReporters: ['text', 'lcov'], // Human-readable and for CIs like Coveralls

  // For snapshot testing, no need for enzyme-to-json/serializer anymore
  // with @testing-library, Jest handles it directly.
};