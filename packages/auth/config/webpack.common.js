module.exports = {
  resolve: {
    extensions: ['.js', '.jsx','.ts', '.tsx']
  },

  module: {
    rules: [
      {
        test: /\.m?(j|t)sx$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-react', '@babel/preset-typescript', '@babel/preset-env'],
            plugins: ['@babel/plugin-transform-runtime'],
          },
        },
      },
      {
        test:/\.css$/i,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              importLoaders: 1,
              modules: true,
            }
          },
        ],
        include:/\.module\.css$/
      },
      {
        test: /\.css$/i,
        use: [
          'style-loader',
          'css-loader',
        ],
        exclude: /\.module\.css$/
      },
    ],
  },
};
