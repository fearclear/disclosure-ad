export default {
  entry: 'src/index.js',
  // publicPath: process.env.NODE_ENV === 'production' ? './' : '/',
  theme: "./theme.config.js",
  proxy: {
    "/disclosure": {
      "target": "http://120.27.159.30:9444/disclosure/",
      "changeOrigin": true,
      "pathRewrite": {"^/disclosure": ""}
    }
  },
  extraBabelPlugins: [
    ["import", { "libraryName": "antd", "libraryDirectory": "es", "style": true }]
  ]
}
