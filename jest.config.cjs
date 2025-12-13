module.exports = {
  preset: 'jest-preset-angular',
  testEnvironment: 'jsdom',
  testMatch: ['<rootDir>/src/**/*.spec.ts'],
  setupFilesAfterEnv: ['<rootDir>/setup-jest.ts'],
  transform: {
    '^.+\\.(ts|mjs|js|html)$': [
      'jest-preset-angular',
      {
        tsconfig: '<rootDir>/tsconfig.spec.json',
        stringifyContentPathRegex: '\\.html$'
      }
    ]
  },
  moduleNameMapper: {
    '^@app/(.*)$': '<rootDir>/src/app/$1',
    '^@core/(.*)$': '<rootDir>/src/app/core/$1',
    '^@shared/(.*)$': '<rootDir>/src/app/shared/$1',
    '^@features/(.*)$': '<rootDir>/src/app/features/$1',
    '^@environments/(.*)$': '<rootDir>/src/environments/$1',
    '^@assets/(.*)$': '<rootDir>/src/assets/$1'
  },
  collectCoverage: true,
  collectCoverageFrom: ['src/app/**/*.{ts,js}', '!src/main.ts', '!src/main.server.ts'],
  coverageDirectory: '<rootDir>/coverage'
};

