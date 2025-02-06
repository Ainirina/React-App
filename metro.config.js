const { getDefaultConfig } = require("expo/metro-config");
const { withNativeWind } = require("nativewind/metro");

const defaultConfig = getDefaultConfig(__dirname);

// Ensure the resolver and assetsExts are defined before pushing to it
if (!defaultConfig.resolver) {
  defaultConfig.resolver = {};
}
if (!defaultConfig.resolver.assetsExts) {
  defaultConfig.resolver.assetsExts = [];
}

defaultConfig.resolver.assetsExts.push('cjs');

module.exports = withNativeWind(defaultConfig, { input: "./global.css" });
