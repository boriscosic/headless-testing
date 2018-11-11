const path = require('path');
const OUT_DIR = process.env.OUT_DIR || '/Users/boris/.nvm/versions/node/v8.11.3/lib/node_modules/webdriver-manager/selenium';
const defaults = {
  browserName: 'chrome',
  silent: false,
  webStorageEnabled: true,
  databaseEnabled: true,
  applicationCacheEnabled: true,
  nativeEvents: true,
  javascriptEnabled: true,
  acceptSslCerts: true
};

module.exports = {
  src_folders: ['tests/e2e'],
  output_folder : 'tests/reports',
  selenium: {
    start_process: true,
    server_path: path.join(OUT_DIR, 'selenium-server-standalone-3.14.0.jar'),
    log_path: 'tests/logs',
    cli_args: {
      'webdriver.chrome.driver': path.join(OUT_DIR, 'chromedriver_2.43')
    }
  },
  test_settings: {
    default: {
      filter : '**/*.spec.js',
      launch_url: 'http://www.google.com',
      desiredCapabilities: {
        ...defaults,
        chromeOptions: {
          args: [
            'window-size=1280,900'
          ]
        }
      }
    },
    googleca: {
      launch_url: 'http://www.google.ca'
    },
    docker: {
      desiredCapabilities: {
        ...defaults,
        chromeOptions: {
          binary: '/usr/bin/google-chrome',
          args: [
            'disable-dev-shm-usage',
            'disable-software-rasterizer',
            'disable-setuid-sandbox',
            'window-size=1280,900',
            'no-sandbox'
          ]
        }
      }
    }
  }
}
