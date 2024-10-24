import pkg from '@eslint/js';
import reactRecommended from 'eslint-plugin-react/configs/recommended.js';
import jsxA11y from 'eslint-plugin-jsx-a11y';
import reactHooks from 'eslint-plugin-react-hooks';
import globals from 'globals';

const { configs: eslintRecommended } = pkg;

export default [
  eslintRecommended.recommended,  // Use recommended ESLint config
  reactRecommended,  // React recommended config
  {
    files: ['**/*.{js,jsx}'],
    languageOptions: {
      ecmaVersion: 2021,
      sourceType: 'module',
      parserOptions: {
        ecmaFeatures: {
          jsx: true, // Enable JSX support
        },
      },
      globals: {
        ...globals.browser, // Include browser globals like `window`, `document`
      },
    },
    plugins: {
      'react-hooks': reactHooks,  // Only add react-hooks and jsx-a11y plugins
      'jsx-a11y': jsxA11y,
    },
    settings: {
      react: {
        version: 'detect', // Automatically detect the React version
      },
    },
    rules: {
      'no-unused-vars': [
        'warn',
        {
          varsIgnorePattern: 'React', // Ignore React import in React 17+
        },
      ],
      'react/react-in-jsx-scope': 'off', // Disable the need for React to be in scope
      'react/jsx-uses-vars': 'error', // Ensure variables used in JSX are marked as used
      'react-hooks/rules-of-hooks': 'error', // Rules of Hooks
      'react-hooks/exhaustive-deps': 'warn', // Checks effect dependencies
      'jsx-a11y/anchor-is-valid': 'warn', // Accessibility rule for anchor elements
    },
  },
];
