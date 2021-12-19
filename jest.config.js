module.exports = {
  collectCoverageFrom: [
    'src/**/*.{js,ts}',
  ],
  coveragePathIgnorePatterns: ['.module.ts', '.mock.ts', 'index.ts', '.shared.ts'],
  coverageDirectory: '<rootDir>/test-results/coverage',
  coverageReporters: ['lcovonly', 'json', 'html', 'cobertura', 'text', 'text-summary'],
  reporters: ['default'],
  globals: {
    'ts-jest': {
      tsconfig: '<rootDir>/tsconfig.test.json',
      stringifyContentPathRegex: '\\.html$',
      isolatedModules: true
    }
  },
  moduleFileExtensions: ['ts', 'html', 'js', 'json'],
  moduleDirectories: ['node_modules', '/src'],
  testMatch: ['<rootDir>/src/**/+(*.)+(test).ts']
};
