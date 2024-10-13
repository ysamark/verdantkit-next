const { compilerOptions } = require("./tsconfig.json");
const {
  pathsToModuleAliases,
} = require("tsconfig-paths-to-module-name-mapper");

module.exports = {
  presets: [
    [
      "@babel/preset-env",
      {
        targets: {
          node: "6",
        },
      },
    ],
    ["@babel/preset-typescript"],
  ],

  plugins: [
    [
      "babel-plugin-module-resolver",
      {
        alias: pathsToModuleAliases(compilerOptions.paths, {
          prefix: compilerOptions.baseUrl,
        }),
      },
    ],
    "@babel/plugin-proposal-class-properties",
    "@babel/plugin-proposal-object-rest-spread",
  ],

  ignore: ["./node_modules", "./tests", "**/*.spec.ts", "**/*.d.ts"],
};
