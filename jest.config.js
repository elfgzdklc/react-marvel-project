module.exports = {
    testEnvironment: 'jsdom',
    roots: ['<rootDir>/'],
    moduleNameMapper: {
        '^@/(.*)$': '<rootDir>/$1',
    },
    testPathIgnorePatterns: ['/node_modules/'],
    moduleFileExtensions: ['js', 'jsx', 'json', 'node'],
    transform: {
        "^.+\\.[t|j]sx?$": "babel-jest"
    }
};
