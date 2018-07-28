module.exports = {
  testEnvironment: "node",
  moduleFileExtensions: [ "js", "vue" ],
  transform: {
    "^.+\\.js$": "<rootDir>/node_modules/babel-jest",
    ".*\\.(vue)$": "<rootDir>/node_modules/jest-vue-preprocessor"
  }
}
