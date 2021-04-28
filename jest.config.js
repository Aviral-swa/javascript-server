module.exports = {
    globals: {
        'ts-jest': {
            tsConfigFile: 'tsconfig.json'
        }
    },
    moduleFileExtensions: [
        'ts',
        'js'
    ],
    transform: {
        '^.+\\.tsx?$': 'ts-jest',
        '^.+\\.js$': 'babel-jest'
    },
    transformIgnorePatterns: ["[/\\\\]node_modules[/\\\\].+\\.(js|jsx)$"],
    testMatch: [
        '**/*.spec.ts'
    ],
    testEnvironment: 'node',
    coveragePathIgnorePatterns: [".*\\.d\\.ts"],
    collectCoverageFrom: [
        "src/**/**/*.{ts}",
        "!src/index.ts"
    ]
};