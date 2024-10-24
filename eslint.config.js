import pkg from '@eslint/js';
import reactRecommended from 'eslint-plugin-react/configs/recommended.js';
import globals from 'globals';

const { configs: eslintRecommended } = pkg;

export default [
    {
        files: ['**/*.{js,jsx}'],
        languageOptions: {
            ecmaVersion: 2021,
            sourceType: 'module',
            parserOptions: {
                ecmaFeatures: {
                    jsx: true, // Ensure JSX is enabled
                },
            },
            globals: {
                ...globals.browser,
            },
        },
        plugins: {
            react: reactRecommended, // Add React plugin to recognize JSX
            import: 'eslint-plugin-import', // Reference import plugin properly
        },
        settings: {
            react: {
                version: 'detect', // Automatically detect the React version
            },
        },
        extends: [
            'eslint:recommended',
            'plugin:react/recommended',
            'plugin:import/recommended', // Add this line instead of manually importing recommended.js
        ],
        rules: {
            'no-unused-vars': [
                'warn',
                {
                    varsIgnorePattern: 'React', // Ignore React import in React 17+
                },
            ],
            'react/react-in-jsx-scope': 'off', // Disable the need for React to be in scope (React 17+)
            'react/jsx-uses-vars': 'error', // Ensure variables used in JSX are marked as used
            'import/no-unresolved': 'error', // Ensure all imports can be resolved
            'import/named': 'error', // Ensure named imports correspond to a named export
            'no-console': 'warn', // Warn on console.log statements (can be changed to 'error' for stricter CI)
            'react/prop-types': 'off', // Turn off prop-types rule if using TypeScript or modern React
            'no-debugger': 'error', // Prevent the use of 'debugger' in production
        },
    },
];
