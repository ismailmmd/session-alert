// Karma configuration file, see link for more information
// https://karma-runner.github.io/1.0/config/configuration-file.html

module.exports = function (config) {
  var baseConfig = require('../../karma.conf')(config);

  config.set({
    ...baseConfig,
    coverageIstanbulReporter: {
      ...baseConfig.coverageIstanbulReporter,
      dir: require('path').join(__dirname, '../../coverage/session-alert-l')
    },
  });
};
