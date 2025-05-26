// .eslintrc.js
module.exports = {
  // Telling ESLint which environments your code runs in
  env: {
    browser: true, // For browser globals (window, document, etc.)
    node: true,    // For Node.js globals (process, require, etc.)
    es2021: true,  // For modern ECMAScript features (e.g., promises, async/await)
    jest: true,    // For Jest globals (describe, it, expect, etc.) - important for your test files
  },
  // Specify the parser for JavaScript. @babel/eslint-parser allows ESLint to parse modern JS syntax
  // that Babel understands, which ESLint's default parser might not yet.
  parser: '@babel/eslint-parser',
  parserOptions: {
    ecmaFeatures: {
      jsx: true, // Enable JSX support for React components
    },
    ecmaVersion: 2021, // Use ECMAScript 2021 features
    sourceType: 'module', // Allow ES Modules (import/export)
    // Ensure you specify a babel.config.js or .babelrc for @babel/eslint-parser to work
    // We'll have babel.config.js in the next step.
    requireConfigFile: false, // Set to true if you have a babel config file, false otherwise or if it causes issues.
                              // Setting to false here might be useful if babel config is complicated.
    babelOptions: {
      presets: ['@babel/preset-react', '@babel/preset-env'], // Specify the presets you'll install later
    },
  },
  // Extend configurations from popular style guides
  extends: [
    'airbnb', // Airbnb JavaScript style guide
    'airbnb/hooks', // Rules for React Hooks
  ],
  // Rules overrides or custom rules for your project
  rules: {
    // You'll likely need to add custom rules here to gradually fix existing linting errors.
    // For example, if you get 'no-console' errors:
    // 'no-console': 'off',
    // Example for import paths (common in older projects):
    // 'import/extensions': ['error', 'ignorePackages', {
    //   js: 'never',
    //   jsx: 'never',
    // }],
    // 'import/no-unresolved': 'off', // Temporarily disable if module resolution is problematic
    // You have React 15, which doesn't support hooks. We'll upgrade React later.
    // For now, react/jsx-uses-react and react/react-in-jsx-scope might cause issues.
    // These are handled by Babel's automatic JSX runtime in React 17+.
    // You might need to temporarily disable some React rules or set them to 'warn'.
    'react/jsx-uses-react': 'off',
    'react/react-in-jsx-scope': 'off',
    'react/prop-types': 'off', // Will be very noisy with an older codebase
    'react/require-default-props': 'off', // Similar to above
    'import/no-extraneous-dependencies': 'off', // Often problematic during migrations
    'no-shadow': 'off', // Older codebases often have this
    'no-use-before-define': 'off', // Also common in older code
    'func-names': 'off', // Older React components often use anonymous functions
  },
  // Settings for plugins
  settings: {
    react: {
      version: '18.0', // Explicitly tell ESLint your target React version
    },
    // To resolve modules correctly with webpack config (we'll set this up later)
    // 'import/resolver': {
    //   webpack: {
    //     config: './webpack.config.js', // Path to your webpack config
    //   },
    // },
  },
};