module.exports = {
    "root": true,
    "env": {
        "node": true
    },
    "extends": [
        "plugin:vue/essential",
        "eslint:recommended"
    ],
    "plugins": [
        "prettier"
    ],
    "parserOptions": {
        "parser": "babel-eslint"
    },
    "rules": {
        'prettier/prettier': [
            'error',
            {
                printWidth: 80,
                singleQuote: true,
                semi: true,
                trailingComma: 'es5',
            }
        ]
    }
}