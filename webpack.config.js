// webpack.config.js (NEW)
const path = require('path');
const webpack = require('webpack'); // Needed for some plugins or built-in variables
// You'll likely need other plugins later, e.g., HtmlWebpackPlugin, MiniCssExtractPlugin

module.exports = (env, argv) => {
  const isDevelopment = argv.mode === 'development';
  const isProduction = argv.mode === 'production';

  return {
    // Set mode: 'development' or 'production' for Webpack's built-in optimizations
    mode: isDevelopment ? 'development' : 'production',

    // Define your entry point(s). Assuming your main code is in src/index.js (adjust if different)
    entry: './src/index.js', // Or './main.js' as indicated by your package.json, but commonly `src/index.js`

    // Define output path and filename
    output: {
      path: path.resolve(__dirname, 'dist'), // Output to a 'dist' folder
      filename: 'bundle.js', // Output bundle name
      clean: true, // Clean the dist folder before each build (Webpack 5+)
    },

    // Module rules for different file types
    module: {
      rules: [
        // Rule for JavaScript/JSX files using Babel
        {
          test: /\.(js|jsx)$/,
          exclude: /node_modules/,
          use: {
            loader: 'babel-loader',
            options: {
              // Babel configuration is typically in babel.config.js,
              // but you can define it here if you prefer.
              // For simplicity, we assume babel.config.js handles it.
            },
          },
        },
        // Rule for CSS/SCSS (you'll need to install style-loader, css-loader, sass-loader)
        // If you have CSS imports, this is crucial.
        {
          test: /\.scss$/, // Or /\.css$/ if just CSS
          use: [
            isDevelopment ? 'style-loader' : 'mini-css-extract-plugin', // Use MiniCssExtractPlugin in production
            'css-loader',
            'sass-loader', // If using SCSS
          ],
        },
        // Rule for images (Webpack 5 has built-in asset modules)
        {
          test: /\.(png|svg|jpg|jpeg|gif)$/i,
          type: 'asset/resource', // Replaces file-loader/url-loader
        },
        // Rule for fonts
        {
          test: /\.(woff|woff2|eot|ttf|otf)$/i,
          type: 'asset/resource',
        },
      ],
    },

    // Resolve extensions for easier imports
    resolve: {
      extensions: ['.js', '.jsx'], // Add .jsx if your project uses React components
      // If you used moduleDirectories in Jest, you might need aliases here
      alias: {
    	  'src': path.resolve(__dirname, 'src/'), // Base alias for 'src/'
        'components': path.resolve(__dirname, 'src/components/'),
        'utils': path.resolve(__dirname, 'src/utils/'),
        'store': path.resolve(__dirname, 'src/store/'),
        'constants': path.resolve(__dirname, 'src/constants/'),
        'propTypes': path.resolve(__dirname, 'src/propTypes/'),
      },
    },

    // Plugins (you'll add more here as needed)
    plugins: [
      // If you use definePlugin for NODE_ENV, it's often handled by Webpack's mode setting.
      // However, if your code explicitly checks process.env.NODE_ENV, you might still need it.
      new webpack.DefinePlugin({
        'process.env.NODE_ENV': JSON.stringify(isProduction ? 'production' : 'development'),
      }),
      // You'll likely need HtmlWebpackPlugin to generate index.html
      // new HtmlWebpackPlugin({
      //   template: './public/index.html', // Path to your HTML template
      //   filename: 'index.html',
      // }),
      // If using MiniCssExtractPlugin:
      // new MiniCssExtractPlugin({
      //   filename: 'styles/[name].[contenthash].css',
      // }),
    ],

    // DevServer configuration (for `npm run dev`)
    devServer: {
      static: {
        directory: path.join(__dirname, 'dist'), // Serve content from 'dist'
      },
      compress: true,
      port: 8080, // Or whatever port you prefer
      open: true, // Open browser automatically
      hot: true, // Enable Hot Module Replacement (HMR)
      // historyApiFallback: true, // If you're using client-side routing
    },

    // Source maps for debugging
    devtool: isDevelopment ? 'eval-source-map' : 'source-map',
  };
};