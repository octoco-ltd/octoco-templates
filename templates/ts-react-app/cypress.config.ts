import { defineConfig } from 'cypress';

export default defineConfig({
  projectId: '4xq9hv',
  component: {
    devServer: {
      framework: 'create-react-app',
      bundler: 'webpack',
    },
  },
  e2e: {
    baseUrl: 'http://localhost:3000',
    experimentalStudio: true,
  },
});
