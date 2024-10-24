import pkg from '@eslint/js';
import reactRecommended from 'eslint-plugin-react/configs/recommended.js';
import reactHooks from 'eslint-plugin-react-hooks';
import jsxA11y from 'eslint-plugin-jsx-a11y';
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
            'react-hooks': reactHooks,
            'jsx-a11y': jsxA11y,
        },
        ...eslintRecommended.recommended,
        ...reactRecommended,
        rules: {
            'no-unused-vars': [
                'warn',
                {
                    varsIgnorePattern: 'React', // Ignore React import in React 17+
                },
            ],
            'react/react-in-jsx-scope': 'off', // Disable the need for React to be in scope
            'react/jsx-uses-vars': 'error', // Ensure variables used in JSX are marked as used
            'react-hooks/exhaustive-deps': 'warn', // React hooks exhaustive dependencies rule
            'jsx-a11y/anchor-is-valid': 'warn', // Accessibility rule for anchor elements
        },
    },
];
