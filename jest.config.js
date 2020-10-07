module.exports = {
    preset: 'jest-puppeteer',
    moduleNameMapper: {
        '\\.scss$': 'identity-obj-proxy'
    },
    setupFiles: ['<rootDir>/setupEnzyme.js'],
    moduleDirectories: ['node_modules', 'src'],
    collectCoverage: false,
    collectCoverageFrom: ['**/*.{ts,tsx}'],
    coverageReporters: ['text', 'text-summary'],
    transform: {
        '^.+\\.tsx?$': 'ts-jest'
    }
};
