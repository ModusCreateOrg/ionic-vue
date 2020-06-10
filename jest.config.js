module.exports = {
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node', 'vue'],
  // moduleNameMapper: {
  //   '^vue$': 'vue/dist/vue.common.js',
  // },
  transform: {
    '^.+\\.ts?$': 'ts-jest'
  },
  testRegex: '(/__tests__/.*|(\\.|/)(test|spec))\\.ts?$',
  "testResultsProcessor": "jest-sonar-reporter"
}



