// jest.config.js
module.exports = {
  testEnvironment: 'node',
  setupFilesAfterEnv: ['./tests/jest.setup.js'],
  testTimeout: 30000, // increase timeout to 30s for async tests
};
