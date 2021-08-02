module.exports = {
  displayName: 'game-server',
  preset: '../../jest.preset.js',
  globals: {
    'ts-jest': {
      tsconfig: '<rootDir>/tsconfig.spec.json',
    },
  },
  testEnvironment: 'node',
  transform: {
    '^.+\\.[tj]s$': 'ts-jest',
  },
  moduleFileExtensions: ['ts', 'js', 'html'],
  coverageDirectory: '../../coverage/apps/game-server',
  coverageReporters: ['lcov'],
  collectCoverageFrom: [
    "**/src/**/*.ts",
    "!**/node_modules/**"
  ],
  collectCoverage: true
};
