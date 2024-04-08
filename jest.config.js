module.exports = {
  preset: "ts-jest",
  globals: {
    "ts-jest": {
      diagnostics: false
    }
  },
  transform: {
    "\\.ts$": ["ts-jest"],
    "^.+\\.tsx?$": "babel-jest"
  },
  collectCoverageFrom: [
    "<rootDir>/src/**/*.tsx",
    "<rootDir>/src/**/*.ts",
    "!**/node_modules/**",
    "!**/vendor/**"
  ],
  coverageThreshold: {
    global: {
      branches: 0,
      functions: 0,
      lines: 0,
      statements: 0
    }
  },
  modulePathIgnorePatterns: [
    "<rootDir>/setupTests.ts",
    "npm-cache",
    ".npm",
    ".webpack",
    "../build"
  ],
  setupFiles: ["<rootDir>/setupTests.ts"],
  verbose: true,
  moduleFileExtensions: ["js", "jsx", "json", "ts", "tsx"],
  testMatch: ["<rootDir>/src/**/*test.{js,jsx,ts,tsx}"],
  transformIgnorePatterns: [
    "<rootDir>/node_modules/(?!${esModules})",
    "[/\\\\]node_modules[/\\\\].+\\.(js|jsx|ts|tsx)$",
    "^.+\\.module\\.(css|sass|scss)$"
  ],
  moduleNameMapper: {
    "\\.(css|less|scss|sass)$": "identity-obj-proxy"
  }
};
