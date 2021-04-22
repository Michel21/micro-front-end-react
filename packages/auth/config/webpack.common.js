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
    ],
  },
};
