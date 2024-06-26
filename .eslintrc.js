module.exports = {
    "env": {
        "es2021": true,
        "node": true
    },
    "extends": "standard-with-typescript",
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
    "parserOptions": {
        "ecmaVersion": "latest",
        "sourceType": "module"
    },
    "rules": {
        "space-before-function-paren": "off",
        "@typescript-eslint/space-before-function-paren": "off",
        "@typescript-eslint/no-unsafe-argument": "off",
        "@typescript-eslint/no-non-null-assertion": "off",
        "@typescript-eslint/no-misused-promises": [
            "error",
            {
                "checksVoidReturn": false
            }
        ]
    }
}
