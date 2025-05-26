// babel.config.js
module.exports = {
  presets: [
    ['@babel/preset-env', {
      targets: {
        esmodules: true,
      },
    }],
    ['@babel/preset-react', {
      runtime: 'automatic',
    }],
  ],
  plugins: [
    // Ensure this array is empty or only contains 'babel-plugin-styled-components'
    // if you explicitly installed it.
    // It *must not* contain 'babel-plugin-transform-object-assign' or any other 'transform-*' plugins.
  ],
};