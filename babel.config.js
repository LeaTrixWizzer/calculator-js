const presets = [
  [
    "@babel/preset-env",
    {
      // Какие версии браузеров поддерживать
      targets: {
        edge: "17",
        ie: "11",
        firefox: "50",
        chrome: "64",
        safari: "11.1",
      },
      useBuiltIns: "entry", // по умолчанию babel использует полифилы библиотеки core-js
    },
  ],
];

module.exports = { presets };
