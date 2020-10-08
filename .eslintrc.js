module.exports = {
    parser: '@typescript-eslint/parser',
    parserOptions: {
        ecmaVersion: 2020,
        sourceType: 'module',
        ecmaFeatures: {
            jsx: true
        }
    },
    extends: [
        'plugin:react/recommended',
        'plugin:@typescript-eslint/recommended',
        'prettier/@typescript-eslint',
        'plugin:prettier/recommended'
    ],
    plugins: ['import'],
    rules: {
        'react/prop-types': 0,
        '@typescript-eslint/no-non-null-assertion': 0,
        'import/order': [
            'error',
            {
                groups: [
                    'builtin',
                    'external',
                    'internal',
                    'parent',
                    'sibling',
                    'object',
                    'index'
                ],
                pathGroups: [
                    {
                        pattern: 'types/**',
                        group: 'internal'
                    },
                    {
                        pattern: 'utils/**',
                        group: 'internal'
                    },
                    {
                        pattern: 'components/**',
                        group: 'internal',
                        position: 'after'
                    },
                    {
                        pattern: 'redux/**',
                        group: 'internal',
                        position: 'after'
                    },
                    {
                        pattern: '**/*.scss',
                        group: 'index',
                        position: 'after'
                    }
                ],
                pathGroupsExcludedImportTypes: ['builtin'],
                alphabetize: {
                    order: 'asc',
                    caseInsensitive: true
                },
                'newlines-between': 'always'
            }
        ]
    },
    settings: {
        react: {
            version: 'detect'
        }
    }
};
