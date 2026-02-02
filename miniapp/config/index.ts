import type { UserConfigExport } from '@tarojs/cli';

export default {
  projectName: 'erp-miniapp',
  date: '2024-09-01',
  designWidth: 750,
  deviceRatio: {
    750: 1,
  },
  sourceRoot: 'src',
  outputRoot: 'dist',
  framework: 'react',
  compiler: 'webpack5',
  mini: {},
  h5: {},
} satisfies UserConfigExport;
