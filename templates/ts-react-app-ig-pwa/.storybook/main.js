const path = require('path');

function injectEnv(definitions) {
  const env = 'process.env';

  if (!definitions[env]) {
    return {
      ...definitions,
      [env]: JSON.stringify(
        Object.fromEntries(
          Object.entries(definitions)
            .filter(([key]) => key.startsWith(env))
            .map(([key, value]) => [key.substring(env.length + 1), JSON.parse(value)]),
        ),
      ),
    };
  }
  return definitions;
}

module.exports = {
  "stories": [
    "../src/**/*.stories.mdx",
    "../src/**/*.stories.@(js|jsx|ts|tsx)"
  ],

  "addons": [
    "@storybook/addon-links",
    "@storybook/addon-essentials",
    "@storybook/addon-interactions",
    "@storybook/preset-create-react-app"
  ],

  "framework": {
    name: "@storybook/react-webpack5",
    options: {}
  },

  // setup aliases using 'src' folder
  "webpackFinal": async (config) => {
    config.resolve.alias = {
      ...config.resolve.alias,
      'src': path.resolve(__dirname, '../src'),
    };
    // get env variables from .env file
    const definePlugin = config.plugins.find(
      ({ constructor }) => constructor && constructor.name === 'DefinePlugin',
    );
    if (definePlugin) {
      definePlugin.definitions = injectEnv(definePlugin.definitions);
    }
    // return the updated Storybook configuration
    return config;
  },

  docs: {
    autodocs: true
  }
}