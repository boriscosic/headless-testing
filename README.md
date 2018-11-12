# Automated Headless Testing

This repo will assist anyone starting with automated testing. Prefered tools are selenium, chrome and nightwatch.
There many tools for interfacing with selenium webdriver, prefered tool for this repo is [nightwatch.js](http://nightwatchjs.org/)

## Requirements

- node ^8.x
- npm ^5.x
- docker (for Docker builds)

## References

- http://nightwatchjs.org
- https://www.seleniumhq.org/projects/webdriver/
- https://github.com/angular/webdriver-manager

## Local Setup

The easiest way to manage the installation is via webdriver-manager. This will install the latest version of all tools.
For specific framework versions run `webdriver-manager --help` or refer to Dockerfile.

`$ npm install -g webdriver-manager`
`$ webdriver-manager update ---versions.chrome 2.43 --versions.standalone 3.14.0 --gecko false`

If insure of the installation directory determine it by running:

`$ webdriver-manager --help | grep out_dir`

This will allow for setup of *nightwatch.conf.js* variables `server_path` and `webdriver.chrome.driver`.

## Local Runner 

To run the test locally update `nightwatch.conf.js` or set OUT_DIR to point to webdriver-manager installation run:

`$ npm run test-e2e`

To pass additional arguments to the nightwatch runner:

`$ npm run test-e2e -- --env googleca`

## Multiple Environments

To run tests against different urls, or with different parameters, add to nightwatch.conf.js and call the configuration by 
adding `--env` as per above. 

## Docker Setup

Having ability to test deployments as part of deployment is the great benefit of headless and selenium. To build an image run:

`$ docker build -t headless:chrome .`

To run the the test run (note the single quotes around the command):

`$ docker run -v $PWD:/opt/tests headless:chrome 'npm run test-e2e -- --env docker'`

## Browserstack Setup

In order to run tests against multiple browser versions on various platforms refer to [browserstack tutorial](https://www.browserstack.com/automate/nightwatch)

