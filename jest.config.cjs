// jest.config.js
module.exports = {
  testEnvironment: 'jsdom',
  transform: {
    '^.+\\.js?$': 'babel-jest',
  },
  transformIgnorePatterns: ['/node_modules/(?!node-fetch).+\\.js?$'],
};
