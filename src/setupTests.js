// src/setupTests.js
// This file is run once before all your tests.

// Extends Jest with custom matchers from @testing-library/jest-dom
// e.g., .toBeInTheDocument(), .toHaveTextContent()
import '@testing-library/jest-dom';

// If you had any global setup for Enzyme (e.g., Enzyme.configure()),
// you would replace it with equivalent setup for React Testing Library here,
// though RTL generally requires less global configuration.
// Since you're migrating from React 15/Enzyme, you might have specific
// needs here.