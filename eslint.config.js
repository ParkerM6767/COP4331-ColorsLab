// eslint.config.js
import js from "@eslint/js";

export default [
    js.configs.recommended, // Use recommended rules
    {
        files: ["**/*.js"],
        rules: {
            "no-unused-vars": "warn",
            'no-undef': 'warn',
        }
    }
];
