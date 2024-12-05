module.exports = {
    "env": {
        "browser": true,
        "es2021": true,
        "node": true,
        "es6": true
    },
    "extends": [
        "eslint:recommended",
        "plugin:@typescript-eslint/recommended",
        "plugin:react/recommended",
        "taro/react",
        'plugin:import/errors',
        'plugin:import/warnings',
    ],
    "settings": {
        "react": {
            "version": "999.999.999"
        }
    },
    "overrides": [
        {
            "env": {
                "node": true
            },
            "files": [
                ".eslintrc.{js,cjs}"
            ],
            "parserOptions": {
                "sourceType": "script"
            }
        }
    ],
    "parser": "@typescript-eslint/parser",
    "parserOptions": {
        "ecmaVersion": 'latest',
        "sourceType": 'module'
    },
    "plugins": [
        "@typescript-eslint",
        "react"
    ],
    "rules": {
        "no-unused-vars": "off",
        "@typescript-eslint/no-unused-vars": "off",
        "@typescript-eslint/no-explicit-any": ["off"],
        "react/react-in-jsx-scope": "off",
        "import/no-commonjs": "off",
        'import/prefer-default-export': 'off',
        'import/no-unresolved': 'off',
        'import/named': 'off',
    }
}
