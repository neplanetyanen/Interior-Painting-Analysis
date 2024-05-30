module.exports = {
    env: {
        browser: true,
        es2021: true,
        jest: true
    },
    extends: [
        'plugin:vue/base',
        'plugin:vue/vue3-essential',
        'plugin:vue/vue3-strongly-recommended',
        'plugin:vue/vue3-recommended',
        '@vue/eslint-config-typescript',
        'airbnb',
        'prettier'
    ],
    parser: 'vue-eslint-parser',
    parserOptions: {
        ecmaFeatures: {
            jsx: false
        },
        ecmaVersion: 'latest',
        sourceType: 'module',
        parser: '@typescript-eslint/parser'
    },
    plugins: ['@typescript-eslint', 'heildionis-plugin', 'unused-imports'],
    rules: {
        'vue/multi-word-component-names': 'off',
        'vue/valid-template-root': 'off',
        semi: 'error',
        quotes: [2, 'single', { avoidEscape: true }],
        indent: ['error', 4],
        'object-curly-newline': 'off',
        'no-unused-vars': 'warn',
        'no-shadow': 'off',
        'no-underscore-dangle': 'off',
        'no-useless-constructor': 'off',
        'no-empty-function': 'off',
        'no-param-reassign': 'off',
        'no-undef': 'off',
        'linebreak-style': 'off',
        'max-len': [
            'error',
            {
                ignoreComments: true,
                code: 140
            }
        ],
        'unused-imports/no-unused-imports': 'error',
        'import/prefer-default-export': 'off',
        'import/no-unresolved': 'off',
        'import/order': [
            'error',
            {
                pathGroups: [
                    {
                        pattern: '@/**',
                        group: 'internal',
                        position: 'after'
                    }
                ],
                'newlines-between': 'always',
                alphabetize: {
                    order: 'asc',
                    caseInsensitive: false
                }
            }
        ],
        'import/extensions': 'off',
        'import/no-extraneous-dependencies': 'off',
        'heildionis-plugin/path-checker': [2, { alias: '@' }],
        'heildionis-plugin/public-api-imports': [
            'error',
            {
                alias: '@',
                testFilesPatterns: ['**/*.test.*']
            }
        ],
        'heildionis-plugin/layer-imports': [
            'error',
            {
                alias: '@',
                ignoreImportPatterns: [
                    '**/store',
                    '**/testing',
                    '**/componentRender'
                ]
            }
        ]
    }
};
