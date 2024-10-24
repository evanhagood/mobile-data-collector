import pkg from '@eslint/js';
import reactRecommended from 'eslint-plugin-react/configs/recommended.js';
import jsxA11y from 'eslint-plugin-jsx-a11y/configs/recommended.js';
import globals from 'globals';

const { configs: eslintRecommended } = pkg;

export default [
  eslintRecommended.recommended,
  reactRecommended, // React recommended config
  jsxA11y, // JSX accessibility recommended config
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
      react: reactRecommended,
      'react-hooks': 'eslint-plugin-react-hooks', // Enable React Hooks plugin
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
