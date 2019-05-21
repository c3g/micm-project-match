module.exports = {
  verbose: true,
  moduleNameMapper: {
    '^Src[/](.+)': '<rootDir>/src/$1',
    '\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$':
      '<rootDir>/__mocks__/fileMock.js',
    '\\.(css|less|scss)$': '<rootDir>/__mocks__/styleMock.js'
  },
  setupFiles: ['./jest-setup.js'],
  snapshotSerializers: ['enzyme-to-json/serializer']
};
