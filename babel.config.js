module.exports = {
  presets: [
    '@babel/preset-typescript',
    ['@babel/preset-env', {
    loose: true,
    targets: {
      esmodules: true,
    }
  }]],
  plugins: [
    ["module-resolver", {
      root: ["./"],
      alias: {
        "@slack": '@slack',
        "^@(.+)": "./src/\\1",
      }
    }],
    "babel-plugin-transform-typescript-metadata",
    ["@babel/plugin-proposal-decorators", { legacy: true }],
    ["@babel/plugin-proposal-class-properties", { "loose": true }]
  ]
}