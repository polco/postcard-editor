module.exports = {
    preset: 'jest-puppeteer',
    moduleNameMapper: {
        '\\.scss$': 'identity-obj-proxy'
    },
    setupFiles: ['<rootDir>/setupEnzyme.ts'],
    moduleDirectories: ['node_modules', 'src'],
    collectCoverage: true,
    collectCoverageFrom: ['**/*.{ts,tsx}'],
    coverageReporters: ['text', 'text-summary'],
    transform: {
        '^.+\\.tsx?$': 'ts-jest'
    }
};
