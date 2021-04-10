module.exports = {
  webpack: (config, options) => {
    config.module.rules.push({
      test: /\.(glsl|frag|vert)$/,
      use: [
        options.defaultLoaders.babel,
        {loader: "raw-loader"},
        {loader: "glslify-loader"},
      ],
      exclude: /node_modules/,
    });
    return config;
  },
}