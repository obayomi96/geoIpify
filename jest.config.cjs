/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  moduleFileExtensions: ['ts', 'tsx', 'js'],
  testMatch: ['**/__tests__/**/*.test.(ts|tsx|js)'], // matches tests inside __tests__
  globals: {
    transform: {
      transform_regex: ['ts-jest', { /* ts-jest config goes here in Jest */ }],
  },
  },
  verbose: true,
};