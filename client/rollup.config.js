// rollup.config.js
import babel from 'rollup-plugin-babel';

export default {
  input: 'src/index.jsx',
  output: {
    file: 'dist/bundle.js',
    format: 'esm',
  },
  plugins: [
    babel({
      exclude: 'node_modules/**', // wyklucz pliki z node_modules
      presets: ['@babel/preset-react'], // dodaj preset do obsługi Reacta
      extensions: ['.js', '.jsx'], // dodaj obsługę plików .jsx
    }),
  ],
};
